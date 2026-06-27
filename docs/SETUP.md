# Setup: Integración con Microsoft 365

Guía paso a paso para configurar la integración del dashboard con Microsoft 365.

## Requisitos

- Cuenta de Grupo CAM en Microsoft 365 (Office 365)
- Acceso a SharePoint
- Permisos para crear/editar listas en SharePoint
- Token de acceso o credenciales M365

## Paso 1: Crear SharePoint List

### En SharePoint de Grupo CAM

1. Ve a tu sitio SharePoint de CAM (ej: `https://tusite.sharepoint.com/sites/CAM`)
2. Haz clic en `+ Nuevo` > `Lista`
3. Selecciona `Crear desde cero` o `Lista en blanco`
4. Nombre: `Rocas_ToDoS_Q3`
5. Descripción: "Tracker centralizado de tareas para Rocas Q3"

### Agregar Columnas

Una vez creada la lista, agrega estos campos:

| Nombre Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| Title | Texto (Single line) | Sí | Nombre del to-do |
| Roca | Choice | Sí | Opciones: 1, 2, 3, 4, 5 |
| Dueño | Person | Sí | Seleccionar de usuarios CAM |
| Status | Choice | Sí | Not Started, In Progress, Blocked, Done |
| % Completado | Number | No | 0-100 |
| Fecha Vencimiento | Date | Sí | Fecha límite |
| Prioridad | Choice | No | Alta, Media, Baja |
| Notas | Multiline Text | No | Bloqueadores, dependencias |
| Actualizado | DateTime | Auto | Autofill al modificar |

### Crear Valores de Choice

**Roca:**
- 1
- 2
- 3
- 4
- 5

**Status:**
- Not Started
- In Progress
- Blocked
- Done

**Prioridad:**
- Alta
- Media
- Baja

## Paso 2: Configurar Variables de Entorno

En tu archivo `.env` (basado en `.env.example`):

```env
# SharePoint site URL
VITE_SHAREPOINT_SITE=https://tusite.sharepoint.com/sites/CAM

# Nombre exacto de la lista
VITE_SHAREPOINT_LIST=Rocas_ToDoS_Q3

# Tenant ID de Microsoft (ej: tuempresa.onmicrosoft.com)
VITE_M365_TENANT=tuempresa.onmicrosoft.com
```

## Paso 3: Autenticación con Microsoft 365 MCP

El dashboard utiliza **Microsoft 365 MCP** para conectarse a M365. Esto requiere:

1. **Para desarrollo local**: Usar Claude Code con MCP conectado (verá tu cuenta M365)
2. **Para producción (Vercel)**: Configurar OAuth o Service Principal en Azure

### Desarrollo Local

Si usas Claude Code Desktop con MCP de Microsoft 365:

```bash
# El MCP se conecta automáticamente a tu cuenta M365
# No requiere pasos adicionales
```

### Producción (Vercel)

Para que Vercel pueda leer SharePoint sin intervención manual:

1. Ve a **Azure Portal** (`https://portal.azure.com`)
2. Busca `App registrations` (Registros de aplicaciones)
3. Crea una nueva aplicación:
   - Nombre: `Origami CAM Dashboard`
   - Tipos de cuenta soportados: `Accounts in this organizational directory only`
4. Ve a `Certificates & secrets`, crea un nuevo client secret
5. Copia: `Client ID`, `Tenant ID`, `Client Secret`
6. En Vercel, agrega variables de entorno:
   ```
   VITE_AZURE_CLIENT_ID=<copiar aquí>
   VITE_AZURE_TENANT_ID=<copiar aquí>
   VITE_AZURE_CLIENT_SECRET=<copiar aquí>
   ```

## Paso 4: Permisos de SharePoint

Asegúrate de que los usuarios que van a usar el dashboard tengan:

- **Lectura** sobre la lista `Rocas_ToDoS_Q3`
- **Edición** si van a actualizar tareas (propietarios de rocas)

Para agregar permisos:

1. En SharePoint, abre `Rocas_ToDoS_Q3`
2. Haz clic en `Compartir` (esquina superior derecha)
3. Invita a: José Vallejo, Silvana Nichols, Andrés Chancusig, Bryan Galeas
4. Nivel de acceso: `Puede editar` (para que puedan actualizar sus tareas)

## Paso 5: Alimentar la Lista (Operativo)

### Primera vez (setup manual)

Llena la lista con las rocas actuales y sus tareas:

**Ejemplo para Roca 3 (CAMSCI Pipeline):**

| Title | Roca | Dueño | Status | % | Vencimiento | Prioridad |
|---|---|---|---|---|---|---|
| Replantear MPI CAMSCI | 3 | Silvana Nichols | In Progress | 60 | 2026-07-05 | Alta |
| Contactar 15 cuentas nuevas | 3 | Silvana Nichols | In Progress | 30 | 2026-07-15 | Alta |
| Propuesta a Arquisimple | 3 | Silvana Nichols | Blocked | 0 | 2026-07-10 | Alta |

### Mantenimiento semanal (cada lunes antes de WTM)

Los propietarios de rocas actualizan su lista de tareas directamente en SharePoint:
- Agregan nuevas tareas
- Marcan como "Done" lo que completaron
- Actualizan % de completitud
- Agregan notas sobre bloqueadores

El dashboard lee estos cambios automáticamente cada 4 horas (o bajo demanda).

## Troubleshooting

### "Acceso denegado a SharePoint"
- Verifica que tu usuario tiene permisos en el sitio CAM
- Revisa que el `VITE_SHAREPOINT_SITE` es correcto

### "Lista no encontrada"
- Confirma que existe la lista `Rocas_ToDoS_Q3`
- Verifica el nombre exacto (sensible a mayúsculas)

### "Autenticación fallida"
- En dev local: reinicia el servidor (`pnpm dev`)
- En Vercel: revisa que las variables de entorno están configuradas

## Siguientes pasos

Una vez configurado, el dashboard:
1. Lee automáticamente la lista cada 4h
2. Calcula % de avance por roca
3. Genera alertas de tareas vencidas
4. Incluye datos en el Resumen Ejecutivo WTM

Para preguntas, contacta a Artur Mora (Origami Consulting).
