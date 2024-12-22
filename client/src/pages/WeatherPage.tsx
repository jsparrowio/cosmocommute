import { useEffect, useState } from 'react';
import { fetchWeatherEvents } from '../apis/weatherAPI';
import solarFlareImage from '../assets/solar-flare.jpg';
import Auth from '../utils/auth';
import { Card } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import '../WeatherPage.css';

interface WeatherEvent {
  startDate: string;
  endDate: string;
  beginTime: string;
  peakTime: string;
  endTime: string;
}

const WeatherPage = () => {
  const [init, setInit] = useState(true);
  const [loginCheck, setLoginCheck] = useState(false);
  const [events, setEvents] = useState<WeatherEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = Auth.loggedIn();
    if (loggedIn === true) {
      setInit(false);
      setLoginCheck(true);
      setLoading(true);
      const loadEvents = async () => {
        try {
          const data = await fetchWeatherEvents('solarFlare', '2024-12-01', '2024-12-31'); // Fetching for 1 month
          // Filter data to get the most recent event for each event type
          const recentEvents = getMostRecentEventForEachType(data);
          setEvents(recentEvents);
          setLoading(false);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      };

      loadEvents();
    } else {
      setInit(false);
      Auth.logout();
    }
  }, []);
  // Function to get the most recent event for each event type
  const getMostRecentEventForEachType = (data: any[]) => {
    const eventsMap: { [key: string]: any } = {};

    // Loop through the data and identify the most recent event for each event type.
    data.forEach((event) => {
      const eventDate = new Date(event.beginTime); // Assuming 'beginTime' is the event start time
      if (!eventsMap[event.eventType] || new Date(eventsMap[event.eventType].beginTime) < eventDate) {
        eventsMap[event.eventType] = event;
      }
    });

    // Convert the map to an array and return it
    return Object.values(eventsMap);
  };

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
  if (events.length === 0 && loading === false && init === false && loginCheck === true) return (
    <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'margin': '3rem' }}>
      <Card bordered={true} style={{ width: 300 }}>
        <p>No events found</p>;
      </Card>
    </div>
  )


  return (
    <>
      {loginCheck === true &&
        <div className="weather-event">
          <h1>Recent Weather Events</h1>
          <div className="weather-event-container">
            {events.map((event, index) => (
              <div key={index} className="card">
                <h2>Solar Flare</h2>
                <p className="start-date"><strong>Start Date:</strong> {new Date(event.beginTime).toLocaleString()}</p>
                <p className="peak-time"><strong>Peak Time:</strong> {new Date(event.peakTime).toLocaleString()}</p>
                <p className="end-date"><strong>End Date:</strong> {new Date(event.endTime).toLocaleString()}</p>
                <p className="description">A solar flare is a sudden, intense burst of energy and radiation originating from the Sun's surface
                  and outer atmosphere. It occurs when magnetic energy stored in the Sun's atmosphere is released, often
                  associated with sunspots or active regions. This release of energy causes a variety of effects,
                  including the emission of X-rays, ultraviolet radiation, and energetic particles. Solar flares can
                  affect space weather, including satellite communications, GPS systems, and power grids on Earth.</p>
                <img src={solarFlareImage} alt="Solar Flare" style={{ width: '100%', borderRadius: '10px' }} />
                {/* Display other event details as needed */}
              </div>
            ))}
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
    </>
  );
};

export default WeatherPage;
