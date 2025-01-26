import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './components/SignUp'
import Layout from './components/Layout'
import Login from './components/Login'
import { Task } from './types'
import './App.css'

// Example initial tasks
const initialTasks: Task[] = [
  {
    id: 1,
    title: 'System Req',
    description: 'This is the task description.',
    dueDate: 'April 8th',
    isStarred: false,
    isCompleted: false,
    category: 'OSPSD class',
  },
  {
    id: 2,
    title: 'One pager',
    description: 'This is the task description.',
    dueDate: 'Mar 29th',
    isStarred: true,
    isCompleted: true,
    category: 'OSPSD class',
  },
  {
    id: 3,
    title: 'Task Item 1',
    description: 'This is the task description.',
    dueDate: 'Today',
    isStarred: true,
    isCompleted: false,
    category: 'Starred',
  },
  {
    id: 4,
    title: 'Buy fruits',
    description: 'Apples, bananas, oranges...',
    dueDate: 'April 10th',
    isStarred: false,
    isCompleted: false,
    category: 'Groceries',
  },
]

// Initial categories
const initialCategories = ['Starred', 'OSPSD class', 'Groceries', 'Completed']

// Reorder function
function reorderCategories(cats: string[]): string[] {
  const unique = Array.from(new Set(cats))
  const withoutStarredOrCompleted = unique.filter(c => c !== 'Starred' && c !== 'Completed')
  return ['Starred', ...withoutStarredOrCompleted, 'Completed']
}

function App() {
  // ------------------- States for tasks & categories -------------------
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [categories, setCategories] = useState<string[]>(
    reorderCategories(initialCategories)
  )
  const [selectedCategory, setSelectedCategory] = useState('Starred')
  const [searchTerm, setSearchTerm] = useState('')

  // Modals
  const [showModal, setShowModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // ------------------- Login credentials & login state -------------------
  const [credentials, setCredentials] = useState({
    username: 'myuser',
    email: 'user@example.com',
    password: '123',
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [userAlias, setUserAlias] = useState('TuAlias')

  // ------------------- Handling login -------------------
  const handleLogin = () => {

    setIsLoggedIn(true)
  }
  
  const handleUpdateCredentials = (newCreds: typeof credentials) => {
    setCredentials(newCreds)
    alert('¡Credenciales actualizadas!')
  }

  const handleAliasChange = (alias: string) => {
    setUserAlias(alias)
  }

  // ------------------- Task management (unchanged) -------------------
  const addTask = (newTask: Omit<Task, 'id'>) => {
    const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1
    const taskToAdd = { ...newTask, id: nextId }
    setTasks(prev => [...prev, taskToAdd])

    // Create category if doesn't exist
    if (taskToAdd.category && !categories.includes(taskToAdd.category)) {
      const newCatList = reorderCategories([...categories, taskToAdd.category])
      setCategories(newCatList)
    }
  }

  const toggleComplete = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    )
  }

  const toggleStarred = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, isStarred: !t.isStarred } : t))
    )
  }

  const removeCategory = (cat: string) => {
    setCategories(prev => reorderCategories(prev.filter(c => c !== cat)))
    setTasks(prev => prev.filter(t => t.category !== cat))
    if (selectedCategory === cat) {
      setSelectedCategory('Starred')
    }
  }

  const handleSearch = (term: string) => setSearchTerm(term)
  const matchSearch = (t: Task) => t.title.toLowerCase().includes(searchTerm.toLowerCase())

  let mainTasks: Task[] = []
  let completedTasksInCategory: Task[] = []

  if (selectedCategory === 'Completed') {
    mainTasks = tasks.filter(t => t.isCompleted && matchSearch(t))
  } else if (selectedCategory === 'Starred') {
    mainTasks = tasks.filter(t => t.isStarred && !t.isCompleted && matchSearch(t))
  } else {
    mainTasks = tasks.filter(t => t.category === selectedCategory && !t.isCompleted && matchSearch(t))
    completedTasksInCategory = tasks.filter(
      t => t.category === selectedCategory && t.isCompleted && matchSearch(t)
    )
  }

  // ------------------- Routing with React Router -------------------
  return (
    <Routes>
      {/* /login → If logged in -> redirect to "/", else show <Login> */}
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* /signup → If logged in -> redirect to "/", else show <SignUp> */}
      <Route
        path="/signup"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <SignUp />
          )
        }
      />

      {/* / (root) → If NOT logged in -> /login, else show the Layout (main to-do UI) */}
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <div className="app-wrapper">
              <Layout
                tasks={tasks}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                removeCategory={removeCategory}
                onSearch={handleSearch}
                filteredTasks={mainTasks}
                completedTasksInCat={completedTasksInCategory}
                addTask={addTask}
                toggleComplete={toggleComplete}
                toggleStarred={toggleStarred}
                showModal={showModal}
                openModal={() => setShowModal(true)}
                closeModal={() => setShowModal(false)}
                showSettings={showSettings}
                openSettings={() => setShowSettings(true)}
                closeSettings={() => setShowSettings(false)}
                userAlias={userAlias}
                onAliasChange={handleAliasChange}
                credentials={credentials}
                onUpdateCredentials={handleUpdateCredentials}
              />
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Anything else → If logged in go "/", else go "/login" */}
      <Route
        path="*"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

export default App

