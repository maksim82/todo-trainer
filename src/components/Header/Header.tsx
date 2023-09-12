import { observer } from "mobx-react-lite";
import { css } from '@emotion/react';
import { ChangeEvent } from "react";
import todo from '../../store/todo';

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

const Header = observer(() => {
    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        todo.onChangeValue(event.target.value);
    }

    const onCreateCase = () => {
        todo.add({
            id: crypto.randomUUID(),
            text: todo.todoValue,
            isCompleted: false,
        });
        todo.resetInputValue();
    }

    return (
        <div css={styleWrapper}>
            <h1 css={styleTitleStr}>To<span css={styleTitleSliceStr}>Do</span></h1>
            <div css={styleCreateTask}>
                <input 
                    css={[styleCreateTaskInput, styleCreateTaskInputValue]} 
                    type="text" 
                    onChange={onChangeValue} 
                    value={todo.todoValue} 
                    placeholder="Введите таску...."
                    />
                <input css={[styleCreateTaskInput, styleCreateTaskInputDate]} type="date" />
                <button css={styleCreateTaskBtn} onClick={onCreateCase}>Создать</button>
            </div>
        </div>
    )
})

export default Header;