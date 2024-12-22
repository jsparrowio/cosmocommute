import React from 'react';
import commutevan from '../assets/images/commutevan.png';



const Header: React.FC = () => {
    return (
        <header>
            <div className="header-title">
                <img src={commutevan} style={{ 'width': '80px', 'height': '50px', 'marginTop': '0.5rem' }}></img>&nbsp;
                <h1>CosmoCommute</h1>
            </div>
        </header>
    )
};

export default Header;

