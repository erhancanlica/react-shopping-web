import "./header.scss";
import "antd/dist/antd.css";

import React, { useState, useEffect } from "react";
import { Translate, Storage } from "react-jhipster";
import LoadingBar from "react-redux-loading-bar";
import { render } from "react-dom";

import { Home } from "./header-components";

import { Layout, Menu, ConfigProvider, Breadcrumb } from "antd";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";

export interface IHeaderProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    ribbonEnv: string;
    isInProduction: boolean;
    isOpenAPIEnabled: boolean;
    currentLocale: string;
}

const Navbar = (props: IHeaderProps) => {
    const { SubMenu } = Menu;
    const { Header, Content, Footer, Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setCollapsed(!collapsed);
    }, []);

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLocaleChange = (event) => {
        const langKey = event.target.value;
        Storage.session.set("locale", langKey);
    };

    const renderDevRibbon = () =>
        props.isInProduction === false ? (
            <div className="ribbon dev">
                <a href="">
                    <Translate
                        contentKey={`global.ribbon.${props.ribbonEnv}`}
                    />
                </a>
            </div>
        ) : null;

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <Layout id="app-header">
            {renderDevRibbon()}
            <LoadingBar className="loading-bar" />
            <Header className="jh-navbar">
                <div className="logo" />
                <ConfigProvider direction="rtl">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                    >
                        <Home />

                        <Menu.Item key="2">nav 2</Menu.Item>
                        <SubMenu
                            key="sub1"
                            icon={<UserOutlined />}
                            title="User"
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>

                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </ConfigProvider>
            </Header>
        </Layout>
    );
};

export default Navbar;
