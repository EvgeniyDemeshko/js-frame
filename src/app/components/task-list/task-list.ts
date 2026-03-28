import { Component } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { tasks } from '../../core/moc_data/tasks';
import { TaskStatus } from '../../core/moc_data/status.enum';
import { TaskService } from '../../services/task';

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

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.myTasks = this.taskService.getTasks();
  }

  editTask(task: Task): void {
    this.editingTask = {...task};
  }

  deleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.loadTasks();
  }

  onSelected(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.selectedStatus = status as TaskStatus | 'all';
  }

  addTask(task: Task): void {
    if (this.editingTask) {
      this.taskService.updateTask(task);
      this.editingTask = null;
    } else {
      this.taskService.addtask(task);
    }
      this.loadTasks();
    }
}