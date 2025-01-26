import React from 'react'
import TaskItem from './TaskItem'
import { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
  toggleComplete: (id: number) => void
  toggleStarred: (id: number) => void
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleComplete,
  toggleStarred
}) => {
  if (!tasks.length) {
    return <p style={{ marginTop: '1rem' }}>No hay tareas para mostrar.</p>
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={() => toggleComplete(task.id)}
          onToggleStarred={() => toggleStarred(task.id)}
        />
      ))}
    </div>
  )
}

export default TaskList

