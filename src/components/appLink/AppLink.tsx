import { Link, LinkProps } from 'react-router-dom';
import { ReactNode } from 'react';

interface AppLinkProps extends LinkProps {
    children: ReactNode;
}

const AppLink = (props: AppLinkProps) => {
    const {
        to,
        children,
        ...otherProps
    } = props;

    return (
        <Link to={to} {...otherProps}>{children}</Link>
    )
}

export default AppLink;