# Arquitectura del Dashboard

Descripción técnica de la arquitectura del Origami CAM Dashboard.

## Visión General

```
┌─────────────────────────────────────────────────────────┐
│                    Origami CAM Dashboard                │
│                    (React 19 + Vite)                    │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   ┌─────────┐   ┌──────────┐   ┌──────────┐
   │ Resumen │   │Scorecard │   │Settings  │
   │Ejecutivo│   │  Tareas  │   │          │
   └────┬────┘   └─────┬────┘   └──────────┘
        │              │
        └──────┬───────┘
               │
      ┌────────▼────────────┐
      │ Microsoft 365 MCP   │
      │  (SharePoint Lists) │
      └─────────────────────┘
```

## Componentes

### 1. ResumenEjecutivoWTM.jsx

**Propósito:** Renderizar documento ejecutivo semanal para Weekly Traction Meeting.

**Props:**
- `data` (obj) - Datos de rocas, indicadores, IDS (opcional para MVP)

**Features:**
- Tabla de rocas con estado y tendencias
- Tabla de indicadores vs meta
- Listado de asuntos (IDS)
- Botón "Imprimir / Guardar como PDF"
- Estilos print-optimizados (media query `@media print`)

**Flujo:**
```
Componente recibe data → Renderiza tabla/callouts → Botón print() → Genera PDF
```

### 2. ScorecardRocasVivo.jsx (próximo)

**Propósito:** Tracker en tiempo real de tareas conectado a SharePoint.

**Dependencias:**
- `useSharePointList()` - Hook para leer lista
- `calculateMetrics()` - Calcular % completitud

**Features (planeadas):**
- Grid de tareas por propietario
- Status badges (Not Started, In Progress, Blocked, Done)
- Indicador de tareas vencidas
- Actualización automática cada 4h

**Flujo:**
```
useEffect() → Leer SharePoint → Parsear datos → Renderizar grid → Auto-refresh
```

### 3. App.jsx

**Propósito:** Contenedor principal y navegación.

**State:**
- `activeTab` (string) - Pestaña activa: "resumen", "scorecard", "settings"

**Features:**
- Tab navigation
- Header + Footer
- Placeholder para futuras features

## Hooks (Futuros)

### useMicrosoft365.js

Maneja autenticación y conexión a M365.

```javascript
const { isAuthenticated, authenticate, error } = useMicrosoft365();
```

**Responsabilidades:**
- OAuth flow con Azure
- Almacenar token en sessionStorage
- Renovar token antes de expiración

### useSharePointList.js

Lee/escribe a SharePoint Lists.

```javascript
const { data, loading, error, refresh } = useSharePointList(
  siteUrl,
  listName,
  filter
);
```

**Responsabilidades:**
- Lectura de items con `GET /sites/{site}/lists/{list}/items`
- Caché local (localStorage)
- Refresh automático cada 4h
- Manejo de errores

## Utils

### formatters.js

Funciones de formato:

```javascript
formatDate(date)         // "29 jun 2026"
formatPercent(num)       // "95%"
getStatusColor(status)   // "green" | "orange" | "red"
formatCurrency(num)      // "$2,250,000"
```

### calculateMetrics.js

Cálculos de avance:

```javascript
calculateRocaProgress(tasks)    // Promedio ponderado
calculateDaysRemaining(date)    // "23 días"
identifyBlockers(tasks)         // Tareas bloqueadas
```

## State Management

**Versión actual (MVP):** Props + useState local

**Futuro:** Considerar Context API o Zustand si crece complejidad.

```
App.jsx (activeTab)
  ├── ResumenEjecutivoWTM (data prop)
  ├── ScorecardRocasVivo (useSharePointList)
  └── Settings (form state)
```

## Data Flow

### Lectura desde SharePoint (v2.0)

```
┌─────────────────────────────────┐
│    SharePoint List              │
│   Rocas_ToDoS_Q3                │
├─────────────────────────────────┤
│ ID | Title | Roca | Dueño | ... │
│ 1  | ...   | 3    | Silvi | ... │
└────────────────┬────────────────┘
                 │
                 ▼ Microsoft 365 MCP
         ┌──────────────────┐
         │ useSharePointList│
         └────────┬─────────┘
                  │
                  ▼ Parsear items
        ┌──────────────────────┐
        │ calculateMetrics()   │
        │ groupBy("Dueño")     │
        │ calculateProgress()  │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ ScorecardRocasVivo   │
        │ (renderiza grid)     │
        └──────────────────────┘
```

## Estilos

**Enfoque:** CSS puro con variables CSS (`:root`)

**Arquitectura:**
```
app.css              → Estilos generales (nav, tabs, footer)
resumen-ejecutivo.css → Estilos específicos del documento WTM
```

**Print-ready:**
```css
@media print {
  /* Remover controles, optimizar para impresión */
  .toolbar { display: none; }
  @page { size: A4; margin: 14mm; }
}
```

## Deployment

### Local Development
```
pnpm dev → http://localhost:5173 (Vite dev server)
```

### Production (Vercel)
```
main branch → Auto-deploy a vercel.app
Variables de entorno: VITE_SHAREPOINT_* configuradas en Vercel UI
```

**Performance:**
- Bundle size: ~50KB (React + Vite)
- Lighthouse: Target 90+
- Time to Interactive: <2s

## Seguridad

1. **M365 Auth:** OAuth 2.0 flow con Azure
2. **Data in transit:** HTTPS only
3. **Token storage:** sessionStorage (no localStorage para datos sensibles)
4. **CORS:** Configurado en SharePoint/Azure
5. **API scopes:** Solo lectura/escritura de lists (no acceso completo M365)

## Roadmap Técnico

- [x] v1.0 - HTML documento WTM
- [x] v1.1 - React + Vite setup
- [ ] v2.0 - Integración M365 MCP
- [ ] v2.1 - Hook useSharePointList
- [ ] v2.2 - ScorecardRocasVivo component
- [ ] v3.0 - Caching + auto-refresh
- [ ] v3.1 - PWA (offline support)
- [ ] v4.0 - Analytics / trending charts

## Troubleshooting Técnico

### Bundle size muy grande
→ Lazy load componentes con React.lazy()

### Lentitud en lecturas SharePoint
→ Implementar caché con SWR o React Query

### Token expirado durante sesión
→ Refresh automático antes de expiración (65 min)

---

**Última actualización:** Junio 2026  
**Mantenedor:** Artur Mora
