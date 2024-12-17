import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/"end className={({isActive}) => (isActive ? 'active' :'')}>Home</NavLink></li>
                <li><NavLink to="/LoginPage" className={({isActive}) => (isActive ? 'active' :'')}>Login</NavLink></li>
            </ul>
        </nav>
    )
};

export default Nav;