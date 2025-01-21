import React from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import { Task } from '../types'

interface LayoutProps {
  tasks: Task[]
  categories: string[]
  selectedCategory: string
  onCategorySelect: (category: string) => void
  removeCategory: (cat: string) => void
  onSearch: (term: string) => void
  filteredTasks: Task[]
  completedTasksInCat: Task[]
  addTask: (newTask: Omit<Task, 'id'>) => void
  toggleComplete: (id: number) => void
  toggleStarred: (id: number) => void
  showModal: boolean
  openModal: () => void
  closeModal: () => void
  showSettings: boolean
  openSettings: () => void
  closeSettings: () => void
  userAlias: string
  setUserAlias: React.Dispatch<React.SetStateAction<string>>  // Tipo para setState
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
  userAlias,
  setUserAlias
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
        userAlias={userAlias}
      />
      <MainContent
        // Búsqueda
        onSearch={onSearch}
        // Tareas
        tasks={filteredTasks}
        completedTasksInCat={completedTasksInCat}
        toggleComplete={toggleComplete}
        toggleStarred={toggleStarred}
        currentCategory={selectedCategory}
        // Modal de nueva tarea
        showModal={showModal}
        closeModal={closeModal}
        addTask={addTask}
        // Settings
        showSettings={showSettings}
        openSettings={openSettings}
        closeSettings={closeSettings}
        onAliasChange={(alias: string) => setUserAlias(alias)}
      />
    </div>
  )
}

export default Layout

