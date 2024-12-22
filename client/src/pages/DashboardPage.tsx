import { useEffect, useState } from 'react';
import { fetchAstronomyPicture } from '../apis/apodAPI';
import '../DashboardPage.css';
import trafficImage from '../assets/traffic.jpg';
import weatherImage from '../assets/weather.jpg';
import { SettingOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import getActiveUser from '../components/ActiveUser';
import Auth from '../utils/auth';
import { Card, Space } from 'antd'
import cosmocommutelogo from "../assets/images/commutevan.png"

const activeUser = getActiveUser();

interface ApodData {
    date: string;
    title: string;
    explanation: string;
    url: string;
}

const DashboardPage = () => {
    const [init, setInit] = useState(true);
    const [loginCheck, setLoginCheck] = useState(false);
    const [apodData, setApodData] = useState<ApodData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const loggedIn = Auth.loggedIn();
        if (loggedIn === true) {
            setInit(false);
            setLoginCheck(true);
            setLoading(true);
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
        }
        else {
            setInit(false);
            Auth.logout();
        }
    }, []);

    if (loading) return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'margin': '3rem' }}>
            <Card bordered={true} style={{ width: 300 }}>
                <p>
                    <LoadingOutlined /> Loading...
                </p>
            </Card>
        </div>
    )
    if (error) return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'margin': '3rem' }}>
            <Card bordered={true} style={{ width: 300 }}>
                <p>Loading error: {error}</p>
            </Card>
        </div>
    )

    return (
        <div>
            {loginCheck === true &&
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
                        <div className="dashboard-user">
                            <img src={cosmocommutelogo} style={{ 'height': '100px', 'width': '150px' }}></img>
                            <h2 style={{ 'marginTop': '-1rem' }}>Welcome, {activeUser.userData.first_name}!</h2>
                            <Space>
                                <Link to='/UserSettings'>
                                    <button className="settings-button">
                                        <SettingOutlined className="settings-icon" style={{ color: '#ff29f9' }} />
                                        User Settings
                                    </button>
                                </Link>
                            </Space>
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
            }
            {loginCheck === false && init === false &&
                <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'margin': '3rem' }}>
                    <Card bordered={true} style={{ width: 300 }}>
                        <p>
                            You must be logged in to view this page!
                            <br />
                            Redirecting...
                        </p>
                    </Card>
                </div>
            }
        </div>
    );
};

export default DashboardPage;
