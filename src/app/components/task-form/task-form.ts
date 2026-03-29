import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskFormValidator } from '../../share/directives/task-form.validator';

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
    description: new FormControl('', TaskFormValidator.forbiddenWardsValidator(['React', 'Vue'])),
    assignee: new FormControl('', Validators.required),
    dueDate: new FormControl('', [Validators.required, TaskFormValidator.dateValidator]),
    status: new FormControl(TaskStatus.TODO, Validators.required)
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editTask'] && this.editTask) {
      this.taskForm.patchValue(this.editTask);
    }
  }
  
  ngOnInit(): void {
    this.task = {
      id: '',
      title: '',
      description: '',
      assignee: '',
      dueDate: new Date().toISOString().split('T')[0],
      status: TaskStatus.TODO
    }
  }

  addTask(): void {
    if (this.taskForm.valid) {
      let taskData = {
        ...this.taskForm.value,
        id: this.editTask ? this.editTask.id : undefined,
      };
      this.taskAdd.emit(taskData as Task);
      this.taskForm.reset();
    }
  }
}