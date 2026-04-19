import { Component, OnInit } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { combineLatest, debounce, debounceTime, distinct, distinctUntilChanged, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { TaskStateService } from '../../share/state/task-state';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

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

  myTasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;

  hasLoading: boolean = false;

  filterControl = new FormControl('');

  constructor(
    private taskStateService: TaskStateService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private matSpinner: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.taskStateService.loadTasks();

    this.myTasks$ = combineLatest([
      this.taskStateService.tasks$,
      this.filterControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([tasks, filter]) => {
        const query = (filter ?? '').toLowerCase();
        return tasks.filter(task =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.assignee.toLowerCase().includes(query)
        );
      }),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialog(): void {
    this.dialog.open(TaskFormComponent, {
      height: '70vh',
      width: '80vw',
    });
  }

  loadTasks(status?: string): void {
    const taskStatus = status && status !== 'all' ? status : undefined;
    this.taskStateService.loadTasks(taskStatus);
  }

  addTask(task: Task): void {
    if (this.editingTask) {
      if (!task.id) return;
      this.taskStateService.updateTask(task);
      this.editingTask = null;
    } else {
      this.taskStateService.createTask(task);
    }
  }

  editTask(task: Task): void {
    this.taskStateService.selectTask(task);
    this.openDialog();
  }

  onSelected(event: MatSelectChange): void {
    this.taskStateService.loadTasks(event.value);
  }

  protected readonly TaskStatus = TaskStatus;

}