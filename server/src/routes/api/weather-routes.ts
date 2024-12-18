import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; 

dotenv.config();

const router = Router();
const NASA_DONKI_BASE_URL = 'https://api.nasa.gov/DONKI/';

// Function to map event types to NASA API endpoints
const getEndpointForEventType = (eventType: string): string | null => {
  const endpoints: { [key: string]: string } = {
    solarFlare: 'FLR',                  // Solar Flare
    geomagneticStorm: 'GST',           // Geomagnetic Storm
    coronalMassEjection: 'CME',        // Coronal Mass Ejection
    solarParticle: 'SEP',              // Solar Energetic Particle
    magnetopauseCrossing: 'MPC',       // Magnetopause Crossing
    interplanetaryShock: 'IPS',        // Interplanetary Shock
  };
  return endpoints[eventType] || null;
};

// Route to fetch weather events based on type
router.get('/', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, eventType } = req.query;

    // Validate required parameters
    if (!startDate || !endDate || !eventType) {
      return res.status(400).json({
        error: 'Missing required query parameters: startDate, endDate, eventType',
      });
    }

    // Get the corresponding NASA API endpoint for the event type
    const endpoint = getEndpointForEventType(eventType as string);
    if (!endpoint) {
      return res.status(400).json({ error: 'Invalid event type provided' });
    }

    // Build the NASA API URL dynamically using the eventType
    const apiUrl = `${NASA_DONKI_BASE_URL}${endpoint}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_API_KEY}`;

    // Fetch data from the NASA API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    // Check if data is empty and handle the error
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified parameters' });
    }

    // Send the data to the frontend
    return res.json(data); 
  } catch (error: any) {
    console.error('Error in NASA DONKI API call:', error.message);
    return res.status(500).json({ error: 'Failed to fetch weather events data' });
  }
});

export { router as weatherRouter };
