import { makeAutoObservable } from "mobx";
import { Temporal } from 'temporal-polyfill';
import { todos } from "../services/todoServices/todoServices";
import { LOCAL_STORAGE_KEY } from "../const/localStorage";

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

export type TodoItem = INote | IReminder;

class TodoStore {
    todos: TodoItem[] = todos;
    disabled = true;
    todoValue = '';
    todoDate = '';
    parseDate = '';

    constructor() {
        makeAutoObservable(this);
    }

    add(todo: TodoItem) {
        this.todos.push(todo);
        todos.push(todo);
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
        let todoId;
        this.todos.forEach((todo, index) => {
            if (id === todo.id) {
                todo.isCompleted = !todo.isCompleted;
                todoId = index;
            }
        });
        if (todoId != undefined) todos[todoId].isCompleted = true;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todos));
    }
}

export default TodoStore;