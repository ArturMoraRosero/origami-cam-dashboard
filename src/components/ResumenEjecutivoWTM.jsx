import React from 'react';
import '../styles/resumen-ejecutivo.css';

export default function ResumenEjecutivoWTM({ data }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="toolbar">
        <button className="print-btn" onClick={handlePrint}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M4 6V2h8v4M4 12H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1M4 10h8v4H4v-4Z" 
                  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Imprimir / Guardar como PDF
        </button>
      </div>

      <div className="page">
        <div className="doc-head">
          <div className="doc-title">Resumen Ejecutivo — Semana 29 jun–05 jul 2026</div>
          <div className="doc-sub">
            Preparado para WTM (Weekly Traction Meeting) · Lunes 29 jun, 09:00 ECU<br/>
            Para: José Vallejo (GM) · De: Origami Consulting · Fuente: WTM AB-OtB CAM 29junio.xlsx
          </div>
        </div>

        <div className="sec-hdr">
          <span className="sec-num">1</span>Estado de las Rocas Q3 — con tendencia
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Roca</th>
              <th>Responsable</th>
              <th>Avance</th>
              <th>Tend.</th>
              <th>Vence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 · Accountability — roles claros</td>
              <td>José Vallejo</td>
              <td className="bold-val">95%</td>
              <td><span className="tag tag-green">↑ +10pp</span></td>
              <td>30/jul</td>
            </tr>
            <tr>
              <td>2 · Flujo de caja integral</td>
              <td>Andrés Chancusig</td>
              <td className="bold-val">42%</td>
              <td><span className="tag tag-orange">↑ +2pp</span></td>
              <td>03/ago</td>
            </tr>
            <tr>
              <td>3 · CAMSCI Pipeline $2.25M</td>
              <td>Silvana Nichols</td>
              <td className="bold-val" style={{color: '#DC2626'}}>28%</td>
              <td><span className="tag tag-red">→ sin cambio</span></td>
              <td>30/sep</td>
            </tr>
            <tr>
              <td>4 · CAMPRO Pipeline $12M</td>
              <td>Bryan Galeas</td>
              <td className="bold-val">85%</td>
              <td><span className="tag tag-green">↑ +4pp</span></td>
              <td>30/sep</td>
            </tr>
          </tbody>
        </table>

        <div className="callout">
          <b>Roca 1 prácticamente cerrada.</b> Solo falta "definir la estructura mínima viable" (50%, vence 30/jun). 
          <b>Roca 3 sigue sin moverse</b> — las dos sub-tareas de oficina (José) continúan en 0%. 
          Pregunta abierta: ¿qué prioridad entra en la Roca 5?
        </div>

        <div className="sec-hdr">
          <span className="sec-num">2</span>Dos focos rojos nuevos — primeros datos medidos vs. meta
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Indicador</th>
              <th>Resp.</th>
              <th>Meta</th>
              <th>Real</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Compras vs. planificadas (CAM)</td>
              <td>Sebastián</td>
              <td>0 atrasos</td>
              <td className="bold-val" style={{color: '#DC2626'}}>19 atrasos</td>
              <td><span className="tag tag-red">Crítico</span></td>
            </tr>
            <tr>
              <td>Avance físico proyectos (CAM)</td>
              <td>Mishell</td>
              <td>Desv. 0%</td>
              <td className="bold-val" style={{color: '#DC2626'}}>-9%</td>
              <td><span className="tag tag-red">Alto</span></td>
            </tr>
            <tr>
              <td>Cantidad de visitas</td>
              <td>Silvana</td>
              <td>10/sem</td>
              <td>7</td>
              <td><span className="tag tag-orange">70%</span></td>
            </tr>
          </tbody>
        </table>

        <div className="callout red">
          <b>Según la metodología WTM, todo indicador desviado va directo al IDS</b> — no se discute en la sección de indicadores. 
          Los 19 atrasos y el -9% aún no aparecen en el IDS; deberían entrar hoy.
        </div>

        <div className="sec-hdr">
          <span className="sec-num">3</span>Cuatro preguntas para el WTM de hoy
        </div>
        <ol className="qlist">
          <li><b>Roca 5:</b> ¿Qué prioridad va a definirse en esta roca recién creada?</li>
          <li><b>Focos rojos (19 atrasos / -9%):</b> ¿se identifican hoy en el IDS para empezar a resolverlos?</li>
          <li><b>"Falta de visita" vs. 70% real:</b> ¿el asunto de fondo es volumen, o a qué cuentas/calidad se dirigen las visitas?</li>
          <li><b>Roca 3 (28%, sin cambio):</b> las sub-tareas de oficina son de José — ¿se desbloquean esta semana o se redefine el alcance?</li>
        </ol>

        <div className="foot">
          Fuente: SharePoint IMPLEMENTACION/REUNIONES/2026/6. JUNIO/29 JUNIO/WTM AB - OtB CAM - 29 junio.xlsx
          · Origami Consulting Group para Grupo CAM.
        </div>
      </div>
    </div>
  );
}
