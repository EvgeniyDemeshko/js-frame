export interface Task {
    id: number;
    title: string;
    description?: string;
    assignee: string;
    duedate: string;
}