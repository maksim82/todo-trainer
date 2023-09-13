import { observer } from "mobx-react-lite";
import { css } from "@emotion/react";
import todo from "../../store/todo";

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
    const completedTasks = todo.completedTodos.length;

    return (
        <div>
            <h2 css={stylecompletedTasks}>Выполненных тасков: <span css={stylecompletedTasksCount}>{completedTasks}</span></h2>
            <div css={stylecompletedTasksContainer}>
                {todo.completedTodos.map(todo => {
                    return typeof todo.text === 'string'
                        ?
                    <div css={stylecompletedTaskItem}>{todo.text}</div>
                        :
                    <>
                        <div css={stylecompletedTaskItem}>
                            <div>{todo.text.note}</div>
                            <div css={stylecompletedTaskDate}>Дата выполнения: {todo.text.date}</div>
                        </div>
                    </>
                })}
            </div>
        </div>
    );
});

export default CompletedPage;