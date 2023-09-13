import { makeAutoObservable } from "mobx";
import { Temporal } from 'temporal-polyfill';

interface IReminder {
    note: string;
    date: string;
}
export interface ITodo {
    id: string;
    text: IReminder | string;
    isCompleted: boolean;
}

class TodoStore {
    completedTodos: ITodo[] = [];
    disabled = true;
    todoValue = '';
    todoDate = '';
    parseDate = '';
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

    onChangeDate(date: string) {
        const dateTime = Temporal.PlainDate.from(date);
        const day = dateTime.day;
        const month = dateTime.toLocaleString('default', { month: 'long' });
        const year = dateTime.year;

        this.parseDate = `Дата: ${day} ${month} ${year}`;
        this.todoDate = date;
    }

    resetInputValue() {
        this.todoValue = '';
        this.todoDate = '';
    }


    editTask(id: string, text: string | IReminder) {
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