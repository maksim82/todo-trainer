import { makeAutoObservable } from "mobx";
import { Temporal } from 'temporal-polyfill';
interface INote {
    id: string;
    type: 'note';
    message: string;
    isCompleted?: boolean;
}

interface IReminder {
    id: string;
    type: 'reminder';
    date: Temporal.PlainDateTime;
    isCompleted?: boolean;
}

export type TypeTodo = INote | IReminder;

class TodoStore {
    todos: TypeTodo[] = [];
    disabled = true;
    todoValue = '';
    todoDate = '';
    parseDate = '';

    constructor() {
        makeAutoObservable(this);
    }

    add(todo: TypeTodo) {
        this.todos.push(todo);
    }

    delete(id: string) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    onChangeValue(value: string) {
        this.todoValue = value;
    }

    onChangeDate(date: string) {
        const dateTime = Temporal.PlainDateTime.from(date);
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


    editTask(id: string, text: string) {
        this.todos.forEach(todo => {
            if (todo.id === id && todo.type === 'note') {
                todo.message = text;
            }
        })
    }

    onCompletedTask(id: string) {
        this.todos.forEach(todo => {
            if (id === todo.id) {
                todo.isCompleted = !todo.isCompleted
            }
        })
    }

    getDate(date: Temporal.PlainDateTime) {
        const day = date.day;
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.year;

        return `Дата: ${day} ${month} ${year}`;
    }
}

export default TodoStore;