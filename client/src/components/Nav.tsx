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


    const homeLinks: Route[] = [
        { path: '/', label: "Home" },
        { path: '/Login', label: "Login" },
    ];

    const dashboardLinks: Route[] = [
        { path: '/Dashboard', label: "Dashboard" },
        { path: '/Logout', label: "Logout" },

    ];

    const handleLogin = (): void => {
        setIsLoggedIn(true);
        navigate("/Dashboard");
    }

    const handleLogout = (): void => {
        setIsLoggedIn(false);
        navigate("/");
    }

    const navLinks: Route[] = isLoggedIn ? dashboardLinks : homeLinks;

    return (
        <nav>
            <Space>
                {navLinks.map((route: Route) => (
                    <Button
                        key={route.path}
                        type="primary"
                        onClick={() =>
                            route.label === "Logout" ? handleLogout() : navigate(route.path)
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