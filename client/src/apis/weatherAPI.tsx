export const fetchWeatherEvents = async (
  eventType: string,
  startDate: string,
  endDate: string
): Promise<any[]> => {
  try {
    const apiUrl = `/api/weatherevents?eventType=${eventType}&startDate=${startDate}&endDate=${endDate}`;
    console.log('API URL:', apiUrl); // Log the URL to check if it's correct

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather events: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Data from NASA API:', data);

    // Check if the data is empty
    if (data.length === 0) {
      throw new Error('No weather events found for the given parameters');
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather events:', error);
    throw error;
  }
};

export default fetchWeatherEvents;