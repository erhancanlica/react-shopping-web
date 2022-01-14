import React from "react";

import { Layout, Menu, ConfigProvider, Breadcrumb } from "antd";

import { Link } from "react-router-dom";

import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";

export const Home = (props) => {
    return (
        <Menu.Item key={props.key}  icon={<UserOutlined />}>
            <Link to={"/"}>Home</Link>
            {props.children}
        </Menu.Item>
    );
};
