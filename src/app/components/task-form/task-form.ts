import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../app.state';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { Task } from '../../core/models/task.model';
import { TaskFormValidator } from '../../share/directives/task-form.validator';
import * as TaskActions from '../../store/task/task.actions';
import * as TaskSelectors from '../../store/task/task.selectors';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  selectedTask$!: Observable<Task | null>;
  taskForm!: FormGroup;
  editMode: boolean = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormComponent>,
  ) {}

  ngOnInit(): void {
    this.selectedTask$ = this.store.select(TaskSelectors.selectSelectedTask);
    this.taskForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', TaskFormValidator.forbiddenWardsValidator(['React', 'Vue'])],
      dueDate: ['', [Validators.required, TaskFormValidator.dateValidator]],
      assignee: ['', Validators.required],
      status: [TaskStatus.TODO, Validators.required],
    });

    this.selectedTask$.pipe(takeUntil(this.destroy$)).subscribe((task: Task | null) => {
      if (task) {
        this.taskForm.patchValue(task);
        this.editMode = true;
      } else {
        this.taskForm.reset({ status: TaskStatus.TODO });
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.editMode) {
        this.store.dispatch(TaskActions.updateTask({ task: { ...this.taskForm.value } }));
      } else {
        this.store.dispatch(TaskActions.createTask({ task: { ...this.taskForm.value } }));
      }

      this.store.dispatch(TaskActions.selectTask({ id: null }));
      this.dialogRef.close();
    }
  }
}