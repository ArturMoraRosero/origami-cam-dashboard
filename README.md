# Origami CAM Dashboard

Dashboard de monitoreo de Rocas Q3 (Scaling Up) para Grupo CAM (construcción, Ecuador), integrado con Microsoft 365 para seguimiento automático de tareas y avances.

## Features

✅ **Resumen Ejecutivo WTM** - Documento semanal preparado para Weekly Traction Meeting (PDF imprimible)
✅ **Indicadores en tiempo real** - Estado de las 4 rocas Q3 con tendencias
🔄 **Scorecard en vivo** (próximamente) - Tracker automático de tareas por propietario conectado a SharePoint Lists
🔄 **Alertas de tareas vencidas** (próximamente) - Notificaciones de bloqueadores y rezagos
📊 **Visualización de progreso** - Tendencias semanales de avance

## Stack

- **Frontend:** React 19 + Vite
- **Estilos:** CSS3 (diseño responsive, print-ready)
- **Integración:** Microsoft 365 MCP (SharePoint, Outlook)
- **Hosting:** Vercel
- **Dev:** Node.js 18+, pnpm

## Instalación

### Requisitos previos

- Node.js 18+
- pnpm (recomendado) o npm
- Acceso a Microsoft 365 (para integración futura)

### Setup local

```bash
# Clonar repositorio
git clone https://github.com/ArturMoraRosero/origami-cam-dashboard.git
cd origami-cam-dashboard

# Instalar dependencias
pnpm install

# Crear archivo .env desde template
cp .env.example .env

# Iniciar servidor de desarrollo
pnpm dev
```

El dashboard abrirá automáticamente en `http://localhost:5173`

## Estructura del proyecto

```
src/
├── components/              # Componentes React
│   ├── ResumenEjecutivoWTM.jsx
│   └── ScorecardRocasVivo.jsx (próximo)
├── hooks/                   # Hooks personalizados
│   ├── useMicrosoft365.js   (próximo)
│   └── useSharePointList.js (próximo)
├── utils/                   # Funciones auxiliares
│   ├── formatters.js
│   └── calculateMetrics.js
├── styles/                  # Estilos CSS
│   ├── app.css
│   └── resumen-ejecutivo.css
├── data/                    # Datos mock para desarrollo
└── App.jsx                  # Componente principal
```

## Uso

### Generar Resumen Ejecutivo WTM

1. Abre el dashboard en navegador
2. Ve a tab "Resumen Ejecutivo WTM"
3. Haz clic en "Imprimir / Guardar como PDF" (esquina superior derecha)
4. Selecciona impresora o "Guardar como PDF"

El documento se formatea automáticamente para A4 y es listo para enviar a José Vallejo.

### Conectar Microsoft 365 (próximamente)

Cuando el Scorecard en vivo esté disponible:

1. Ve a Configuración > Microsoft 365
2. Autentica con tu cuenta M365
3. Selecciona el sitio SharePoint de CAM
4. El dashboard leerá automáticamente la lista `Rocas_ToDoS_Q3`

## Deploy a Vercel

```bash
# Vinculación inicial
vercel link

# Agregar variables de entorno a Vercel
vercel env add VITE_SHAREPOINT_SITE
vercel env add VITE_SHAREPOINT_LIST

# Deploy a producción
pnpm deploy
```

**URL:** `https://origami-cam-dashboard.vercel.app`

## Documentación

- [SETUP.md](./docs/SETUP.md) - Configuración detallada de M365
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Explicación técnica de la arquitectura
- [SHAREPOINT_SCHEMA.md](./docs/SHAREPOINT_SCHEMA.md) - Schema de SharePoint Lists

## Roadmap

- [ ] v1.0 - Resumen Ejecutivo WTM (✅ hecho)
- [ ] v1.1 - Convertir HTML a React (✅ hecho)
- [ ] v2.0 - Scorecard de tareas en vivo (integración M365)
- [ ] v2.1 - Alertas de tareas vencidas
- [ ] v3.0 - Dashboard de tendencias 90 días
- [ ] v3.1 - Reportes automáticos por email

## Contributing

Para cambios locales:

```bash
git checkout -b feature/tu-feature
# Haz cambios
git add .
git commit -m "feat: descripción breve"
git push origin feature/tu-feature
# Crea PR
```

## Support

Para preguntas o issues, contacta a Origami Consulting (Artur Mora).

## License

Privado - Origami Consulting Group

---

**Versión:** 1.0  
**Última actualización:** Junio 2026  
**Mantenedor:** Artur Mora (ArturMoraRosero)
