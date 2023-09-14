import { Link } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { css } from "@emotion/react";

const styleNavbarWrapper = css`
    background-color: #293133;
    padding: 20px 10px;
`;

const styleNavbarLink = css`
    padding: 10px;
    color: #fff;
    text-decoration: none;

    &:hover {
        background-color: #EE204D;
        color: #293133;
    }
`;

const Navbar = observer(() => {
    return (
        <div css={styleNavbarWrapper}>
            <Link css={styleNavbarLink} to='/'>Главная</Link>
            <Link css={styleNavbarLink} to='/completed'>Выполненные</Link>
        </div>
    );
});

export default Navbar;