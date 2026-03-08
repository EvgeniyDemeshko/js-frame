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

  editingTask: Task | null = null;

  editTask(task: Task): void {
    this.editingTask = {...task};
  }

  deleteTask(index: number): void {
    this.myTasks = this.myTasks.filter(task => task.id !== index);
  }

  onSelected(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.selectedStatus = status as TaskStatus | 'all';
  }

  addTask(task: Task): void {
    if (this.editingTask) {
      this.myTasks = this.myTasks.map(t => t.id === task.id ? {...task} : t);
      this.editingTask = null;
    } else {
    const maxId = this.myTasks.length > 0 ? Math.max(...this.myTasks.map(task => task.id)) : 0;
      task = {
        ...task,
      id: maxId + 1,
    }
      this.myTasks.push(task);
    }
  }
  
}
