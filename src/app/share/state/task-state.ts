import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { AppState } from '../../app.state';
import * as TaskActions from '../../store/task/task.actions';
import {
  selectFilteredTasks,
  selectSelectedTask,
  selectTaskError,
  selectTaskLoading,
} from '../../store/task/task.selectors';

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  public readonly tasks$: Observable<Task[]>;
  public readonly selectedTask$: Observable<Task | null>;
  public readonly loading$: Observable<boolean>;
  public readonly error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.select(selectFilteredTasks);
    this.selectedTask$ = this.store.select(selectSelectedTask);
    this.loading$ = this.store.select(selectTaskLoading);
    this.error$ = this.store.select(selectTaskError);
  }

  loadTasks(status?: string): void {
    const selectedStatus = (status ?? '') as TaskStatus | '';
    this.store.dispatch(TaskActions.setFilterStatus({ status: selectedStatus }));
    this.store.dispatch(
      selectedStatus ? TaskActions.loadTasks({ status: selectedStatus }) : TaskActions.loadTasks({})
    );
  }

  createTask(task: Omit<Task, 'id'>): void {
    this.store.dispatch(TaskActions.createTask({ task }));
  }

  updateTask(task: Task): void {
    this.store.dispatch(TaskActions.updateTask({ task }));
  }

  patchTask(id: string, task: Partial<Task>): void {
    this.store.dispatch(TaskActions.patchTask({ id, changes: task }));
  }

  deleteTask(id: string): void {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  selectTask(task: Task | null): void {
    this.store.dispatch(TaskActions.selectTask({ id: task?.id ?? null }));
  }
}
