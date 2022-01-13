import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { Card } from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { hasAnyAuthority } from "app/shared/auth/private-route";
import { AUTHORITIES } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "./config/store";
import { getSession } from "./shared/reducers/authentication";
import { getProfile } from "./shared/reducers/application-profile";
import { setLocale } from "./shared/reducers/locale";
import ErrorBoundary from "app/shared/error/error-boundary";

import Navbar from "app/shared/layout/header/header";

const baseHref = document
    .querySelector("base")
    .getAttribute("href")
    .replace(/\/$/, "");

export const App = () => {
    const currentLocale = useAppSelector((state) => state.locale.currentLocale);
    const isAuthenticated = useAppSelector(
        (state) => state.authentication.isAuthenticated
    );
    const isAdmin = useAppSelector((state) =>
        hasAnyAuthority(state.authentication.account.authorities, [
            AUTHORITIES.ADMIN,
        ])
    );
    const ribbonEnv = useAppSelector(
        (state) => state.applicationProfile.ribbonEnv
    );
    const isInProduction = useAppSelector(
        (state) => state.applicationProfile.inProduction
    );
    const isOpenAPIEnabled = useAppSelector(
        (state) => state.applicationProfile.isOpenAPIEnabled
    );

    return (
        <Router basename={baseHref}>
            <div className="app-container" style={{}}>
                <ToastContainer
                    position={toast.POSITION.TOP_LEFT}
                    className="toastify-container"
                    toastClassName="toastify-toast"
                />
                <ErrorBoundary>
                    <Navbar
                        isAuthenticated={isAuthenticated}
                        isAdmin={isAdmin}
                        currentLocale={currentLocale}
                        ribbonEnv={ribbonEnv}
                        isInProduction={isInProduction}
                        isOpenAPIEnabled={isOpenAPIEnabled}
                    />
                </ErrorBoundary>
                <div
                    className="container-fluid view-container"
                    id="app-view-container"
                ></div>
            </div>
        </Router>
    );
};

export default App;

{
    /* <Content style={{ padding: "0 50px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    className="site-layout-background"
                    style={{ padding: "24px 0" }}
                >
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1"]}
                            style={{ height: "100%" }}
                        >
                            <SubMenu
                                key="sub1"
                                icon={<UserOutlined />}
                                title="subnav 1"
                            >
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                icon={<LaptopOutlined />}
                                title="subnav 2"
                            >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                icon={<NotificationOutlined />}
                                title="subnav 3"
                            >
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: "0 24px", minHeight: 280 }}>
                        Content
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
            </Footer> */
}
