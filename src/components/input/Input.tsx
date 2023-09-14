import { ChangeEvent, InputHTMLAttributes } from "react";

type InputHTMLProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>

interface InputProps extends InputHTMLProps {
    onChange: (val: string) => void;
    value?: string;
}

const Input = (props: InputProps) => {
    const {
        type='text',
        onChange,
        ...otherProps 
    } = props;

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

    return (
        <input type={type} onChange={onChangeValue} {...otherProps} />
    );
};

export default Input;