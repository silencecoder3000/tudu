import React, { useState } from 'react'
import TaskList from './TaskList'
import NewTaskModal from './NewTaskModal'
import SettingsModal from './SettingsModal'
import { Task } from '../types'

interface MainContentProps {
  tasks: Task[]
  completedTasksInCat: Task[]
  toggleComplete: (id: number) => void
  toggleStarred: (id: number) => void
  currentCategory: string
  onSearch: (term: string) => void
  showModal: boolean
  closeModal: () => void
  addTask: (newTask: Omit<Task, 'id'>) => void
  showSettings: boolean
  openSettings: () => void
  closeSettings: () => void
  
  // Para credenciales (username, email, password)
  credentials: {
    username: string
    email: string
    password: string
  }
  onUpdateCredentials: (newCreds: {
    username: string
    email: string
    password: string
  }) => void

  // (NEW) Alias independiente del username
  userAlias: string
  onAliasChange: (alias: string) => void
}

const MainContent: React.FC<MainContentProps> = ({
  tasks,
  completedTasksInCat,
  toggleComplete,
  toggleStarred,
  currentCategory,
  onSearch,
  showModal,
  closeModal,
  addTask,
  showSettings,
  openSettings,
  closeSettings,
  credentials,
  onUpdateCredentials,
  userAlias,         // <<--- alias separado
  onAliasChange      // <<--- función para actualizar alias
}) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="main-content">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
          className="search-input"
        />
        <h2>{currentCategory}</h2>
        <div
          className="gear-icon"
          onClick={openSettings}
          style={{ cursor: 'pointer' }}
        >
          ⚙
        </div>
      </div>

      {/* Lista de tareas (incompletas) */}
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        toggleStarred={toggleStarred}
      />

      {/* Si no es "Starred" ni "Completed", mostrar la sección de completados de esa categoría */}
      {currentCategory !== 'Completed' && currentCategory !== 'Starred' && (
        <>
          <h3 className="completed-heading" style={{ marginTop: '1rem' }}>
            Completed
          </h3>
          <TaskList
            tasks={completedTasksInCat}
            toggleComplete={toggleComplete}
            toggleStarred={toggleStarred}
          />
        </>
      )}

      {/* Modal para crear tarea */}
      {showModal && (
        <NewTaskModal
          closeModal={closeModal}
          addTask={addTask}
          defaultCategory={currentCategory}
        />
      )}

      {/* Modal de Settings */}
      {showSettings && (
        <SettingsModal
          closeSettings={closeSettings}
          // Alias
          onAliasChange={onAliasChange}
          // Credenciales
          currentCreds={credentials}
          onUpdateCredentials={onUpdateCredentials}
        />
      )}
    </div>
  )
}

export default MainContent

