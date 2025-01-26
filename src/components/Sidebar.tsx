import React from 'react'
import { Task } from '../types'

interface SidebarProps {
  tasks: Task[]
  categories: string[]
  selectedCategory: string
  onCategorySelect: (category: string) => void
  removeCategory: (cat: string) => void
  openModal: () => void
  userAlias: string
}

const Sidebar: React.FC<SidebarProps> = ({
  tasks,
  categories,
  selectedCategory,
  onCategorySelect,
  removeCategory,
  openModal,
  userAlias
}) => {
  return (
    <div className="sidebar">
      <h1>Hi, {userAlias}!</h1>
      <div className="search-bar-container">
        {/* Espacio para algo si deseas */}
      </div>

      <h2>My Tasks</h2>
      <ul className="category-list">
        {categories.map(cat => (
          <li
            key={cat}
            className={`category-item ${selectedCategory === cat ? 'selected' : ''}`}
            onClick={() => onCategorySelect(cat)}
          >
            {cat === 'Starred' ? '⭐ ' : (cat === 'Completed' ? '✓ ' : '• ')}
            {cat}
            {cat !== 'Starred' && cat !== 'Completed' && (
              <button
                className="remove-cat-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  removeCategory(cat)
                }}
                title="Eliminar esta lista"
              >
                x
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Botón para abrir el modal de nueva tarea */}
      <button className="add-task-btn" onClick={openModal}>
        +
      </button>
    </div>
  )
}

export default Sidebar


