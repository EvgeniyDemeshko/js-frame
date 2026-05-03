import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { MatSelectChange } from '@angular/material/select';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../store/task/task.actions';

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

  constructor(private store: Store<AppState>) {}

  deleteTask(id: string): void {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  editTask(): void {
    const id = this.task.id;
    this.store.dispatch(TaskActions.selectTask({ id }));
    this.taskEdited.emit();
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
    const id = this.task.id;
    this.store.dispatch(TaskActions.patchTask({ id, changes: { status: selectedValue } }));
  }

  protected readonly TaskStatus = TaskStatus;
}
