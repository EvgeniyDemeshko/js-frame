import { TaskStatusPipe } from './task-status-pipe';
import { TaskStatus } from '../../core/moc_data/status.enum';

describe('TaskStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskStatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('maps statuses to Ukrainian labels', () => {
    const pipe = new TaskStatusPipe();

    expect(pipe.transform(TaskStatus.DONE)).toBe('Виконано');
    expect(pipe.transform(TaskStatus.TODO)).toBe('До роботи');
    expect(pipe.transform(TaskStatus.IN_PROGRESS)).toBe('У процесі');
  });
});
