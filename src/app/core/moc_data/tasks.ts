import {Task} from '../models/task.model';
import { TaskStatus } from './status.enum';

export const tasks: Task[] = [
    {
        id: 0,
        title: 'Встановити Angular',
        assignee: 'Євгеній',
        dueDate: '10.02.2026',
        status: TaskStatus.DONE
    },
    {
        id: 1,
        title: 'Ознайомитися з компонентами',
        description: 'Ознайомитися з компонентами та оглянути взаємодію між ними',
        assignee: 'Євгеній',
        dueDate: '11.02.2026',
        status: TaskStatus.IN_PROGRESS
    },
    {
        id: 2,
        title: 'Ознайомитися з Control Flow',
        description: 'Ознайомитися з старим і новим підходом до Control Flow',
        assignee: 'Євгеній',
        dueDate: '12.02.2026',
        status: TaskStatus.TODO
    }
];