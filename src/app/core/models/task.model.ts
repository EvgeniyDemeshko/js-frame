import {TaskStatus} from '../moc_data/status.enum';
export interface Task {
    id: number;
    title: string;
    description?: string;
    assignee: string;
    dueDate: string;
    status: TaskStatus;
}