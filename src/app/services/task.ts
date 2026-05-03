import { Inject, Injectable } from '@angular/core';
import { Task } from '../core/models/task.model';
import { AppConfig, CONFIG_TOKEN } from '../share/config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TaskApi } from '../core/models/task-api.model';
import { TaskAdapter } from '../share/adapters/task.adapter';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor( 
    private http: HttpClient,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {}
  
  getTasks(status?: string): Observable<Task[]> {
    let params = new HttpParams();

    if (status) params = params.set('status', status);

    return this.http.get<TaskApi[]>(`${this.config.apiUrl}/v2/tasks`, { params }).pipe(
      map((tasks: TaskApi[]) => tasks.map(task => TaskAdapter.fromAPI(task)))
    );
  }

  createTask(newTask: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<TaskApi>(`${this.config.apiUrl}/v2/tasks`, TaskAdapter.toAPI(newTask)).pipe(
      map((task: TaskApi) => TaskAdapter.fromAPI(task))
    );
  }

  updateTask(id: string, updatedTask: Task): Observable<Task> {
    return this.http.put<TaskApi>(`${this.config.apiUrl}/v2/tasks/${id}`, TaskAdapter.toAPI(updatedTask)).pipe(
      map((task: TaskApi) => TaskAdapter.fromAPI(task))
    );
  }

  patchTask(id: string, updatedFields: Partial<Task>): Observable<Task> {
    return this.http.patch<TaskApi>(`${this.config.apiUrl}/v2/tasks/${id}`, TaskAdapter.toPartialApi(updatedFields)).pipe(
      map((task: TaskApi) => TaskAdapter.fromAPI(task))
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.config.apiUrl}/v2/tasks/${id}`);
  }

}
