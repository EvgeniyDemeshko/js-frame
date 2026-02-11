import { Component } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { tasks } from '../../core/moc_data/tasks';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {

  myTasks: Task[] = tasks;

  deleteTask(index: number): void {
    console.log(`Видалити завдання з індексом: ${index}`);
  }
}
