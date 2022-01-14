import React from "react";
import { Translate, translate } from "react-jhipster";

import { Layout, Menu, ConfigProvider, Breadcrumb } from "antd";

import { Link } from "react-router-dom";

import {
    UserAddOutlined,
    LoginOutlined,
    LogoutOutlined,
    SettingOutlined,
    SafetyCertificateOutlined,
    UserSwitchOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const accountMenuItemsAuthenticated = (
    <>
        <Menu.Item icon={<SettingOutlined />} data-cy="settings">
            <Link to="/account/settings">Settings</Link>
        </Menu.Item>

        <Menu.Item icon={<SafetyCertificateOutlined />} data-cy="passwordItem">
            <Link to="/account/password">Password in</Link>
        </Menu.Item>

        <Menu.Item icon={<LogoutOutlined />} data-cy="logout">
            <Link to="//logout">Sign out</Link>
        </Menu.Item>
    </>
);

const accountMenuItems = (
    <>
        <Menu.Item id="login-item" icon={<LoginOutlined />} data-cy="login">
            <Link to="/login">Sign in</Link>
        </Menu.Item>

        <Menu.Item icon={<UserAddOutlined />} data-cy="register">
            <Link to="/login/register">Register in</Link>
        </Menu.Item>
    </>
);

function AccountMenu(props) {
    const { key, isAuthenticated = false } = props;
    return (
        <SubMenu
            icon={<UserSwitchOutlined />}
            key={key}
            {...props}
            title="Account"
            data-cy="accountMenu"
        >
            {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
        </SubMenu>
    );
}

export default AccountMenu;
