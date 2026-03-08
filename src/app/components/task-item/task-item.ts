import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
  providers: [DatePipe],
})
export class TaskItem {
  @Input() task!: Task;
  @Output() taskDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() taskEdited: EventEmitter<Task> = new EventEmitter<Task>();

  protected readonly TaskStatus = TaskStatus;

  constructor(private readonly datePipe: DatePipe) {}

  deleteTask(id: number): void {
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
    this.task.status = selectedValue as TaskStatus;
  }

  getFormattedDueDate(): string {
    return this.datePipe.transform(this.task.dueDate, 'dd.MM.yyyy') ?? '';
  }
}
