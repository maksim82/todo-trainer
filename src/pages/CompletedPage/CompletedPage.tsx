import { observer } from "mobx-react-lite";
import { css } from "@emotion/react";
import TodoStore from "../../store/todo";
import { usePageViewModel } from "../../hooks/usePageViewModel/usePageViewModel";

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
    const store = usePageViewModel<TodoStore>();
    const allCompletedTasks = store?.todos.filter(todo => todo.isCompleted).length || 0;

    return (
        <div>
            <h2 css={stylecompletedTasks}>Выполненных тасков: <span css={stylecompletedTasksCount}>{allCompletedTasks}</span></h2>
            <div css={stylecompletedTasksContainer}>
                {store?.todos.map(todo => {
                    return todo.type === 'note'
                        ?
                    <div css={stylecompletedTaskItem}>{todo.message}</div>
                        :
                    <>
                        <div css={stylecompletedTaskItem}>
                            <div css={stylecompletedTaskDate}>Дата выполнения: {store.getDate(todo.date)}</div>
                        </div>
                    </>
                })}
            </div>
        </div>
    );
});

export default CompletedPage;