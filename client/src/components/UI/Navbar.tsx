import { NavLink } from "react-router-dom";
import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="Dashboard"className={({isActive}) => (isActive ? 'active' :'')}>Dashboard</NavLink></li>
                <li><NavLink to="/Traffic"className={({isActive}) => (isActive ? 'active' :'')}>Traffic</NavLink></li>
                <li><NavLink to="/Weather"className={({isActive}) => (isActive ? 'active' :'')}>Weather</NavLink></li>
            </ul>
        </nav>
    )

    
};

export default Navbar;