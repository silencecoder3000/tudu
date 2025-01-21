import React, { useState } from 'react'
import './SettingsModal.css'

interface SettingsModalProps {
  closeSettings: () => void
  onAliasChange: (alias: string) => void
}

// Tipos de secciones
type SettingsSection = 'userPrefs' | 'notifications' | 'security' | 'appInfo'

const SettingsModal: React.FC<SettingsModalProps> = ({ closeSettings, onAliasChange }) => {
  // Para identificar la sección activa
  const [activeSection, setActiveSection] = useState<SettingsSection>('userPrefs')

  // -- Estados de ejemplo (pon la lógica real si lo deseas) --

  // Preferencias de usuario
  const [userAlias, setUserAlias] = useState<string>('TuAlias')

  // Notificaciones y recordatorios
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true)
  const [reminderFrequency, setReminderFrequency] = useState<'daily' | 'weekly' | 'none'>('daily')
  const [reminderTime, setReminderTime] = useState<string>('09:00')

  // Seguridad y privacidad
  const [newPassword, setNewPassword] = useState<string>('')
  const [rememberSession, setRememberSession] = useState<boolean>(true)

  // Información de la app (valores fijos de ejemplo)
  const appVersion = '1.0.0'
  const lastUpdate = '2025-01-21'

  // -- Manejo de eventos (placeholder) --
  const handleSaveUserPrefs = () => {
    onAliasChange(userAlias)
    console.log('Guardando alias:', userAlias)
    // Aquí tu lógica real (localStorage, request a backend, etc.)
  }

  const handleSaveNotifications = () => {
    console.log('Notificaciones:', notificationsEnabled, reminderFrequency, reminderTime)
  }

  const handleChangePassword = () => {
    if (!newPassword.trim()) return
    console.log('Cambiando contraseña a:', newPassword)
    setNewPassword('')
  }

  const handleSavePrivacy = () => {
    console.log('Recordar sesión:', rememberSession)
  }

  // -- Render del contenido según la sección activa --
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'userPrefs':
        return (
          <div className="settings-section-content">
            <h3>Preferencias de usuario</h3>
            <label htmlFor="alias">Alias o nombre a mostrar:</label>
            <div className="input-row">
              <input
                id="alias"
                type="text"
                value={userAlias}
                onChange={(e) => setUserAlias(e.target.value)}
              />
              <button onClick={handleSaveUserPrefs}>Guardar</button>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="settings-section-content">
            <h3>Notificaciones y Recordatorios</h3>
            <div className="input-row checkbox-row">
              <input
                id="enable-notifs"
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
              />
              <label htmlFor="enable-notifs">Habilitar Notificaciones</label>
            </div>

            <label htmlFor="freq">Frecuencia de Recordatorios:</label>
            <select
              id="freq"
              value={reminderFrequency}
              onChange={(e) => setReminderFrequency(e.target.value as 'daily'|'weekly'|'none')}
              disabled={!notificationsEnabled}
            >
              <option value="none">Ninguna</option>
              <option value="daily">Diario</option>
              <option value="weekly">Semanal</option>
            </select>

            <label htmlFor="time">Hora de Aviso:</label>
            <input
              id="time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              disabled={!notificationsEnabled}
            />

            <button onClick={handleSaveNotifications} style={{ marginTop: '1rem' }}>
              Guardar
            </button>
          </div>
        )

      case 'security':
        return (
          <div className="settings-section-content">
            <h3>Seguridad y Privacidad</h3>
            <label htmlFor="password">Cambiar contraseña:</label>
            <div className="input-row">
              <input
                id="password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={handleChangePassword}>Cambiar</button>
            </div>

            <div className="input-row checkbox-row" style={{ marginTop: '1rem' }}>
              <input
                id="remember-session"
                type="checkbox"
                checked={rememberSession}
                onChange={(e) => setRememberSession(e.target.checked)}
              />
              <label htmlFor="remember-session">Recordar sesión</label>
            </div>

            <button onClick={handleSavePrivacy} style={{ marginTop: '1rem' }}>
              Guardar
            </button>
          </div>
        )

      case 'appInfo':
        return (
          <div className="settings-section-content">
            <h3>Información de la app</h3>
            <p>Versión actual: <strong>{appVersion}</strong></p>
            <p>Última actualización: <strong>{lastUpdate}</strong></p>
            <hr style={{ margin: '0.8rem 0' }}/>
            <p><strong>Créditos y licencias:</strong></p>
            <ul>
              <li>Framework: React</li>
              <li>Licencia: MIT</li>
            </ul>
            <p>
              <a href="https://example.com/privacy" target="_blank" rel="noreferrer">
                Política de Privacidad
              </a><br/>
              <a href="https://example.com/terms" target="_blank" rel="noreferrer">
                Términos de Servicio
              </a>
            </p>
          </div>
        )

      default:
        return null
    }
  }

  // Cerrar modal al hacer click en el overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    closeSettings()
  }

  // Evitar cierre al hacer click dentro del modal
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div className="settings-overlay" onClick={handleOverlayClick}>
      <div className="settings-modal" onClick={handleModalClick}>
        
        {/* Cerrar con X */}
        <button className="settings-close-btn" onClick={closeSettings}>×</button>
        
        {/* Layout de dos columnas: sidebar izq + contenido der */}
        <div className="settings-layout">

          {/* Panel Izquierdo (sidebar) */}
          <div className="settings-sidebar">
            <h2>Configuraciones</h2>
            <ul>
              <li
                className={activeSection === 'userPrefs' ? 'active' : ''}
                onClick={() => setActiveSection('userPrefs')}
              >
                Preferencias
              </li>
              <li
                className={activeSection === 'notifications' ? 'active' : ''}
                onClick={() => setActiveSection('notifications')}
              >
                Notificaciones
              </li>
              <li
                className={activeSection === 'security' ? 'active' : ''}
                onClick={() => setActiveSection('security')}
              >
                Seguridad
              </li>
              <li
                className={activeSection === 'appInfo' ? 'active' : ''}
                onClick={() => setActiveSection('appInfo')}
              >
                Información
              </li>
            </ul>
          </div>

          {/* Panel Derecho (contenido) */}
          <div className="settings-content">
            {renderActiveSection()}
          </div>

        </div>
      </div>
    </div>
  )
}

export default SettingsModal

