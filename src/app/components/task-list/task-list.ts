import { Component } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { tasks } from '../../core/moc_data/tasks';
import { TaskStatus } from '../../core/moc_data/status.enum';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {

  myTasks: Task[] = tasks;

  protected readonly TaskStatus = TaskStatus;

  selectedStatus: TaskStatus | 'all' = 'all';

  deleteTask(index: number): void {
    this.myTasks = this.myTasks.filter(task => task.id !== index);
  }

  onSelected(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.selectedStatus = status as TaskStatus | 'all';
  }

}
