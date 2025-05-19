import { InMemoryTaskService } from '../InMemoryTaskService';

describe('InMemoryTaskService', () => {
  let service: InMemoryTaskService;

  beforeEach(() => {
    service = new InMemoryTaskService();
  });

  describe('addTask', () => {
    it('should add a task with unique id', () => {
      service.addTask('Test Task', 'to do');
      const tasks = service.getTasks();
      
      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toMatchObject({
        title: 'Test Task',
        status: 'to do',
        id: expect.any(String)
      });
    });

    it('should increment idCounter for each new task', () => {
      service.addTask('Task 1', 'to do');
      service.addTask('Task 2', 'in progress');
      
      const tasks = service.getTasks();
      expect(tasks[0].id).not.toBe(tasks[1].id);
    });
  });

  describe('getTasks', () => {
    it('should return empty array when no tasks', () => {
      // Clear localStorage before this test
      localStorage.clear();
      const emptyService = new InMemoryTaskService();
      expect(emptyService.getTasks()).toEqual([]);
    });

    it('should return all added tasks', () => {
      // Clear localStorage before this test
      localStorage.clear();
      const testService = new InMemoryTaskService();
      
      testService.addTask('Task 1', 'to do');
      testService.addTask('Task 2', 'in progress');
      
      const tasks = testService.getTasks();
      expect(tasks).toHaveLength(2);
      
      // Check tasks properties without relying on exact order
      const taskTitles = tasks.map(task => task.title);
      expect(taskTitles).toContain('Task 1');
      expect(taskTitles).toContain('Task 2');
      
      const taskStatuses = tasks.map(task => task.status);
      expect(taskStatuses).toContain('to do');
      expect(taskStatuses).toContain('in progress');
    });

    it('should return a copy of tasks array', () => {
      // Clear localStorage before this test
      localStorage.clear();
      const testService = new InMemoryTaskService();
      
      testService.addTask('Test', 'to do');
      const tasks1 = testService.getTasks();
      const tasks2 = testService.getTasks();
      
      // They should be equal in content but different references
      expect(tasks1).not.toBe(tasks2);
      expect(tasks1).toEqual(tasks2);
      
      // Modifying the returned array shouldn't affect the service
      tasks1.push({ id: '999', title: 'Should not exist', status: 'to do' });
      const serviceTasks = testService.getTasks();
      expect(serviceTasks).toHaveLength(1);
      expect(serviceTasks[0].title).toBe('Test');
    });
  });
});
