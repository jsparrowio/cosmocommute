import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { Button, Space } from 'antd'


interface Route {
    path: string;
    label: string;
}

const Nav: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const isHomePage = location.pathname === "/";

    const homeLinks: Route[] = [
        { path: '/', label: "Home" },
        { path: '/Login', label: "Login" },
    ];

    const dashboardLinks: Route[] = [
        { path: '/Dashboard', label: "Dashboard" },
        { path: '/Traffic', label: "Traffic" },
        { path: '/Weather', label: "Weather" },

    ];

    const handleLogin = (): void => {
        setIsLoggedIn(true);
        navigate("/Dashboard");
    }

    return (
        <nav>
            <ul>
                {(location.pathname === "/" || location.pathname === "/Login") && !isLoggedIn
                    ? homeLinks.map((route: Route) => (
                        <li key={route.path}>
                            <NavLink
                                to={route.path}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {route.label}
                            </NavLink>
                        </li>
                    ))
                    : dashboardLinks.map((route: Route) => (
                        <li key={route.path}>
                            <NavLink
                                to={route.path}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {route.label}
                            </NavLink>
                        </li>
                    ))}
            </ul>

            <Space style={{ marginTop: "10px", float: "right" }}>
                {!isLoggedIn && location.pathname === "/Login" && (
                    <Button type="primary" onClick={handleLogin}>
                        Login
                    </Button>
                )}
                {isLoggedIn && (
                    <Button type="default" onClick={() => setIsLoggedIn(false)}>
                        Logout
                    </Button>
                )}
            </Space>
        </nav>
    );
};

export default Nav;