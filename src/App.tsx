import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './components/SignUp'
import Layout from './components/Layout'
import Login from './components/Login'
import { Task, Category, ApiTask, CategoriesApi } from './types'
import './App.css'

// Example initial tasks
const initialTasks: Task[] = []

// Initial categories
const initialCategories:Category[] = []

// Reorder function
function reorderCategories(cats: Category[]): Category[] {
  // Eliminar duplicados basados en la propiedad 'name'
  const unique = Array.from(new Set(cats.map(c => c.name)))
    .map(name => cats.find(c => c.name === name)) as Category[];

  // Filtrar categorías sin 'Starred' ni 'Completed'
  const withoutStarredOrCompleted = unique.filter(c => c.name !== 'Starred' && c.name !== 'Completed');

  // Reordenar y agregar 'Starred' y 'Completed' al principio y al final
  return [
    ...withoutStarredOrCompleted.filter(c => c.name === 'Starred'),
    ...withoutStarredOrCompleted.filter(c => c.name !== 'Starred' && c.name !== 'Completed'),
    ...withoutStarredOrCompleted.filter(c => c.name === 'Completed')
  ];
}

function App() {
  // ------------------- States for tasks & categories -------------------
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  
  // Cambia el tipo de estado de categories a Category[] y usa reorderCategories para ordenar las categorías
  const [categories, setCategories] = useState<Category[]>(reorderCategories(initialCategories));


  const [selectedCategory, setSelectedCategory] = useState('All')
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

  const [authToken, setAuthToken] = useState<string>(''); 

  // Método para cargar tareas desde el endpoint
  const loadTasks = async () => {
    try {
      // Hacemos la solicitud GET con el token Bearer
      const response = await fetch('http://localhost:5176/task', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Verificamos si la respuesta es correcta
      if (!response.ok) {
        throw new Error('Error al cargar las tareas');
      }
  
      const data = await response.json();

      console.log(data)
  
    
      const loadedTasks: Task[] = data.data.map((task: ApiTask) => ({
        id: task.idtask, 
        description: task.description,
        dueDate: task.endDate, 
        isStarred: false, 
        isCompleted: task.estado, 
        category: task.category, 
      }));

      console.log(loadedTasks);

      setTasks(loadedTasks); 
      console.log("checa")
      console.log(tasks);
  
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  };
  
  useEffect(() => {
    console.log("Tasks actualizado:", tasks);
  }, [tasks]);
  

  useEffect(() => {
    loadTasks(); // Cargar las tareas de la categoría seleccionada
  }, [selectedCategory]);

  
// Método para cargar categorías desde el endpoint
const loadCategories = async () => {
  try {
    // Hacemos la solicitud GET con el token Bearer
    const response = await fetch('http://localhost:5176/categories', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    });

    // Verificamos si la respuesta es correcta
    if (!response.ok) {
      throw new Error('Error al cargar las categorías');
    }

    const data = await response.json();
    console.log(data); // Aquí puedes revisar cómo llega la data

    // Creamos la categoría "All"
    const allCategory:Category = {
      idlabel: 0, 
      name: 'All',
      description: 'Todas las categorías',
    };

    // Mapeamos las categorías al formato definido por la interfaz `Category`
    const loadedCategories: Category[] = data.data.map((category: CategoriesApi) => ({
      idlabel: category.idlabel,
      name: category.name,
      description: category.description,
    }));

    // Agregamos la categoría "All" al principio de la lista de categorías
    setCategories([allCategory, ...loadedCategories]);

  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
};




  const crearTarea = async (newTask: { description: string, priority: string, endDate: string }) => {
    try {
      
      const response = await fetch('http://localhost:5176/task', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Usamos el token para autorizar la solicitud
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Description: newTask.description,
          Priority: newTask.priority,
          EndDate: newTask.endDate,
        }),
      });
  
      // Verificamos si la respuesta fue exitosa
      if (response.ok) {
        const data = await response.json();
        console.log(data); 
        loadTasks();
      } else {
       
        const errorData = await response.json();
        console.error('Error:', errorData.data);
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };
  


  const toggleComplete = async (id: number) => {
    try {
      // Realizamos la solicitud PATCH al endpoint
      const response = await fetch(`http://localhost:5176/task/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${authToken}`,  // Usa el token JWT que tienes
          'Content-Type': 'application/json',
        },
      });
  
      // Verificamos si la respuesta es correcta
      if (!response.ok) {
        throw new Error('Error al marcar la tarea como completada');
      }
  
      const data = await response.json();
      if (data.status === 200) {
        // Si la tarea se completó correctamente en el backend, actualizamos el estado local
        loadTasks();
      } else {
        console.error('Error al completar la tarea', data.data);
      }
    } catch (error) {
      console.error('Error de comunicación con el servidor:', error);
    }
  };

  const toggleStarred = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, isStarred: !t.isStarred } : t))
    )
  }

  const removeCategory = async (catId: number) => {
    try {
      const response = await fetch(`http://localhost:5176/categories/${catId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      if (response.ok && result.status === 200) {
        console.log(result.message);
  
        loadCategories();
  
      
      } else {
        console.error(result.message || 'No se pudo eliminar la categoría');
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };
  

  const handleSearch = (term: string) => setSearchTerm(term)
  const matchSearch = (t: Task) => t.description.toLowerCase().includes(searchTerm.toLowerCase())

  const mainTasks: Task[] = []
  const completedTasksInCategory: Task[] = []

  // if (selectedCategory === 'Completed') {
  //   mainTasks = tasks.filter(t => t.isCompleted && matchSearch(t))
  // } else if (selectedCategory === 'Starred') {
  //   mainTasks = tasks.filter(t => t.isStarred && !t.isCompleted && matchSearch(t))
  // } else {
  //   mainTasks = tasks.filter(t => t.category === selectedCategory && !t.isCompleted && matchSearch(t))
  //   completedTasksInCategory = tasks.filter(
  //     t => t.category === selectedCategory && t.isCompleted && matchSearch(t)
  //   )
  // }

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
            <Login
            onLogin={handleLogin}
            setAuthToken={setAuthToken}
            loadCategories={loadCategories} // Pasamos la función como prop
          />
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
                addTask={crearTarea}
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

