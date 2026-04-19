import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskFormValidator } from '../../share/directives/task-form.validator';
import { Subject, takeUntil } from 'rxjs';
import { TaskStateService } from '../../share/state/task-state';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
    standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskFormComponent implements OnInit, OnDestroy {
  
  destroy$ = new Subject<void>();
  editMode: boolean = false;
  private editingTaskId: string | null = null;

  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', TaskFormValidator.forbiddenWardsValidator(['React', 'Vue'])),
    assignee: new FormControl('', Validators.required),
    dueDate: new FormControl('', [Validators.required, TaskFormValidator.dateValidator]),
    status: new FormControl(TaskStatus.TODO, Validators.required)
  });

  protected readonly TaskStatus = TaskStatus;

  constructor(
    private taskStateService: TaskStateService,
    public dialogRef: MatDialogRef<TaskFormComponent>,
  ) {}
  
  ngOnInit(): void {
    this.taskStateService.selectedTask$.pipe(takeUntil(this.destroy$)).subscribe((task) => {
      if (task) {
        this.taskForm.patchValue(task);
        this.editMode = true;
        this.editingTaskId = task.id;
      } else {
        this.taskForm.reset({status: TaskStatus.TODO});
        this.editMode = false;
        this.editingTaskId = null;
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.editMode) {
        this.taskStateService.updateTask({
          id: this.editingTaskId ?? '',
          ...(this.taskForm.value as Omit<Task, 'id'>)
        } as Task);
        this.taskStateService.selectTask(null);
      } else {
        this.taskStateService.createTask(this.taskForm.value as Task);
      }
      this.dialogRef.close();
    }
  }

  ngOnDestroy(): void {
    this.taskStateService.selectTask(null);
    this.editingTaskId = null;
    this.destroy$.next();
    this.destroy$.complete();
  }
}