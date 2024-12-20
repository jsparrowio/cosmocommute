import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const NASA_APOD_BASE_URL = 'https://api.nasa.gov/planetary/apod';

// Create a route to fetch the APOD data
router.get('/', async (_req: Request, res: Response) => {
    try {
        // Build the API URL with the key
        const apiUrl = `${NASA_APOD_BASE_URL}?api_key=${process.env.NASA_API_KEY}`;

        // Fetch data from the NASA API
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch APOD data');
        }

        // Parse the response JSON
        const data = await response.json();

        // Send data to the frontend
        return res.json(data);
    } catch (error: any) {
        // Handle errors during fetch
        return res.status(500).json({ error: error.message });
    }
});

export { router as apodRouter };
