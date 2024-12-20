import { useEffect, useState } from 'react';
import { fetchAstronomyPicture } from '../apis/apodAPI';
import '../DashboardPage.css';

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
                // Fetch the APOD data from the API (backend)
                const response = await fetchAstronomyPicture();

                // Check the structure of the response; it should be an object
                console.log('Fetched APOD data:', response);

                setApodData(response);
            } catch (error: any) {
                setError(error.message || 'Error fetching APOD data');
            } finally {
                setLoading(false);
            }
        };

        fetchApodData();
    }, []); // Only fetch once on component mount

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dashboard">
            <h1>Astronomy Picture of the Day</h1>
            {apodData && (
                <div className="apod-container">
                    <h2>{apodData.title}</h2>
                    <p><strong>Date:</strong> {apodData.date}</p>
                    <p>{apodData.explanation}</p>
                    <img
                        src={apodData.url || 'https://via.placeholder.com/800x600'}  // Fallback image
                        alt={apodData.title}
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default DashboardPage;