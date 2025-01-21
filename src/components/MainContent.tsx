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
  onAliasChange
}) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="main-content">
      {/* Barra superior */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
          className="search-input"
        />
        
        {/* Botón engrane para abrir settings */}
        <div className="gear-icon" onClick={openSettings} style={{cursor: 'pointer'}}>
          ⚙
        </div>
      </div>

      {/* Lista de (in)completas para la categoría o el modo "Completed" */}
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        toggleStarred={toggleStarred}
      />

      {/* Si NO es la cat "Completed" ni "Starred", mostrar la sección de completados de ESA categoría */}
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

      {/* Modal para nueva tarea */}
      {showModal && (
        <NewTaskModal
          closeModal={closeModal}
          addTask={addTask}
          defaultCategory={currentCategory}
        />
      )}

      {/* Modal para settings */}
      {showSettings && (
        <SettingsModal
          closeSettings={closeSettings}
          onAliasChange={onAliasChange}
        />
      )}
    </div>
  )
}

export default MainContent

