export type TaskStatus = 'backlog' | 'to do' | 'in progress' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export interface TaskService {
  addTask(title: string, status: TaskStatus): void;
  getTasks(): Task[];
}

export const TYPES = {
  TaskService: Symbol.for('TaskService'),
};
