import { observer } from 'mobx-react-lite';
import { useState, useRef } from 'react';
import { TypeTodo } from '../../store/todo';
import { css } from '@emotion/react';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import TodoStore from "../../store/todo";
import { usePageViewModel } from "../../hooks/usePageViewModel/usePageViewModel";

interface TodoProps {
    todoBody: TypeTodo;
}

const styleTodoContent = css`
    display: flex;
    background-color: #9C9C9C;
    justify-content: space-between;
    padding: 30px 20px;
    border-radius: 8px;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
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

const styleTodoDate = css`
    font-size: 18px;
    color: #fff;
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

    let typeTask = useRef('');

    if (todoBody.type === 'note') typeTask.current = todoBody.message;

    const store = usePageViewModel<TodoStore>();
    const [editTask, setEditTask] = useState(typeTask.current);
    const [disabled, setDisabled] = useState(true);
    const saveTaskValue = useRef(typeTask.current);

    const onDelete = () => {
        store?.delete(todoBody.id)
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
        store?.editTask(todoBody.id, editTask);
        onDisabled();
    }

    const onEditValue = (val: string) => {
        setEditTask(val);
    }

    return (
    <div css={styleTodoContent}>
        <label css={styleTodoCompleted}>
            <Input type='checkbox' onChange={() => store?.onCompletedTask(todoBody.id)} />
            Выполнено
        </label>
        {   
            todoBody.type === 'note' 
                ?
            <Input css={styleTodoInput} value={editTask} disabled={disabled} onChange={onEditValue} />
                :
            <div css={styleTodoDate}>{store?.parseDate}</div>
        }
        <div>
            <Button css={[styleTodoBtn, styleTodoDeleteBtn]} onClick={onDelete}>Удалить</Button>
            {
                todoBody.type === 'note'
                    ?
                <>
                {
                    disabled
                        ?
                    <Button css={[styleTodoBtn, styleTodoEditBtn]} onClick={onDisabled}>Изменить</Button> 
                        :
                    <>
                        <Button css={[styleTodoBtn, styleTodoCloseBtn]} onClick={onClose}>Отменить</Button>
                        <Button css={[styleTodoBtn, styleTodoSaveBtn]} onClick={onSave}>Сохранить</Button>
                    </>
                }   
                </>
                    :
                undefined
            }
        </div>
    </div>
    );
});

export default Todo;