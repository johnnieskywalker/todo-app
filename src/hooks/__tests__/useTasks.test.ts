import { renderHook, act } from '@testing-library/react';
import { useTasks } from '../useTasks';
import { TaskStatus } from '../../types';
import { useInjection } from 'inversify-react';

// Mock the useInjection hook
jest.mock('inversify-react', () => ({
  useInjection: jest.fn(),
}));

describe('useTasks', () => {
  let mockAddTask: jest.Mock;
  let mockGetTasks: jest.Mock;
  let mockTaskService: any;

  beforeEach(() => {
    mockAddTask = jest.fn();
    mockGetTasks = jest.fn();
    
    mockTaskService = {
      addTask: mockAddTask,
      getTasks: mockGetTasks,
    };
    
    (useInjection as jest.Mock).mockReturnValue(mockTaskService);
  });

  it('should initialize tasks from service', () => {
    const mockTasks = [
      { id: '1', title: 'Test Task', status: 'to do' as TaskStatus },
    ];
    mockGetTasks.mockReturnValue(mockTasks);

    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toEqual(mockTasks);
    expect(useInjection).toHaveBeenCalled();
  });

  it('should call addTask on the service and update tasks', () => {
    const initialTasks = [
      { id: '1', title: 'Existing Task', status: 'to do' as TaskStatus },
    ];
    const newTask = { id: '2', title: 'New Task', status: 'in progress' as TaskStatus };
    
    mockGetTasks
      .mockReturnValueOnce(initialTasks)
      .mockReturnValueOnce([...initialTasks, newTask]);

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('New Task', 'in progress');
    });

    expect(mockAddTask).toHaveBeenCalledWith('New Task', 'in progress');
    expect(result.current.tasks).toHaveLength(2);
    expect(result.current.tasks[1]).toMatchObject({
      title: 'New Task',
      status: 'in progress',
    });
  });
});
