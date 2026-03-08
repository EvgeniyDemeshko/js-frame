import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskFormComponent implements OnInit, OnChanges {
  task!: Task;
  submitted = false;
  protected readonly TaskStatus = TaskStatus;

  @Output() taskAdd: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() editTask: Task | null = null;

  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    assignee: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    status: new FormControl(TaskStatus.TODO, Validators.required)
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editTask'] && this.editTask) {
      this.taskForm.patchValue({
        ...this.editTask,
      dueDate: this.editTask.dueDate.toISOString().split('T')[0]
    });
    }
  }
  
  ngOnInit(): void {
    this.task = {
      id: -1,
      title: '',
      description: '',
      assignee: '',
      dueDate: new Date(),
      status: TaskStatus.TODO
    }
  }

  addTask(): void {
    this.submitted = true;
    this.taskForm.markAllAsTouched();

    if (this.taskForm.invalid) {
      return;
    }

    const formValue = this.taskForm.value;
    const copyTask: Task = {
      id: this.editTask?.id ?? -1,
      title: formValue.title ?? '',
      description: formValue.description ?? '',
      assignee: formValue.assignee ?? '',
      dueDate: new Date(formValue.dueDate ?? new Date()),
      status: (formValue.status as TaskStatus) ?? TaskStatus.TODO,
    };

    this.taskAdd.emit(copyTask);

    this.taskForm.reset({
      title: '',
      description: '',
      assignee: '',
      dueDate: '',
      status: TaskStatus.TODO,
    });
    this.submitted = false;
  }
}
