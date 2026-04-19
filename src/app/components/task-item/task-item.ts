import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { TaskStateService } from '../../share/state/task-state';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
  providers: [DatePipe],
})
export class TaskItem {
  @Input() task!: Task;

  @Output() taskEdited: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private taskStateService: TaskStateService) {}

  deleteTask(id: string): void {
    this.taskStateService.deleteTask(id);
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

  updateStatus(event: MatSelectChange): void {
    const selectedValue = event.value;
    this.taskStateService.patchTask(this.task.id, { status: selectedValue });
  }

  protected readonly TaskStatus = TaskStatus;
}
