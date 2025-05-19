import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add a task to get started!</p>;
  }

  const statusEmoji: Record<string, string> = {
    'backlog': '📋',
    'to do': '📝',
    'in progress': '🔄',
    'done': '✅'
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li 
          key={task.id} 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            margin: '8px 0',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <span>{statusEmoji[task.status] || '📌'} {task.title}</span>
          <span style={{
            padding: '4px 8px',
            borderRadius: '12px',
            backgroundColor: '#e9ecef',
            fontSize: '0.8em',
            textTransform: 'capitalize'
          }}>
            {task.status}
          </span>
        </li>
      ))}
    </ul>
  );
};
