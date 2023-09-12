import { makeAutoObservable } from "mobx";

export interface ITodo {
    id: string;
    text: string;
    date?: number;
    isCompleted: boolean;
}

class TodoStore {
    completedTodos: ITodo[] = [];
    disabled = true;
    todoValue = '';
    todos: ITodo[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    add(todo: ITodo) {
        this.todos.push(todo);
    }

    delete(id: string) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    onChangeValue(value: string) {
        this.todoValue = value;
    }

    resetInputValue() {
        this.todoValue = '';
    }


    editTask(id: string, text: string) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text,
                }
            }
            return todo;
        })
    }

    onCompletedTask(id: string) {
        this.todos = this.todos.filter(todo => {
            if (id === todo.id) {
                this.completedTodos.push(todo);
                return false
            }
            return true;
        })
    }
}

export default new TodoStore();