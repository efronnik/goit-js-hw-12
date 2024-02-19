import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const GALLERY_LINK = 'gallery-link';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(q) {
  const searchParams = new URLSearchParams({
    key: '42404284-d1db8811507a6ab98b0e3f497',
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safeSearch: true,
  });

  const url = `${BASE_URL}?${searchParams}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Error fetching images: ${error}`,
      position: 'topRight',
    });
    throw error;
  }
}

export { fetchImages, GALLERY_LINK };
