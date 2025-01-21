import React, { useState } from 'react'
import { Task } from '../types'

interface NewTaskModalProps {
  closeModal: () => void
  addTask: (newTask: Omit<Task, 'id'>) => void
  defaultCategory: string
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({
  closeModal,
  addTask,
  defaultCategory
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState(defaultCategory || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask({
      title,
      description,
      dueDate,
      isStarred: false,
      isCompleted: false,
      category: category || 'General'
    })
    closeModal()
  }

  // Cerrar modal al hacer click en overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    closeModal()
  }

  // Evitar que al hacer click dentro del modal se cierre
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleModalClick}>
        <h3>Nueva Tarea</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descripción..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Fecha de entrega (e.g. April 8th)"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          
          <div className="buttons-row">
            <button type="submit">Crear</button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTaskModal

