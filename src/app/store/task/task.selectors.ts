import { createFeatureSelector, createSelector } from "@ngrx/store";
import { taskAdapter, TaskState } from "./task.state";

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

const { 
    selectAll, 
    selectEntities, 
    selectIds, 
    selectTotal 
} = taskAdapter.getSelectors(selectTaskState);

export const selectAllTasks = selectAll;
export const selectTaskEntities = selectEntities;
export const selectTaskIds = selectIds;
export const selectTaskTotal = selectTotal;

export const selectTaskLoading = createSelector(
    selectTaskState,
    (state: TaskState) => state.loading
);

export const selectTaskError = createSelector(
    selectTaskState,
    (state: TaskState) => state.error
);

export const selectSelectedTaskId = createSelector(
    selectTaskState,
    (state: TaskState) => state.selectedTaskId
);

export const selectSelectedTask = createSelector(
    selectTaskEntities,
    selectSelectedTaskId,
    (entities, selectedId) => selectedId ? entities[selectedId] ?? null : null
);

export const selectFilterStatus = createSelector(
    selectTaskState,
    (state: TaskState) => state.filterStatus
);

export const selectFilteredTasks = createSelector(
    selectAllTasks,
    selectFilterStatus,
    (tasks, status) => {
        if (!status) {
            return tasks;
        }
        return tasks.filter(task => task.status === status);
    }
);