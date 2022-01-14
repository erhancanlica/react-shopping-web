import React from "react";
import MenuItem from "./menu-item";
import { DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavDropdown } from "./menu-components";
import { Translate, translate } from "react-jhipster";
import { Link } from "react-router-dom";
import { Layout, Menu, ConfigProvider, Breadcrumb } from "antd";
import {
    ToolOutlined,
    InfoCircleOutlined,
    HeartOutlined,
    ImportOutlined,
    AlertOutlined,
    BookOutlined,
    UnlockOutlined,
} from "@ant-design/icons";

const adminMenuItems = (
    <>
        <Menu.Item key={"userManagement"} icon={<ToolOutlined />}>
            <Link to={"/admin/user-management"}>User management</Link>
        </Menu.Item>

        <Menu.Item key={"metrics"} icon={<InfoCircleOutlined />}>
            <Link to={"/admin/metrics"}>Metrics</Link>
        </Menu.Item>

        <Menu.Item key={"health"} icon={<HeartOutlined />}>
            <Link to={"/admin/health"}>Health</Link>
        </Menu.Item>

        <Menu.Item key={"configuration"} icon={<ImportOutlined />}>
            <Link to={"/admin/configuration"}>Configuration</Link>
        </Menu.Item>

        <Menu.Item key={"logs"} icon={<AlertOutlined />}>
            <Link to={"/admin/logs"}>Logs</Link>
        </Menu.Item>
    </>
);

const openAPIItem = (
    <Menu.Item icon={<AlertOutlined />}>
        <Link to={"/admin/docs"}>API</Link>
    </Menu.Item>
);

const { SubMenu } = Menu;

export const AdminMenu = (props) => (
    <SubMenu
        key={props.key} {...props}
        icon={<UnlockOutlined />}
        title="Admin Panel"
        data-cy="adminMenu"
    >
        {adminMenuItems}
        {props.showOpenAPI && openAPIItem}
    </SubMenu>
);

export default AdminMenu;
