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

    const handleLogin = (): void => {
        setIsLoggedIn(true);
        navigate("/Dashboard");
    }

    const handleLogout = (): void => {
        setIsLoggedIn(false);
        navigate("/");
    }


    return (
        <nav>
            {(location.pathname === '/' || location.pathname === '/Login') && !isLoggedIn && (
                <Space>
                    <Button
                        key="Home"
                        type="primary"
                        onClick={() => navigate("/")}
                    >Home
                    </Button>
                    <Button
                        key="Login"
                        type="primary"
                        onClick={() => navigate('/Login')}
                    >Login
                    </Button>
                </Space>
            )}
            {location.pathname === '/dashboard' && (
                <Space>
                        <Button
                            key="Dashboard"
                            type= "primary"
                            onClick={() => navigate("/Dashboard")}
                        >Dashboard
                        </Button>
                        <Button
                            key="Logout"
                            type="default"
                            onClick={handleLogout}
                        >Logout
                        </Button>
                </Space>
            )}
        </nav>
    );
};

export default Nav;