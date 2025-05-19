import { useState, useCallback } from 'react';
import { useInjection } from 'inversify-react';
import { TYPES, TaskService, TaskStatus, Task } from '../types';

export function useTasks() {
  const taskService = useInjection<TaskService>(TYPES.TaskService);
  const [tasks, setTasks] = useState<Task[]>(taskService.getTasks());

  const addTask = useCallback(
    (title: string, status: TaskStatus) => {
      taskService.addTask(title, status);
      setTasks(taskService.getTasks()); // Refresh state from service
    },
    [taskService]
  );

  return { tasks, addTask };
}
