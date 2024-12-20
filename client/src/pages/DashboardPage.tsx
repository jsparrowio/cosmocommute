import { useEffect, useState } from 'react';
import { fetchAstronomyPicture } from '../apis/apodAPI';
import '../DashboardPage.css';
import trafficImage from '../assets/traffic.jpg';
import weatherImage from '../assets/weather.jpg';
import { SettingOutlined } from '@ant-design/icons';

interface ApodData {
    date: string;
    title: string;
    explanation: string;
    url: string;
}

const DashboardPage = () => {
    const [apodData, setApodData] = useState<ApodData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchApodData = async () => {
            try {
                const response = await fetchAstronomyPicture();
                console.log('Fetched APOD data:', response);
                setApodData(response);
            } catch (error: any) {
                setError(error.message || 'Error fetching APOD data');
            } finally {
                setLoading(false);
            }
        };

        fetchApodData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dashboard">
            {/* Left pane for APOD */}
            <div className="apod-container">
                {apodData && (
                    <>
                        <h1>Astronomy Picture of the Day</h1>
                        <p className="title"><strong>Title:</strong> {apodData.title}</p>
                        <p className="date"><strong>Date:</strong> {apodData.date}</p>
                        <p className="explanation">{apodData.explanation}</p>
                        <img
                            src={apodData.url || 'https://via.placeholder.com/800x600'}
                            alt={apodData.title}
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
                        />
                    </>
                )}
            </div>

            <div className="right-pane">
                <div>
                    <button className="settings-button">
                        <SettingOutlined className="settings-icon" style={{ color: '#ff29f9' }} /> 
                        User Settings
                    </button>   
                </div>
                <div className="dashboard-traffic">
                    <h3>Traffic</h3>
                    <a href="/traffic" target="_self" rel="noopener noreferrer">
                        <img src={trafficImage} alt="Traffic" />
                        <span>Click to check traffic</span>
                    </a>
                </div>
                <div className="dashboard-weather">
                    <h3>Weather Events</h3>
                    <a href="/weather" target="_self">
                        <img src={weatherImage} alt="Weather" />
                        <span>Click to view recent weather events</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
