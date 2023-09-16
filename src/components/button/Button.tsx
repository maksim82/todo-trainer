import { ButtonHTMLAttributes, ReactNode } from "react";

 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
}

const Button = (props: ButtonProps) => {
    const {
        children,
        ...otherProps
    } = props;

    return (
        <button type="button" {...otherProps}>
            {children}
        </button>
    );
};

export default Button;