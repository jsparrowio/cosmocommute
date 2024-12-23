import { useNavigate, useLocation } from "react-router-dom";
import React, { useLayoutEffect, useState } from 'react';
import { Button, Space } from 'antd'
import Auth from "../utils/auth";

interface Route {
    path: string;
    label: string;
}

const Nav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    useLayoutEffect(() => {
        const loggedIn = Auth.loggedIn();
        if (loggedIn === true) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [location]);


    const homeLinks: Route[] = [
        { path: '/', label: "Home" },
        { path: '/Login', label: "Login" },
    ];

    const dashboardLinks: Route[] = [
        { path: '/Dashboard', label: "Dashboard" },
        { path: '/Login', label: "Logout" },

    ];

    const logout = () => {
        Auth.logout();
        setIsLoggedIn(false);
        navigate('/Login');
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
                            route.label === "Logout" ? logout() : navigate(route.path)
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