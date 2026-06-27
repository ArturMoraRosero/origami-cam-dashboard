# SharePoint List Schema: Rocas_ToDoS_Q3

Especificación técnica de la SharePoint List que alimenta el dashboard.

## Información General

| Atributo | Valor |
|---|---|
| Nombre | `Rocas_ToDoS_Q3` |
| Site | `https://tusite.sharepoint.com/sites/CAM` |
| Propósito | Tracker centralizado de tareas para Rocas Q3 |
| Modelo | One-to-Many: Una Roca → Múltiples To-Dos |
| Actualización | Semanal (propietarios actualizan cada lunes antes de WTM) |

## Campos (Columnas)

### 1. Title (Texto Single-line) - REQUERIDO

**Función:** Nombre/descripción breve del to-do.

**Ejemplo:**
```
"Replantear MPI comercial CAMSCI"
"Reconciliación de cobranzas junio"
"Implementar proceso de compras"
```

**Validación:**
- Máximo 255 caracteres
- No nulo

---

### 2. Roca (Choice) - REQUERIDO

**Función:** Identificar a cuál de las 4 rocas pertenece la tarea.

**Valores permitidos:**
```
1 → Accountability — roles claros
2 → Flujo de caja integral
3 → CAMSCI Pipeline $2.25M
4 → CAMPRO Pipeline $12M
5 → (Nueva — a definir)
```

**Ejemplo:**
```
Roca: 3
```

**Nota:** Este campo es clave para agrupar en dashboard por roca.

---

### 3. Dueño (Person) - REQUERIDO

**Función:** Quién es responsable de completar la tarea.

**Usuarios permitidos (Grupo CAM):**
```
José Vallejo (j.vallejo@cam.ec)
Andrés Chancusig (contabilidad1@cam.ec)
Silvana Nichols (ventas@cam.ec)
Bryan Galeas (construccion1@cam.ec)
Mishell Moreno (arquitectura3@cam.ec)
Sebastián Moreno (construccion2@cam.ec)
```

**Ejemplo:**
```
Dueño: Silvana Nichols
```

**Nota:** El dashboard agrupa y filtra por este campo.

---

### 4. Status (Choice) - REQUERIDO

**Función:** Estado actual de la tarea.

**Valores permitidos:**
```
Not Started  → No ha comenzado
In Progress  → En desarrollo
Blocked      → Bloqueada (espera externa)
Done         → Completada
```

**Transiciones válidas:**
```
Not Started → In Progress → Done
Not Started → In Progress → Blocked → In Progress → Done
```

**Ejemplo:**
```
Status: In Progress
```

**Nota:** El dashboard colorea por status.

---

### 5. % Completado (Number 0-100) - OPCIONAL

**Función:** Progreso estimado de completitud.

**Rango:** 0 a 100

**Reglas:**
- Si Status = "Not Started" → típicamente 0%
- Si Status = "In Progress" → 1-99%
- Si Status = "Done" → debe ser 100%
- Si Status = "Blocked" → congelar % actual

**Ejemplo:**
```
% Completado: 60
```

**Nota:** Usado para graficar trending de avance.

---

### 6. Fecha Vencimiento (Date) - REQUERIDO

**Función:** Fecha límite para completar la tarea.

**Formato:** YYYY-MM-DD (ISO 8601)

**Ejemplo:**
```
Fecha Vencimiento: 2026-07-10
```

**Validaciones:**
- No puede ser en el pasado al crear
- Dashboard marca como "OVERDUE" si hoy > fecha vencimiento

**Nota:** Crítico para identificar tareas atrasadas.

---

### 7. Prioridad (Choice) - OPCIONAL

**Función:** Nivel de urgencia/importancia.

**Valores:**
```
Alta     → Bloquea o impacta directamente resultado de Roca
Media    → Importante pero no crítico
Baja     → Puede posponerse sin riesgo
```

**Ejemplo:**
```
Prioridad: Alta
```

**Nota:** Usado para visualizar en dashboard (filtros/ordenamiento).

---

### 8. Notas (Multiline Text) - OPCIONAL

**Función:** Notas de contexto, bloqueadores, dependencias.

**Ejemplos:**
```
"Espera respuesta de cliente Arquisimple"
"Depende de flujo de caja (Roca 2)"
"Detalles en: https://sharepoint.com/site/..."
```

**Formato:** Markdown permitido (bold, listas, links)

**Nota:** Dashboard puede mostrar este campo en hover/expandible.

---

### 9. Actualizado (DateTime) - AUTO

**Función:** Timestamp de última modificación.

**Controlado por:** SharePoint (auto-fill)

**Formato:** ISO 8601 con timezone

**Ejemplo:**
```
Actualizado: 2026-06-27T16:45:30Z
```

**Nota:** Usado para determinar si hay cambios desde último refresh.

---

## Relaciones y Agregaciones

### Vista por Roca

```
Filtro: Roca = "3"
Ordenar: Prioridad DESC, Fecha Vencimiento ASC

Resultado: Solo tareas de Roca 3, ordenadas por urgencia
```

### Vista por Dueño

```
Filtro: Dueño = "Silvana Nichols"
Ordenar: Status (Not Started, In Progress, Blocked, Done)

Resultado: Todas las tareas de Silvana agrupadas por status
```

### Indicadores Calculados

**% Completitud de Roca:**
```
= (SUM(% Completado where Roca = X) / COUNT(Tareas in Roca X)) * 100
```

**Tareas Vencidas:**
```
= COUNT(Tareas where Fecha Vencimiento < TODAY() AND Status != "Done")
```

**Tareas Bloqueadas:**
```
= COUNT(Tareas where Status = "Blocked")
```

## Ejemplo de Datos Iniciales

### Roca 1: Accountability (José Vallejo)

| Title | Status | % | Fecha Vencimiento | Prioridad |
|---|---|---|---|---|
| Crear estructura de responsabilidades | In Progress | 80 | 2026-06-30 | Alta |
| Documentar flujos operativos | Not Started | 0 | 2026-07-15 | Media |

### Roca 2: Flujo de Caja (Andrés Chancusig)

| Title | Status | % | Fecha Vencimiento | Prioridad |
|---|---|---|---|---|
| Presupuesto semanal | Blocked | 0 | 2026-06-28 | Alta |
| Exportar data CAMCEQ | Overdue | 0 | 2026-06-27 | Alta |
| Flujo de caja proyectos | In Progress | 50 | 2026-07-05 | Alta |

### Roca 3: CAMSCI Pipeline (Silvana Nichols)

| Title | Status | % | Fecha Vencimiento | Prioridad |
|---|---|---|---|---|
| Replantear MPI | In Progress | 60 | 2026-07-05 | Alta |
| Contactar 15 cuentas | In Progress | 30 | 2026-07-15 | Alta |
| Propuesta Arquisimple | Blocked | 0 | 2026-07-10 | Alta |

### Roca 4: CAMPRO Pipeline (Bryan Galeas)

| Title | Status | % | Fecha Vencimiento | Prioridad |
|---|---|---|---|---|
| Follow-up Skyline | Done | 100 | 2026-06-27 | Alta |
| Cierre Pedregal | In Progress | 80 | 2026-07-20 | Alta |

## API Queries (Microsoft Graph / SharePoint REST)

### Leer todos los items

```
GET /sites/{site-id}/lists/Rocas_ToDoS_Q3/items
?$select=id,fields
&$expand=fields
&$orderby=fields/Fecha Vencimiento asc
```

### Filtrar por Roca

```
GET /sites/{site-id}/lists/Rocas_ToDoS_Q3/items
?$filter=fields/Roca eq '3'
&$select=id,fields
&$orderby=fields/Prioridad desc
```

### Filtrar tareas vencidas

```
GET /sites/{site-id}/lists/Rocas_ToDoS_Q3/items
?$filter=fields/Fecha_x0020_Vencimiento lt today()
  and fields/Status ne 'Done'
```

## Notas Operacionales

1. **Permiso de acceso:** Los propietarios de rocas necesitan `Edit` permissions sobre la lista
2. **Actualización semanal:** Se actualiza cada lunes antes de 09:00 ECU (WTM)
3. **Historial:** SharePoint guarda automáticamente versiones (revisar si es necesario audit trail)
4. **Notificaciones:** Puedes agregar Power Automate para alertas automáticas de tasks overdue

## Futuros Campos (v3.0)

```
- Estimación de horas
- Fecha de inicio
- Dependencias (lookup a otras tareas)
- Asignado a (sub-owners)
- Evidencia/Archivo adjunto
```

---

**Versión del Schema:** 1.0  
**Última actualización:** Junio 2026  
**Mantener actualizado en:** docs/SHAREPOINT_SCHEMA.md
