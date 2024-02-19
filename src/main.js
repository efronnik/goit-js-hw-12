import iziToast from 'izitoast';
import axios from 'axios';
import { fetchImages, GALLERY_LINK } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('#gallery');
const searchForm = document.querySelector('.search-form');
const loaderContainer = document.querySelector('.loader');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const endMessage = document.getElementById('endMessage');
let currentPage = 1;
let queryInput = '';

const galleryCardHeight =
  galleryContainer.firstElementChild.getBoundingClientRect().height;

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  queryInput = event.target.elements.query.value;

  if (queryInput === '') {
    return;
  }

  loaderContainer.style.display = 'block';

  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=42404284-d1db8811507a6ab98b0e3f497&q=${queryInput}&image_type=photo&orientation=horizontal&safeSearch=true&page=${currentPage}&per_page=15`
    );
    const { hits } = data;

    if (hits.length > 0) {
      const galleryHTML = hits.map(createGallery).join('');
      galleryContainer.innerHTML = galleryHTML;
      const lightbox = new SimpleLightbox(`.${GALLERY_LINK}`);
      lightbox.refresh();
      currentPage++;
      loadMoreBtn.style.display = 'block';
    } else {
      iziToast.info({
        title: 'Information',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
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

loadMoreBtn.addEventListener('click', async function () {
  loaderContainer.style.display = 'block';

  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=42404284-d1db8811507a6ab98b0e3f497&q=${queryInput}&image_type=photo&orientation=horizontal&safeSearch=true&page=${currentPage}&per_page=15`
    );
    const { hits, totalHits } = data;

    if (hits.length > 0) {
      const galleryHTML = hits.map(createGallery).join('');
      galleryContainer.innerHTML += galleryHTML;
      const lightbox = new SimpleLightbox(`.${GALLERY_LINK}`);
      lightbox.refresh();
      currentPage++;

      const halfPageHeight = window.innerHeight / 2;
      window.scrollBy({ top: halfPageHeight, behavior: 'smooth' });

      if (currentPage * 15 >= totalHits) {
        endMessage.style.display = 'block';
        iziToast.info({
          title: 'Information',
          message: `We're sorry, but you've reached the end of search results.`,
          position: 'topRight',
        });
      }
    } else {
      iziToast.info({
        title: 'Information',
        message: `Sorry, there are no more images to load.`,
        position: 'topRight',
      });
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
  }
});
