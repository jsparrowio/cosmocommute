export const fetchAstronomyPicture = async (): Promise<any> => {
  try {
    const apiUrl = `/api/apod`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch astronomy picture: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching astronomy picture:', error);
    throw error;
  }
};

export default fetchAstronomyPicture;
