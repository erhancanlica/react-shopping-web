import "./header.scss";
import "antd/dist/antd.css";

import React, { useState, useEffect } from "react";
import { Translate, Storage } from "react-jhipster";
import LoadingBar from "react-redux-loading-bar";
import { render } from "react-dom";

import { Home } from "./header-components";
import Link from "react-router-dom";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

import AdminMenu from "app/shared/layout/menus/admin";
import LocaleMenu from "app/shared/layout/menus/locale";
import AccountMenu from "app/shared/layout/menus/account";

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

    return (
        <Layout id="app-header">
            {renderDevRibbon()}
            <LoadingBar className="loading-bar" />

            <Header>
                <Menu
                    style={{
                        justifyContent: "flex-end",
                    }}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["home"]}
                >
                    <Home key="home" />

                    {!props.isAuthenticated && !props.isAdmin && (
                        <AdminMenu
                            key="adminMenu"
                            showOpenAPI={props.isOpenAPIEnabled}
                        />
                    )}

                    <LocaleMenu
                        key="localeMenu"
                        currentLocale={props.currentLocale}
                        onClick={handleLocaleChange}
                    />

                    <AccountMenu
                        key="accountMenu"
                        isAuthenticated={props.isAuthenticated}
                    />
                </Menu>
            </Header>
        </Layout>
    );
};

export default Navbar;
