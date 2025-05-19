import { Container } from 'inversify';
import { TYPES } from './types';
import { InMemoryTaskService } from './services/InMemoryTaskService';

const container = new Container();
container.bind(TYPES.TaskService).to(InMemoryTaskService).inSingletonScope();

export default container;
