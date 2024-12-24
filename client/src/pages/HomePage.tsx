import React from 'react';
import spacetravel from '../assets/spacetravel.jpeg';
import '../HomePage.css';

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to CosmoCommute!</h1>
                <p>Your ultimate space travel companion.</p>
                <div className="image-container">
                    <img src={spacetravel} alt="Cars flying through space" className="hero-image" />
                </div>
            </div>

            <div className="testimonials-section">
                <h3>Testimonials</h3>
                <ul className="testimonials-list">
                    <li>"Finally a service that understands the frustration of asteroid traffic." - SpaceTraveler4Life</li>
                    <li>"I used to dread my daily commute to Mars. Now I can avoid solar storms. Thanks, CosmoCommute!" - AstroNerd99</li>
                    <li>"CosmoCommute has turned my galaxy road trips into pure bliss. It even suggests the best stargazing spots! 5 stars!" - VenusVacationer</li>
                    <li>"My interplanetary delivery business has never run smoother. CosmoCommute helps me dodge meteor showers." - SpacePirate06</li>
                </ul>
            </div>

            <div className="cta-section">
                <h2>Ready to navigate the stars like a pro?</h2>
                <p>Log in and take off with CosmoCommute!</p>
            </div>
        </div>
    );
};

export default HomePage;
