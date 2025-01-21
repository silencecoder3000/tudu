import React, { useState } from 'react'
import { Task } from '../types'

interface NewTaskFormProps {
  addTask: (newTask: Omit<Task, 'id'>) => void
  defaultCategory: string
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ addTask, defaultCategory }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask({
      title,
      description,
      dueDate,
      isStarred: false,
      isCompleted: false,
      category: defaultCategory
    })
    // Limpiamos campos
    setTitle('')
    setDescription('')
    setDueDate('')
  }

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <h3>Crear Nueva Tarea</h3>
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
      <button type="submit">Añadir Tarea</button>
    </form>
  )
}

export default NewTaskForm

