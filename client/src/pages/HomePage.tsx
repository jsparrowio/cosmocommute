import React from 'react';
import spacetravel from '../assets/spacetravel.jpeg'
const HomePage: React.FC = () => {
    return (
        <div className='Homebody'>
            <div className="spaceandtestimonials">
                <div className='space-travel'>
                    <img src={spacetravel} alt="cars flying through space" />
                </div>
                <div className='testimonialright'>
                    <p>User testimonials</p>
                    <ul>
                        <li>"Finally a service that understands the frustration of asteroid traffic." -SpaceTraveler4Life</li>
                        <li>"I used to dread my daily commute to Mars. Now I can avoid solar storms. Thanks, CosmoCommute!" -AstroNerd99</li>
                        <li>"CosmoCommute has turned my galaxy road trips into pure bliss. It even suggests the best stargazing spots! 5 stars!" -VenusVacationer</li>
                        <li>"My interplanetary delivery business has never ran smoother. CosmoCommute helps me dodge meteor showers." -SpacePirate06</li>
                    </ul>
                </div>
            </div>
        
            <div className='center1'>
                <h2> Ready to navigate the stars like a pro? Log in and take off with CosmoCommute!</h2>
            </div>
        </div>

     );
};

            export default HomePage;