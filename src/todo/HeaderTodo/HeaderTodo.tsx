import { useState } from "react";
import { observer } from "mobx-react-lite";
import { css } from '@emotion/react';
import TodoStore from "../../store/todo";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { Temporal } from 'temporal-polyfill';

const styleWrapper = css`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto 30px;
`;

const styleCreateTask = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const styleCreateTaskInputValue = css`
    width: 60%;
`;

const styleCreateTaskInput = css`
    padding: 10px 15px;
    font-size: 18px;
    outline: none;
    border-radius: 4px;
`;

const styleCreateTaskInputDate = css`
    width: 20%;
`;

const styleCreateTaskBtn = css`
    padding: 10px 15px;
    font-size: 20px;
    border-radius: 4px;
    background-color: #FFA420;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    color: #fff;
`;

const styleTitleStr = css`
    font-size: 38px;
    color: #49423D;
`;

const styleTitleSliceStr = css`
    font-size: 44px;
    color: #EE204D;
`;

interface HeaderTodoProps {
    store: TodoStore | null;
}

const HeaderTodo = observer((x: HeaderTodoProps) => {
    const [textReminder, setTextReminder] = useState(x.store?.todoValue || '');
    const [dateReminder, setDateReminer] = useState(x.store?.todoDate || '');

    const onChangeValue = (val: string) => {
        setTextReminder(val);
        x.store?.onChangeValue(val);
    }

    const onChangeDate = (val: string) => {
        setDateReminer(val);
        x.store?.onChangeDate(val);
    }

    const onCreateCase = () => {
        if (x.store?.todoValue) {
            x.store.add({
                id: crypto.randomUUID(),
                isCompleted: false,
                message: x.store.todoValue,
                type: 'note',
            });
        } else if (x.store?.todoDate) {
            x.store.add({
                id: crypto.randomUUID(),
                isCompleted: false,
                date: Temporal.PlainDateTime.from(x.store.todoDate),
                type: 'reminder',
            });
        }
        setDateReminer('');
        setTextReminder('');
        x.store?.resetInputValue();
    }

    return (
        <div css={styleWrapper}>
            <h1 css={styleTitleStr}>To<span css={styleTitleSliceStr}>Do</span></h1>
            <div css={styleCreateTask}>
                <Input 
                    css={[styleCreateTaskInput, styleCreateTaskInputValue]} 
                    onChange={onChangeValue} 
                    value={textReminder} 
                    placeholder="Введите таску...."
                    />
                <Input css={[styleCreateTaskInput, styleCreateTaskInputDate]} value={dateReminder} onChange={onChangeDate} type="date" />
                <Button css={styleCreateTaskBtn} onClick={onCreateCase}>Создать</Button>
            </div>
        </div>
    )
})

export default HeaderTodo;