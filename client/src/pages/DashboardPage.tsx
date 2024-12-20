import { useEffect, useState } from 'react';
import { fetchAstronomyPicture } from '../apis/apodAPI';
import '../DashboardPage.css';
import trafficImage from '../assets/traffic.jpg';
import weatherImage from '../assets/weather.jpg';

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
      <div>
        <div className="dashboard">
            <div className="left-pane">
                <div className="dashboard-traffic">
                    <h3>Traffic</h3>
                    <p>Add details here.</p>
                    <a href="/traffic" target="_self">
                        <img src={trafficImage} alt="Traffic" />
                    </a>
                </div>
                <div className="dashboard-weather">
                    <h3>Weather</h3>
                    <p>Add details here.</p>
                    <a href="/weather" target="_self">
                        <img src={weatherImage} alt="Weather" />
                    </a>
                </div>
            </div>
            {apodData && (
                <div className="apod-container">
                    <h1>Astronomy Picture of the Day</h1>
                    <p><strong>Title:</strong> {apodData.title}</p>
                    <p><strong>Date:</strong> {apodData.date}</p>
                    <p>{apodData.explanation}</p>
                    <img
                        src={apodData.url || 'https://via.placeholder.com/800x600'}
                        alt={apodData.title}
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
