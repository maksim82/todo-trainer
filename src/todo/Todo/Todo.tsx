import { observer } from 'mobx-react-lite';
import TodoStore, { TodoItem } from '../../store/todo';
import { css } from '@emotion/react';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { getDate } from '../../lib/getDate/getDate';
import TodoWidgetViewModel from '../../store/TodoWidgetViewModel';

interface TodoProps {
    todoBody: TodoItem;
    storeItem: TodoWidgetViewModel;
    store: TodoStore;
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

const Todo = observer((x: TodoProps) => {
    return (
    <div css={styleTodoContent}>
        <label css={styleTodoCompleted}>
            <Input type='checkbox' onChange={() => x.storeItem.onCompleted(x.store)} />
            Выполнено
        </label>
        {   
            x.todoBody.type === 'note' 
                ?
            <Input css={styleTodoInput} value={x.storeItem.editVisibleTask} disabled={x.storeItem.disabled} onChange={(val) => x.storeItem.onEditValue(val)} />
                :
            <div css={styleTodoDate}>{getDate(x.todoBody.date)}</div>
        }
        <div>
            <Button css={[styleTodoBtn, styleTodoDeleteBtn]} onClick={() => x.storeItem.onDelete(x.store)}>Удалить</Button>
            {
                x.todoBody.type === 'note'
                    ?
                <>
                {
                    x.storeItem.disabled
                        ?
                    <Button css={[styleTodoBtn, styleTodoEditBtn]} onClick={() => x.storeItem.onDisabled()}>Изменить</Button> 
                        :
                    <>
                        <Button css={[styleTodoBtn, styleTodoCloseBtn]} onClick={() => x.storeItem.onClose()}>Отменить</Button>
                        <Button css={[styleTodoBtn, styleTodoSaveBtn]} onClick={() => x.storeItem.onSave(x.store)}>Сохранить</Button>
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