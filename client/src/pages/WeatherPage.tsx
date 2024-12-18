import { useEffect, useState } from 'react';
import { fetchWeatherEvents } from '../apis/weatherAPI';

interface WeatherEvent {
  startDate: string;
  endDate: string;
  beginTime: string; 
  peakTime: string;   
  endTime: string;  
}

const WeatherPage = () => {
  const [events, setEvents] = useState<WeatherEvent[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchWeatherEvents('solarFlare', '2024-01-01', '2024-02-01'); // Example: fetching for 1 month
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
  }, []);

  // Helper function to get the most recent event for each event type
  const getMostRecentEventForEachType = (data: any[]) => {
    const eventsMap: { [key: string]: any } = {};
    
    // Iterate through the data and find the most recent event for each event type
    data.forEach((event) => {
      const eventDate = new Date(event.beginTime); // Assuming 'beginTime' is the event start time
      if (!eventsMap[event.eventType] || new Date(eventsMap[event.eventType].beginTime) < eventDate) {
        eventsMap[event.eventType] = event;
      }
    });

    // Convert the map to an array and return it
    return Object.values(eventsMap);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (events.length === 0) return <p>No events found</p>;

  return (
    <div>
      <h1>Recent Weather Events</h1>
      <div className="cards">
        {events.map((event, index) => (
          <div key={index} className="card">
            <h2>Solar Flare</h2> 
            <p><strong>Start Date:</strong> {new Date(event.beginTime).toLocaleString()}</p>
            <p><strong>Peak Time:</strong> {new Date(event.peakTime).toLocaleString()}</p>
            <p><strong>End Date:</strong> {new Date(event.endTime).toLocaleString()}</p>
            {/* Display other event details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherPage;
