import React, { useState } from 'react'
import './SettingsModal.css'

/** 
 * Props combinadas:
 * - closeSettings (para cerrar el modal)
 * - onAliasChange (para guardar el alias que ya manejabas)
 * - currentCreds / onUpdateCredentials (para editar username, email, password)
 */
interface SettingsModalProps {
  closeSettings: () => void
  onAliasChange: (alias: string) => void
  currentCreds: {
    username: string
    email: string
    password: string
  }
  onUpdateCredentials: (newCreds: {
    username: string
    email: string
    password: string
  }) => void
}

// Tipos de secciones
type SettingsSection = 'userPrefs' | 'notifications' | 'security' | 'appInfo'

const SettingsModal: React.FC<SettingsModalProps> = ({
  closeSettings,
  onAliasChange,
  currentCreds,
  onUpdateCredentials
}) => {
  // Para identificar la sección activa
  const [activeSection, setActiveSection] = useState<SettingsSection>('userPrefs')

  // ---------------------
  //   1. User Prefs
  // ---------------------
  const [userAlias, setUserAlias] = useState<string>('TuAlias')

  // Manejo para guardar alias
  const handleSaveUserPrefs = () => {
    onAliasChange(userAlias)
    console.log('Guardando alias:', userAlias)
    // Lógica real: localStorage / request a backend, etc.
  }

  // ---------------------
  //   2. Notifications
  // ---------------------
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true)
  const [reminderFrequency, setReminderFrequency] = useState<'daily' | 'weekly' | 'none'>('daily')
  const [reminderTime, setReminderTime] = useState<string>('09:00')

  const handleSaveNotifications = () => {
    console.log('Notificaciones:', notificationsEnabled, reminderFrequency, reminderTime)
    // Lógica real de guardar
  }

  // ---------------------
  //   3. Security
  // ---------------------
  // En vez de solo password, ahora manejamos username y email también,
  // usando los "currentCreds" que vienen del padre.
  const [secUsername, setSecUsername] = useState<string>(currentCreds.username)
  const [secEmail, setSecEmail]   = useState<string>(currentCreds.email)
  const [secPassword, setSecPassword] = useState<string>(currentCreds.password)

  // Otras opciones de privacidad
  const [rememberSession, setRememberSession] = useState<boolean>(true)

  const handleSaveSecurity = () => {
    // Actualizamos credenciales en el padre:
    onUpdateCredentials({
      username: secUsername,
      email: secEmail,
      password: secPassword
    })
    console.log('Credenciales actualizadas a:', secUsername, secEmail, secPassword)

    console.log('Recordar sesión:', rememberSession)
    // Lógica real: localStorage, request a backend, etc.
  }

  // ---------------------
  //   4. App Info
  // ---------------------
  const appVersion = '1.0.0'
  const lastUpdate = '2025-01-21'

  // ---------------------
  //   Render Secciones
  // ---------------------
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

            <label>Username:</label>
            <input
              type="text"
              value={secUsername}
              onChange={(e) => setSecUsername(e.target.value)}
            />

            <label>Email:</label>
            <input
              type="email"
              value={secEmail}
              onChange={(e) => setSecEmail(e.target.value)}
            />

            <label>Contraseña:</label>
            <input
              type="password"
              value={secPassword}
              onChange={(e) => setSecPassword(e.target.value)}
            />

            <div className="input-row checkbox-row" style={{ marginTop: '1rem' }}>
              <input
                id="remember-session"
                type="checkbox"
                checked={rememberSession}
                onChange={(e) => setRememberSession(e.target.checked)}
              />
              <label htmlFor="remember-session">Recordar sesión</label>
            </div>

            <button onClick={handleSaveSecurity} style={{ marginTop: '1rem' }}>
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
        
        {/* Botón X para cerrar */}
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

