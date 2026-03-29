import {TaskStatus} from '../moc_data/status.enum';

export interface Task {
    id: string;
    title: string;
    description?: string;
    assignee: string;
    dueDate: string;
    status: TaskStatus;
}