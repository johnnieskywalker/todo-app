import React from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';

const App: React.FC = () => {
  const { tasks, addTask } = useTasks();

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>To-Do List</h1>
      <div style={{ marginBottom: '20px' }}>
        <TaskForm onAddTask={addTask} />
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
