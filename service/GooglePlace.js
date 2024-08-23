export const photo_ref = async (placeName) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`);
    const res = await response.json();
   return res
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
