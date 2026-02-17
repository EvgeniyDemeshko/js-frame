import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<number>();

  protected readonly TaskStatus = TaskStatus;

  deleteTask(id: number): void {
    this.taskDeleted.emit(id);
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

}
