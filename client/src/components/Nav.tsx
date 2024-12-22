import { useNavigate } from "react-router-dom";
import React, { useLayoutEffect, useState } from 'react';
import { Button, Space } from 'antd'
import Auth from "../utils/auth";

interface Route {
    path: string;
    label: string;
}

const Nav: React.FC = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    useLayoutEffect(() => {
        const loggedIn = Auth.loggedIn();
        if (loggedIn === true) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);


    const homeLinks: Route[] = [
        { path: '/', label: "Home" },
        { path: '/Login', label: "Login" },
    ];

    const dashboardLinks: Route[] = [
        { path: '/Dashboard', label: "Dashboard" },
        { path: '/Redirect', label: "Logout" },

    ];

    const navLinks: Route[] = isLoggedIn ? dashboardLinks : homeLinks;

    return (
        <nav>
            <Space>
                {navLinks.map((route: Route) => (
                    <Button
                        key={route.path}
                        type="primary"
                        onClick={() =>
                            route.label === "Logout" ? Auth.logout() : navigate(route.path)
                        }
                    >
                        {route.label}
                    </Button>

                ))}
            </Space>
        </nav>
    );
};

export default Nav;