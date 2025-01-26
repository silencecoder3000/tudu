import React from 'react'
import { Task } from '../types'

interface TaskItemProps {
  task: Task
  onToggleComplete: () => void
  onToggleStarred: () => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onToggleStarred }) => {
  return (
    <div className="task-item">
      <div className="task-left">
        <div
          className={`circle ${task.isCompleted ? 'completed' : ''}`}
          onClick={onToggleComplete}
          title="Completar tarea"
        />
        <div className="task-info">
          <span className={`task-title ${task.isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </span>
          <p className="task-desc">{task.description}</p>
        </div>
      </div>
      <div className="task-right">
        <div className="task-date">{task.dueDate}</div>
        <span
          className={`star ${task.isStarred ? 'starred' : ''}`}
          onClick={onToggleStarred}
          title="Marcar/Desmarcar favorito"
        >
          ★
        </span>
      </div>
    </div>
  )
}

export default TaskItem

