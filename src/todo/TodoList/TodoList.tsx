import { observer } from "mobx-react-lite";
import { css } from "@emotion/react";
import TodoStore from "../../store/todo";
import Todo from "../Todo/Todo";
import TodoWidgetViewModel from '../../store/TodoWidgetViewModel';

const styleTodoListWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
`;

const styleTodoListTotal = css`
    margin-bottom: 20px;
`;

const styleTodoListContainer = css`
    width: 100%;
    max-width: 800px;
    padding: 0 20px;
`;

const syleTodoListTasks = css`
    font-size: 18px;
    letter-spacing: .8px;
`;

const syleTodoListTasksCount = css`
    font-size: 24px;
    color: #009A63;
`;
interface TodoListProps {
    store: TodoStore | null;
}

const TodoList = observer((x: TodoListProps) => {
    const allTasks = x.store?.todos.filter(todo => !todo.isCompleted).length;

    return (
        <div css={styleTodoListWrapper}>
            <div css={styleTodoListTotal}>
                <div css={syleTodoListTasks}>Всего тасков: <span css={syleTodoListTasksCount}>{allTasks}</span></div>
            </div>
            <div css={styleTodoListContainer}>
                {
                    x.store?.todos
                        .filter(todo => !todo.isCompleted)
                        .map(todoBody => (
                            <Todo
                                key={todoBody.id}
                                todoBody={todoBody} 
                                store={x.store}
                                storeItem={new TodoWidgetViewModel(todoBody)}
                                />
                        ))
                }
            </div>
        </div>
    );
});

export default TodoList;