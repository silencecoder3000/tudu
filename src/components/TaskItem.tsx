import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggleComplete: () => void;
  onToggleStarred: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onToggleStarred }) => {
  return (
    <div className="task-item">
      <div className="task-left">
        <div
          className={`circle ${task.isCompleted ? 'completed' : ''}`}
          onClick={onToggleComplete}
          title="Marcar tarea como completada"
        />
      </div>
      <div className="task-right">
        {/* Mostrar la descripción como título */}
        <h3 className="task-description">{task.description}</h3>
        {/* Mostrar si la tarea está completada */}
        <div className={`task-status ${task.isCompleted ? 'completed' : 'pending'}`}>
          {task.isCompleted ? 'Completada' : 'Pendiente'}
        </div>
        {/* Botón para marcar como favorito */}
        <span
          className={`star ${task.isStarred ? 'starred' : ''}`}
          onClick={onToggleStarred}
          title="Marcar/Desmarcar favorito"
        >
          ★
        </span>
      </div>
    </div>
  );
}

export default TaskItem;
