import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<number>();

  deleteTask(id: number): void {
    this.taskDeleted.emit(id);
  }
}
