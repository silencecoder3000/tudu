import React, { useState } from 'react'
import Layout from './components/Layout'
import { Task } from './types'
import './App.css'

// Datos de ejemplo
const initialTasks: Task[] = [
  {
    id: 1,
    title: 'System Req',
    description: 'This is the task description. This is the task description.',
    dueDate: 'April 8th',
    isStarred: false,
    isCompleted: false,
    category: 'OSPSD class'
  },
  {
    id: 2,
    title: 'One pager',
    description: 'This is the task description. This is the task description.',
    dueDate: 'Mar 29th',
    isStarred: true,
    isCompleted: true,
    category: 'OSPSD class'
  },
  {
    id: 3,
    title: 'Task Item 1',
    description: 'This is the task description. This is the task description.',
    dueDate: 'Today',
    isStarred: true,
    isCompleted: false,
    category: 'Starred'
  },
  {
    id: 4,
    title: 'Buy fruits',
    description: 'Apples, bananas, oranges...',
    dueDate: 'April 10th',
    isStarred: false,
    isCompleted: false,
    category: 'Groceries'
  }
]

// Categorías iniciales, en el orden que quieras. 
// La función reorderCategories se encarga de poner 'Starred' al inicio y 'Completed' al final
const initialCategories = ['Starred', 'OSPSD class', 'Groceries', 'Completed']

/** Reordena categorías forzando que 'Starred' sea la primera y 'Completed' la última */
function reorderCategories(cats: string[]): string[] {
  const unique = Array.from(new Set(cats)) // quita duplicados
  const withoutStarredOrCompleted = unique.filter(c => c !== 'Starred' && c !== 'Completed')
  return ['Starred', ...withoutStarredOrCompleted, 'Completed']
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [categories, setCategories] = useState<string[]>(reorderCategories(initialCategories))
  const [userAlias, setUserAlias] = useState<string>('TuAlias')
  
  const [selectedCategory, setSelectedCategory] = useState<string>('Starred')
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Para mostrar/ocultar el modal de nueva tarea
  const [showModal, setShowModal] = useState(false)
  // Para mostrar/ocultar el modal de configuraciones
  const [showSettings, setShowSettings] = useState(false)

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  // Añadir nueva tarea
  const addTask = (newTask: Omit<Task, 'id'>) => {
    const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1
    const taskToAdd = { ...newTask, id: nextId }
    setTasks(prev => [...prev, taskToAdd])

    // Crear la categoría si no existía
    if (taskToAdd.category && !categories.includes(taskToAdd.category)) {
      const newCatList = reorderCategories([...categories, taskToAdd.category])
      setCategories(newCatList)
    }
  }

  // Toggle completado
  const toggleComplete = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    )
  }

  // Toggle favorito
  const toggleStarred = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, isStarred: !t.isStarred } : t))
    )
  }

  // Eliminar categoría (excepto 'Starred' y 'Completed')
  const removeCategory = (cat: string) => {
    // Borramos la categoría y las tareas asociadas
    setCategories(prev => reorderCategories(prev.filter(c => c !== cat)))
    setTasks(prev => prev.filter(t => t.category !== cat))
    // Si estabas en esa categoría, regresa a 'Starred'
    if (selectedCategory === cat) {
      setSelectedCategory('Starred')
    }
  }

  // Mostrar/ocultar modal de crear tarea
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  // Mostrar/ocultar settings
  const openSettings = () => setShowSettings(true)
  const closeSettings = () => setShowSettings(false)

  // Filtrado de tareas según la categoría o si es la de completados
  // Pero necesitamos *también* las completadas de esa categoría
  const matchSearch = (t: Task) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())

  let mainTasks: Task[] = []
  let completedTasksInCategory: Task[] = []

  if (selectedCategory === 'Completed') {
    // Todas las completadas
    mainTasks = tasks.filter(t => t.isCompleted && matchSearch(t))
  } else if (selectedCategory === 'Starred') {
    // Solo las incompletas y con estrella
    mainTasks = tasks.filter(t => t.isStarred && !t.isCompleted && matchSearch(t))
  } else {
    // Para otras categorías:
    // 1) Incompletas de esa categoría
    mainTasks = tasks.filter(
      t => t.category === selectedCategory && !t.isCompleted && matchSearch(t)
    )
    // 2) Completadas de esa categoría
    completedTasksInCategory = tasks.filter(
      t => t.category === selectedCategory && t.isCompleted && matchSearch(t)
    )
  }

  return (
    <div className="app-wrapper">
      <Layout
        tasks={tasks}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        removeCategory={removeCategory}
        onSearch={handleSearch}
        // Tareas que se muestran "arriba" (incompletas o, si es la cat Completed, todas completadas)
        filteredTasks={mainTasks}
        // Tareas completadas de la categoría
        completedTasksInCat={completedTasksInCategory}
        addTask={addTask}
        toggleComplete={toggleComplete}
        toggleStarred={toggleStarred}
        // Modales
        showModal={showModal}
        openModal={openModal}
        closeModal={closeModal}
        showSettings={showSettings}
        openSettings={openSettings}
        closeSettings={closeSettings}
        userAlias={userAlias}
        setUserAlias={setUserAlias}
      />
    </div>
  )
}

export default App

