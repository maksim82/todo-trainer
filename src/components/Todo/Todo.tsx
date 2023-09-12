import { observer } from "mobx-react-lite";
import { css } from '@emotion/react';
import todo from "../../store/todo";
import { ITodo } from "../../store/todo";
import { ChangeEvent, useState, useRef } from "react";

interface TodoProps {
    todoBody: ITodo;
}

const styleTodoWrapper = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 30px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #9C9C9C;
`;

const styleTodoCompleted = css`
    font-size: 18px;
    cursor: pointer;
    color: #99FF99;
`;

const styleTodoBtn = css`
    padding: 10px 15px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    border-radius: 12px;
`;

const styleTodoEditBtn = css`
    background-color: #CCCCFF;
`;

const styleTodoDeleteBtn = css`
    background-color: #E32636;
    margin-right: 15px;
`;

const styleTodoCloseBtn = css`
    background-color: #B8B799; 
     margin-right: 15px;
`;

const styleTodoSaveBtn = css`
    background-color: #1CAC78;
`;

const styleTodoInput = css`
    padding: 5px 0 5px 15px;
    font-size: 16px;
    width: 100%;
    max-width: 250px;
    outline: none;
    border-radius: 8px;
`;

const Todo = observer((props: TodoProps) => {
    const {
        todoBody,
    } = props;

    const [editTask, setEditTask] = useState(todoBody.text);
    const [disabled, setDisabled] = useState(true);
    const saveTaskValue = useRef(todoBody.text);

    const onDelete = () => {
        todo.delete(todoBody.id)
    }

    const onDisabled = () => {
        setDisabled(prevState => !prevState);
    }

    const onClose = () => {
        setEditTask(saveTaskValue.current);
        onDisabled();
    }

    const onSave = () => {
        saveTaskValue.current = editTask;
        todo.editTask(todoBody.id, editTask);
        onDisabled();
    }

    const onEditValue = (event: ChangeEvent<HTMLInputElement>) => {
        setEditTask(event.target.value);
    }

    return (
        <div css={styleTodoWrapper}>
            <label css={styleTodoCompleted}>
                <input type="checkbox" onChange={() => todo.onCompletedTask(todoBody.id)} />
                Выполнено
            </label>
            <input css={styleTodoInput} type="text" value={editTask} disabled={disabled} onChange={onEditValue} />
            <div>
                <button css={[styleTodoBtn, styleTodoDeleteBtn]} onClick={onDelete}>Удалить</button>
                {
                    disabled
                        ?
                    <button css={[styleTodoBtn, styleTodoEditBtn]} onClick={onDisabled}>Изменить</button> 
                        :
                    <>
                        <button css={[styleTodoBtn, styleTodoCloseBtn]} onClick={onClose}>Отменить</button>
                        <button css={[styleTodoBtn, styleTodoSaveBtn]} onClick={onSave}>Сохранить</button>
                    </>
                }
            </div>
        </div>
    );
});

export default Todo;