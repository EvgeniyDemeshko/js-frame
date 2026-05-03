import { Component, OnInit } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as TaskActions from '../../store/task/task.actions';
import * as TaskSelectors from '../../store/task/task.selectors';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {

  destroy$ = new Subject<void>();
  editingTask: Task | null = null;
  selectedStatus: TaskStatus | 'all' = 'all';


  error$!: Observable<string | null>;
  myTasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;

  hasLoading: boolean = false;

  filterControl = new FormControl('');

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks({}));
    this.loading$ = this.store.select(TaskSelectors.selectTaskLoading);
    this.error$ = this.store.select(TaskSelectors.selectTaskError);
    this.myTasks$ = combineLatest([
      this.store.select(TaskSelectors.selectFilteredTasks),
      this.filterControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([tasks, filter]) =>
        tasks.filter(task =>
          task.title.toLowerCase().includes(filter ?? ''.toLowerCase()) ||
          task.description?.toLowerCase().includes(filter ?? ''.toLowerCase()) ||
          task.assignee.toLowerCase().includes(filter ?? ''.toLowerCase())
        )
      ),
    );

    this.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      if (error) {
        this.snackBar.open(error, 'Закрити', { duration: 4000, panelClass: ['error-snackbar'] });
      }
    });

    this.loading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
      this.hasLoading = loading;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openCreateDialog(): void {
    this.store.dispatch(TaskActions.selectTask({ id: null }));
    this.dialog.open(TaskFormComponent, {
      height: '70vh',
      width: '80vw',
    });
  }

  openDialog(): void {
    this.dialog.open(TaskFormComponent, {
      height: '70vh',
      width: '80vw',
    });
  }

  loadTasks(status?: string): void {
    const selectedStatus = (status ?? '') as TaskStatus | '';

    this.store.dispatch(TaskActions.setFilterStatus({ status: selectedStatus }));
    this.store.dispatch(
      selectedStatus ? TaskActions.loadTasks({ status: selectedStatus }) : TaskActions.loadTasks({})
    );
  }

  addTask(task: Task): void {
    if (this.editingTask) {
      if (!task.id) return;
      this.store.dispatch(TaskActions.updateTask({ task }));
      this.editingTask = null;
    } else {
      const { id: _, ...taskWithoutId } = task;
      this.store.dispatch(TaskActions.createTask({ task: taskWithoutId }));
    }
  }

  editTask(task: Task): void {
    this.store.dispatch(TaskActions.selectTask({ id: task.id }));
    this.openDialog();
  }

  onSelected(event: MatSelectChange): void {
    this.store.dispatch(TaskActions.setFilterStatus({ status: event.value }));
  }

  protected readonly TaskStatus = TaskStatus;

}