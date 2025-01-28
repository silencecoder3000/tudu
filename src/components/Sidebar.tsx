import React from 'react'
import { Category, Task } from '../types'

interface SidebarProps {
  tasks: Task[]
  categories: Category[] // Cambiar a un array de objetos Category
  selectedCategory: string
  onCategorySelect: (category: string) => void
  removeCategory: (catId: number) => void // Cambiar a aceptar id de la categoría para eliminarla
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
  
      <h2>My Categories</h2>
      <ul className="category-list">
        {categories.map((cat) => (
          <li
            key={cat.name} // Usar el id de la categoría como key
            className={`category-item ${selectedCategory === cat.name ? 'selected' : ''}`}
            onClick={() => onCategorySelect(cat.name)} // Usar id en la función de selección
          >
            {cat.name === 'Starred' ? '⭐ ' : cat.name === 'Completed' ? '✓ ' : cat.name === 'All' ? '📂 ' : '• '}
            {cat.name}
            {cat.name !== 'All' && (
              <button
                className="remove-cat-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que se propague el clic al elemento li
                  removeCategory(cat.idlabel); // Eliminar por nombre o id
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
  );
  
}

export default Sidebar
