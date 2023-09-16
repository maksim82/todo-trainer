import Button from "../../components/button/Button";

const PageError = () => {
    const onUpload = () => location.reload();

    return (
        <div>
            <h2>Упс произошла ошибка какая то!</h2>
            <Button onClick={onUpload}>Перезагрузить</Button>
        </div>
    );
};

export default PageError;