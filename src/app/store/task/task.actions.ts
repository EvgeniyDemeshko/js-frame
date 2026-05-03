import { createAction, props } from "@ngrx/store";
import { TaskStatus } from "../../core/moc_data/status.enum";
import { Task } from "../../core/models/task.model";

export const loadTasks = createAction(
    '[Task] Load Tasks',
    props<{status?: TaskStatus}>()
);

export const loadTasksSuccess = createAction(
    '[Task] Load Tasks Success',
    props<{ tasks: Task[] }>()
)

export const loadTasksFailure = createAction(
    '[Task] Load Tasks Failure',
    props<{ error: string }>()
)

export const createTask = createAction(
    '[Task] Create Task',
    props<{ task: Omit<Task, 'id'> }>()
);

export const createTaskSuccess = createAction(
    '[Task] Create Task Success',
    props<{ task: Task }>()
);

export const createTaskFailure = createAction(
    '[Task] Create Task Failure',
    props<{ error: string }>()
);

export const updateTask = createAction(
    '[Task] Update Task',
    props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(
    '[Task] Update Task Success',
    props<{ task: Task }>()
);

export const updateTaskFailure = createAction(
    '[Task] Update Task Failure',
    props<{ error: string }>()
);

export const patchTask = createAction(
    '[Task] Patch Task',
    props<{ id: string, changes: Partial<Task> }>()
);

export const patchTaskSuccess = createAction(
    '[Task] Patch Task Success',
    props<{ task: Task }>()
);

export const patchTaskFailure = createAction(
    '[Task] Patch Task Failure',
    props<{ error: string }>()
);

export const deleteTask = createAction(
    '[Task] Delete Task',
    props<{ id: string }>()
);

export const deleteTaskSuccess = createAction(
    '[Task] Delete Task Success',
    props<{ id: string }>()
);

export const deleteTaskFailure = createAction(
    '[Task] Delete Task Failure',
    props<{ error: string }>()
);

export const selectTask = createAction(
    '[Task] Select Task',
    props<{ id: string | null }>()
);

export const setFilterStatus = createAction(
    '[Task] Set Filter Status',
    props<{ status: string }>()
);