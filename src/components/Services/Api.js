import axios from 'axios';
export { fetchPhoto };
async function fetchPhoto(searchQuery, page, perPage) {
  const apiKey = `34197852-03b7352fc2ee661f306011b94`;
  const BASE_URL = `https://pixabay.com/api/`;

  const response = await axios.get(`${BASE_URL}?key=${apiKey}`, {
    params: {
      q: searchQuery,
      per_page: 12,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  if (response.status !== 200) {
    throw new Error(response.status);
  }
  const images = await response.data;
  console.log(images);
  return images;
}
