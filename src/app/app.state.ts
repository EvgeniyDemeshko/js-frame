import { TaskState } from "./store/task/task.state";

export interface AppState {
    tasks: TaskState;
}