import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { hasAnyAuthority } from "app/shared/auth/private-route";
import { AUTHORITIES } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "./config/store";
import { getSession } from "./shared/reducers/authentication";
import { getProfile } from "./shared/reducers/application-profile";
import { setLocale } from "./shared/reducers/locale";
import ErrorBoundary from "app/shared/error/error-boundary";
import AppRoutes from "app/routes";

import Navbar from "app/shared/layout/header/header";
import { Layout } from "antd";
const { Content, Footer } = Layout;
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
                <Layout
                    className="site-layout-background"
                    style={{ padding: "24px 0" }}
                >
                    <ErrorBoundary>
                        <AppRoutes />
                    </ErrorBoundary>
                </Layout>
            </div>
        </Router>
    );
};

export default App;
