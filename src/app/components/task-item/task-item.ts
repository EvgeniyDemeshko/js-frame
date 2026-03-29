import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
  providers: [DatePipe],
})
export class TaskItem {
  @Input() task!: Task;
  @Output() taskDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() taskEdited: EventEmitter<Task> = new EventEmitter<Task>();

  protected readonly TaskStatus = TaskStatus;

  constructor(private readonly datePipe: DatePipe, private readonly taskService: TaskService) {}

  deleteTask(id: string | undefined ): void {
    if (!id) return;
    this.taskDeleted.emit(id);
  }

  editTask(): void {
    this.taskEdited.emit(this.task);
  }

  getStatusClasses() {
    return {
      'done': this.task.status === TaskStatus.DONE,
      'todo': this.task.status === TaskStatus.TODO,
      'in-progress': this.task.status === TaskStatus.IN_PROGRESS
    }
  }

  updateStatus(event: Event): void {
    const selectedValue: string = (event.target as HTMLSelectElement).value;
    if (!this.task.id) return;

    this.taskService.patchTask(this.task.id, { status: selectedValue as TaskStatus }).subscribe({
      next: (updatedTask: Task) => this.task.status = updatedTask.status,
      error: (error: any) => console.log('Помилка оновлення статусу:', error),
    });
  }

  getFormattedDueDate(): string {
    return this.datePipe.transform(this.task.dueDate, 'dd.MM.yyyy') ?? '';
  }
}
