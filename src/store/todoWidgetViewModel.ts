import { makeAutoObservable } from "mobx";
import TodoStore, { TodoItem } from "./todo";

class TodoWidgetViewModel {
    constructor(task: TodoItem) {
        makeAutoObservable(this);
        this.taskItem = task;
        if (task.type === 'note') {
            this.editTask = task.message;
            this.editVisibleTask = task.message;
        }
    }

    taskItem;
    editTask = '';
    editVisibleTask = '';
    disabled = true;

    onEditValue(val: string) {
        this.editVisibleTask = val;
    }

    onSave(store: TodoStore) {
        this.onDisabled();
        this.editTask = this.editVisibleTask;
        store.editTask(this.taskItem.id, this.editTask);
    }

    onClose() {
        this.onEditValue(this.editTask);
        this.onDisabled();
    }

    onDisabled() {
        this.disabled = !this.disabled;
    }

    onDelete(store: TodoStore) {
        store.delete(this.taskItem?.id);
    }

    onCompleted(store: TodoStore) {
        store.onCompletedTask(this.taskItem.id);
    }
}

export default TodoWidgetViewModel;