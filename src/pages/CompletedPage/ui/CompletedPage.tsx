import { css } from "@emotion/react";
import TodoStore, { TodoItem } from "../../../store/todo";
import { getDate } from "../../../lib/getDate/getDate";
import { useEffect, useRef } from 'react';
import { LOCAL_STORAGE_KEY } from "../../../const/localStorage";
import { observer } from "mobx-react-lite";
import { usePageViewModel } from "../../../hooks/usePageViewModel/usePageViewModel";
import { Temporal } from "temporal-polyfill";

const stylecompletedTasksCount = css`
    color: #77DDE7;
    font-size: 36px;
`;

const stylecompletedTasks = css`
    padding-left: 30px;
    letter-spacing: 1.2px;
`;

const stylecompletedTasksContainer = css`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

const stylecompletedTaskItem = css`
    background-color: #1CAC78;
    font-size: 28px;
    padding: 30px;
    border-radius: 10px;
    margin-top: 20px;
`;

const stylecompletedTaskDate = css`
    margin-top: 10px;
    color: #fff;
`;

const CompletedPage = observer(() => {
    const todos = useRef<TodoItem[]>([]);
    const store = usePageViewModel<TodoStore>();

    useEffect(() => {
        const bodyTodos = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (bodyTodos) {
            todos.current = JSON.parse(bodyTodos);
            todos.current.forEach(task => {
                if (task.type === 'reminder') task.date = Temporal.PlainDateTime.from(task.date);
            })
        }

        return () => localStorage.removeItem(LOCAL_STORAGE_KEY);
    }, [])

    const allCompletedTasks = todos.current?.filter(todo => todo.isCompleted).length || 0;
    
    return (
        <div>
            <h2 css={stylecompletedTasks}>Выполненных тасков: <span css={stylecompletedTasksCount}>{allCompletedTasks}</span></h2>
            <div css={stylecompletedTasksContainer}>
                {todos.current.filter(todo => todo.isCompleted).map(todo => {
                    return todo.type === 'note'
                        ?
                    <div key={todo.id} css={stylecompletedTaskItem}>{todo.message}</div>
                        :
                    <div key={todo.id} css={stylecompletedTaskItem}>
                            <div css={stylecompletedTaskDate}>{getDate(todo.date)}</div>
                    </div>
                })}
            </div>
        </div>
    );
});

export default CompletedPage;