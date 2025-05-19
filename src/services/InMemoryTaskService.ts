import { injectable } from 'inversify';
import { Task, TaskService, TaskStatus } from '../types';

const STORAGE_KEY = 'todo-app-tasks';

@injectable()
export class InMemoryTaskService implements TaskService {
  private tasks: Task[] = [];
  private idCounter = 0;

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.tasks = parsed.tasks || [];
        this.idCounter = parsed.idCounter || 0;
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage', error);
    }
  }

  private saveTasks(): void {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          tasks: this.tasks,
          idCounter: this.idCounter
        })
      );
    } catch (error) {
      console.error('Failed to save tasks to localStorage', error);
    }
  }

  addTask(title: string, status: TaskStatus): void {
    const task: Task = {
      id: String(this.idCounter++),
      title: title.trim(),
      status,
    };
    this.tasks.push(task);
    this.saveTasks();
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }
}
