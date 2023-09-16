import AppLink from "../../components/appLink/AppLink";
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

const Navbar = () => {
    return (
        <div css={styleNavbarWrapper}>
            <AppLink css={styleNavbarLink} to='/'>Главная</AppLink>
            <AppLink css={styleNavbarLink} to='/completed'>Выполненные</AppLink>
        </div>
    );
};

export default Navbar;