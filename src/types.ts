/**
 * String literal union type for task statuses.
 * 
 * This is the recommended approach in TypeScript instead of traditional enums because:
 * 1. It's more type-safe and provides better inference
 * 2. No runtime overhead (compiles to simple strings)
 * 3. Better IDE support with autocompletion
 * 4. Easier to work with in type guards and discriminated unions
 * 
 * As suggested in "Effective TypeScript" (Dan Vanderkam), string literal types are
 * often a better choice than enums when you need a fixed set of string values.
 */
export type TaskStatus = 'backlog' | 'to do' | 'in progress' | 'done';

/**
 * Represents a task in the todo application.
 * 
 * @property {string} id - Unique identifier for the task (usually a UUID)
 * @property {string} title - The title/description of the task
 * @property {TaskStatus} status - The current status of the task
 */
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

/**
 * Service interface for task management operations.
 * 
 * This interface defines the contract that any task service implementation must follow.
 * It's part of the application's core domain and enables:
 * - Loose coupling between components
 * - Easy testing through dependency injection
 * - Flexibility to swap implementations (e.g., in-memory, API-based, etc.)
 * 
 * The interface follows the Dependency Inversion Principle by depending on abstractions,
 * making the code more maintainable and testable.
 */
export interface TaskService {
  /**
   * Adds a new task to the system
   * @param title - The title of the task
   * @param status - The initial status of the task
   */
  addTask(title: string, status: TaskStatus): void;
  
  /**
   * Retrieves all tasks
   * @returns An array of Task objects
   */
  getTasks(): Task[];
}

/**
 * InversifyJS container binding types.
 * 
 * According to the InversifyJS documentation:
 * > "Dependency injection is a way to implement Inversion of Control (IoC) that allows
 * > the creation of dependent objects outside of a class and provides those objects to
 * > a class through different ways."
 * 
 * These symbols serve as unique identifiers (tokens) for the dependencies that will be
 * injected throughout the application. As per the documentation:
 * > "By using symbols, you can provide interface implementations in a way that the dependent class is not aware of the dependency implementation details."
 * 
 * The use of `Symbol.for()` ensures that the tokens are unique and helps prevent
 * naming collisions in the dependency injection container. The documentation states:
 * > "Symbol.for() creates a global symbol that can be shared across files."
 * 
 * This approach is particularly useful in large applications where you might have
 * multiple dependencies with similar names but different implementations.
 * 
 * Reference: https://inversify.io/docs/introduction/dependency-inversion/ (InversifyJS Documentation)
 */
export const TYPES = {
  TaskService: Symbol.for('TaskService'),
};
