import React from "react";

import { Layout, Menu, ConfigProvider, Breadcrumb } from "antd";

import { Link } from "react-router-dom";

import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";

export const Home = () => {
    return (
        <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to={"/"}>Home</Link>
        </Menu.Item>
    );
};
