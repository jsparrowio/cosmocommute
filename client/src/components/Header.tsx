import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';


const Header: React.FC = () => {
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    return (
        <header>
            <div className= "header-title">
                <h1>COSMO COMMUTE</h1>
            </div>
            <div className= "nav2">
            <nav>
                <ul>
                    {isHomePage ? (
                        <>
                            <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
                            <li><NavLink to="/Login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="Dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li>
                            <li><NavLink to="/Traffic" className={({ isActive }) => (isActive ? 'active' : '')}>Traffic</NavLink></li>
                            <li><NavLink to="/Weather" className={({ isActive }) => (isActive ? 'active' : '')}>Weather</NavLink></li>
                        </>
                    )}
                </ul>
            </nav>
            </div>

        </header>
    )
};

export default Header;