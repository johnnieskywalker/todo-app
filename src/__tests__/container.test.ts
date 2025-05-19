import container from '../container';
import { TYPES } from '../types';
import { InMemoryTaskService } from '../services/InMemoryTaskService';

describe('Inversify Container', () => {
  it('should bind TaskService to InMemoryTaskService as singleton', () => {
    const instance1 = container.get(TYPES.TaskService);
    const instance2 = container.get(TYPES.TaskService);
    
    expect(instance1).toBeInstanceOf(InMemoryTaskService);
    expect(instance1).toBe(instance2);
  });
});
