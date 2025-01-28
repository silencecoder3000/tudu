import React from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import { Category, Task } from '../types'

interface LayoutProps {
  tasks: Task[]
  categories: Category[]
  selectedCategory: string
  onCategorySelect: (category: string) => void
  removeCategory: (cat: number) => void
  onSearch: (term: string) => void
  filteredTasks: Task[]
  completedTasksInCat: Task[]
  addTask: (newTask: { description: string, priority: string, endDate: string }) => void;
  toggleComplete: (id: number) => void
  toggleStarred: (id: number) => void
  showModal: boolean
  openModal: () => void
  closeModal: () => void
  showSettings: boolean
  openSettings: () => void
  closeSettings: () => void

  // Credenciales: username, email, password
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

  // (NEW) Alias separado, y función para cambiarlo
  userAlias: string
  onAliasChange: (alias: string) => void
}

const Layout: React.FC<LayoutProps> = ({
  tasks,
  categories,
  selectedCategory,
  onCategorySelect,
  removeCategory,
  onSearch,
  filteredTasks,
  completedTasksInCat,
  addTask,
  toggleComplete,
  toggleStarred,
  showModal,
  openModal,
  closeModal,
  showSettings,
  openSettings,
  closeSettings,
  credentials,
  onUpdateCredentials,
  userAlias,          // <--- alias adicional
  onAliasChange       // <--- función para cambiar alias
}) => {
  return (
    <div className="layout-container">
      <Sidebar
        tasks={tasks}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
        removeCategory={removeCategory}
        openModal={openModal}
        // Si quieres usar `credentials.username` en el saludo:
        // userName={credentials.username}

        // (NEW) Si prefieres usar el alias personal (distinto al username real):
        userName={userAlias}
      />

      <MainContent
        onSearch={onSearch}
        tasks={filteredTasks}
        completedTasksInCat={completedTasksInCat}
        toggleComplete={toggleComplete}
        toggleStarred={toggleStarred}
        currentCategory={selectedCategory}
        showModal={showModal}
        closeModal={closeModal}
        addTask={addTask}
        showSettings={showSettings}
        openSettings={openSettings}
        closeSettings={closeSettings}

        // Credenciales p/ SettingsModal
        credentials={credentials}
        onUpdateCredentials={onUpdateCredentials}

        // (NEW) También pasamos alias al MainContent para que SettingsModal pueda usar onAliasChange
        userAlias={userAlias}
        onAliasChange={onAliasChange}
      />
    </div>
  )
}

export default Layout

