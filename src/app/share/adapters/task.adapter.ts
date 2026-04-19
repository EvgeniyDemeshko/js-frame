import { TaskApi, TaskApiPayload } from '../../core/models/task-api.model';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/moc_data/status.enum';

export class TaskAdapter {
    static fromAPI(response: TaskApi): Task {
        return {
        id: response._id,
            title: response.title,
            description: response.description || '',
            assignee: response.assignee,
            dueDate: response.dueDate?.split('T')[0],
            status: response.status as TaskStatus
        }
    }

    static toAPI(task: Omit<Task, 'id'>): TaskApiPayload {
        return {
            title: task.title,
            description: task.description || '',
            assignee: task.assignee,
            dueDate: new Date(task.dueDate).toISOString(),
            status: task.status
        }
    }

    static toPartialApi(partialTask: Partial<Task>): Partial<TaskApiPayload> {
        const apiTask: Partial<TaskApiPayload> = {};
        if (partialTask.title !== undefined) {
            apiTask.title = partialTask.title;
        }
        if (partialTask.description !== undefined) {
            apiTask.description = partialTask.description;
        }
        if (partialTask.assignee !== undefined) {
            apiTask.assignee = partialTask.assignee;
        }
        if (partialTask.dueDate) {
            apiTask.dueDate = new Date(partialTask.dueDate).toISOString();
        }
        if (partialTask.status) {
            apiTask.status = partialTask.status as string;
        }
        return apiTask;
    }
}