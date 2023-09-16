import TodoList from "../../../todo/TodoList/TodoList";
import HeaderTodo from "../../../todo/HeaderTodo/HeaderTodo";
import { usePageViewModel } from "../../../hooks/usePageViewModel/usePageViewModel";
import TodoStore from "../../../store/todo";

const HomePage = () => {
    const store = usePageViewModel<TodoStore>();

    return (
        <>
            <HeaderTodo store={store} />
            <TodoList store={store} />
        </>
    );
};

export default HomePage;