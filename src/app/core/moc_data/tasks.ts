import {Task} from '../models/task.model';
import { TaskStatus } from './status.enum';

export const tasks: Task[] = [
    {
        id: 0,
        title: 'Встановити Angular',
        assignee: 'Євгеній',
        dueDate: new Date('2026-02-10'),
        status: TaskStatus.DONE
    },
    {
        id: 1,
        title: 'Ознайомитися з компонентами',
        description: 'Ознайомитися з компонентами та оглянути взаємодію між ними',
        assignee: 'Євгеній',
        dueDate: new Date('2026-02-11'),
        status: TaskStatus.IN_PROGRESS
    },
    {
        id: 2,
        title: 'Ознайомитися з Control Flow',
        description: 'Ознайомитися з старим і новим підходом до Control Flow',
        assignee: 'Євгеній',
        dueDate: new Date('2026-02-12'),
        status: TaskStatus.TODO
    }
];