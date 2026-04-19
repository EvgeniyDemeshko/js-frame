import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, switchMap, tap, throwError } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { TaskService } from '../../services/task';

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  private _tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private _selectedTask$: BehaviorSubject<Task | null> = new BehaviorSubject<Task | null>(null);
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private currentStatusFilter?: string;

  public readonly tasks$ = this._tasks$.asObservable();
  public readonly selectedTask$ = this._selectedTask$.asObservable();
  public readonly loading$ = this._loading$.asObservable();
  public readonly error$ = this._error$.asObservable();

  constructor(private taskService: TaskService) {}

  loadTasks(status?: string): void {
    this.currentStatusFilter = status;
    this._loading$.next(true);
    this._error$.next(null);

    this.taskService.getTasks(status)
    .pipe(
      tap((tasks: Task[]) => this._tasks$.next(tasks)),
      catchError(err => {
        this._error$.next((err.console.errors) ? err.error.message + err.error.errors : err.error.message );
        return throwError(() => err.message);
       }),
       finalize(() => this._loading$.next(false)),
    ).subscribe()
  }

  createTask(task: Task): void {
    this._loading$.next(true);
    this._error$.next(null);

    this.taskService.createTask(task)
    .pipe(
      switchMap(() => this.taskService.getTasks(this.currentStatusFilter)),
      tap((updatedTasks: Task[]) => this._tasks$.next(updatedTasks)),
      catchError(err => {
        this._error$.next((err.console.errors) ? err.error.message + err.error.errors : err.error.message );
        return throwError(() => err.message);
       }),
       finalize(() => this._loading$.next(false)),
    ).subscribe()
  }

  updateTask(task: Task): void {
    this._loading$.next(true);
    this._error$.next(null);

    this.taskService.updateTask(task.id, task)
    .pipe(
      switchMap(() => this.taskService.getTasks(this.currentStatusFilter)),
      tap((updatedTasks: Task[]) => this._tasks$.next(updatedTasks)),
      catchError(err => {
        this._error$.next((err.console.errors) ? err.error.message + err.error.errors : err.error.message );
        return throwError(() => err.message);
       }),
       finalize(() => this._loading$.next(false)),
    ).subscribe()
  }

  patchTask(id: string, task: Partial<Task>): void {
    this._loading$.next(true);
    this._error$.next(null);

    this.taskService.patchTask(id, task)
    .pipe(
      switchMap(() => this.taskService.getTasks(this.currentStatusFilter)),
      tap((updatedTasks: Task[]) => this._tasks$.next(updatedTasks)),
      catchError(err => {
        this._error$.next((err.console.errors) ? err.error.message + err.error.errors : err.error.message );
        return throwError(() => err.message);
       }),
       finalize(() => this._loading$.next(false)),
    ).subscribe()
  }

  deleteTask(id: string): void {
    this._loading$.next(true);
    this._error$.next(null);

    this.taskService.deleteTask(id)
    .pipe(
      switchMap(() => this.taskService.getTasks(this.currentStatusFilter)),
      tap((updatedTasks: Task[]) => this._tasks$.next(updatedTasks)),
      catchError(err => {
        this._error$.next((err.console.errors) ? err.error.message + err.error.errors : err.error.message );
        return throwError(() => err.message);
       }),
      finalize(() => this._loading$.next(false)),
    ).subscribe();
  }

  selectTask(task: Task | null): void {
    this._selectedTask$.next(task);
  }
}
