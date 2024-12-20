import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';


const Header: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (
        <header>
            <div className="header-title">
                <h1>CosmoCommute</h1>
            </div>
        </header>
    )
};

export default Header;

