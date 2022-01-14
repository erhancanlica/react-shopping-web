import React from "react";
import { locales, languages } from "../../../config/translation";

import { Menu } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

export const LocaleMenu = ({
    key,
    currentLocale,
    onClick,
}: {
    key: string;
    currentLocale: string;
    onClick: (event: any) => void;
}) =>
    Object.keys(languages).length > 1 ? (
        <SubMenu
            key={key}
            {...key}
            icon={<GlobalOutlined />}
            title={currentLocale ? languages[currentLocale].name : undefined}
        >
            {locales.map((locale) => (
                <Menu.Item key={locale} title={locale} onClick={onClick}>
                    {languages[locale].name}
                </Menu.Item>
            ))}
        </SubMenu>
    ) : null;

export default LocaleMenu;
