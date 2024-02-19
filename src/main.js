import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { createGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('#gallery');
const searchForm = document.querySelector('.search-form');
const loaderContainer = document.querySelector('.loader');
const noResultsMessage = document.querySelector('.no-results-message');

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const queryInput = event.target.elements.query.value;

  if (queryInput === '') {
    return;
  }

  loaderContainer.style.display = 'block';

  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${queryInput}&client_id=42444504-9067092ee8fdaf17c241a1e97`
    );
    const { results } = response.data;

    if (results.length > 0) {
      const galleryHTML = results.map(createGallery).join('');
      galleryContainer.innerHTML = galleryHTML;

      const lightbox = new SimpleLightbox(`.${GALLERY_LINK}`);
      lightbox.refresh();
    } else {
      noResultsMessage.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: `Error fetching images: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    loaderContainer.style.display = 'none';
    searchForm.reset();
  }
});
