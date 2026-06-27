import React, { useState } from 'react';
import ResumenEjecutivoWTM from './components/ResumenEjecutivoWTM';
import './styles/app.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('resumen');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Origami CAM Dashboard</h1>
          <p>Rocas Q3 + Tracker de Avances</p>
        </div>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'resumen' ? 'active' : ''}`}
          onClick={() => setActiveTab('resumen')}
        >
          📋 Resumen Ejecutivo WTM
        </button>
        <button
          className={`tab-btn ${activeTab === 'scorecard' ? 'active' : ''}`}
          onClick={() => setActiveTab('scorecard')}
        >
          📊 Scorecard de Tareas (Próximamente)
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Configuración
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'resumen' && <ResumenEjecutivoWTM />}
        
        {activeTab === 'scorecard' && (
          <div className="placeholder">
            <h2>📊 Scorecard de Tareas en Vivo</h2>
            <p>Tracker automático conectado a Microsoft 365 (próxima versión)</p>
            <p style={{marginTop: '12px', fontSize: '13px', color: '#6B7280'}}>
              Este módulo se integra con SharePoint Lists para mostrar tareas por propietario, 
              estado de completitud y alertas de tareas vencidas.
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="placeholder">
            <h2>⚙️ Configuración</h2>
            <div className="settings-grid">
              <div className="setting-card">
                <h3>Microsoft 365</h3>
                <p>Conectar cuenta M365 y SharePoint Lists</p>
                <button className="btn-primary">Conectar</button>
              </div>
              <div className="setting-card">
                <h3>Preferencias de Reporte</h3>
                <p>Personalizar frecuencia y formato de reportes</p>
                <button className="btn-primary">Configurar</button>
              </div>
              <div className="setting-card">
                <h3>Equipo y Accesos</h3>
                <p>Gestionar usuarios y permisos</p>
                <button className="btn-primary">Administrar</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Origami Consulting Group para Grupo CAM · v1.0</p>
      </footer>
    </div>
  );
}
