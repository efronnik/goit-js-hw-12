import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { createGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages, GALLERY_LINK } from './js/pixabay-api';

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
      `https://pixabay.com/api/?key=42404284-d1db8811507a6ab98b0e3f497&q=${queryInput}`
    );

    if (
      response.data.hits &&
      Array.isArray(response.data.hits) &&
      response.data.hits.length > 0
    ) {
      // Если свойство `hits` существует и это массив с данными, продолжаем обработку
      const galleryHTML = response.data.hits.map(createGallery).join('');
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
