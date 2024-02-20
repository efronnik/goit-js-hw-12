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

function clearGallery() {
  galleryContainer.innerHTML = '';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideEndMessage() {
  endMessage.style.display = 'none';
}

function showEndMessage() {
  endMessage.style.display = 'block';
}

function showLoader() {
  loaderContainer.style.display = 'inline-block';
}

function hideLoader() {
  loaderContainer.style.display = 'none';
}

function showErrorMessage(message) {
  iziToast.info({
    title: 'Information',
    message: message,
    position: 'topRight',
  });
}

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  queryInput = event.target.elements.query.value;

  if (queryInput === '') {
    return;
  }

  currentPage = 1;

  clearGallery();
  hideEndMessage();
  showLoader();

  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=42404284-d1db8811507a6ab98b0e3f497&q=${queryInput}&image_type=photo&orientation=horizontal&safeSearch=true&page=${currentPage}&per_page=15`
    );

    const { hits, totalHits } = data;

    if (hits.length > 0) {
      const galleryHTML = hits.map(createGallery).join('');
      galleryContainer.innerHTML = galleryHTML;
      const lightbox = new SimpleLightbox(`.${GALLERY_LINK}`);
      lightbox.refresh();
      showLoadMoreButton();

      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    } else {
      showErrorMessage(
        `Sorry, there are no images matching your search query. Please try again!`
      );
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: `Error fetching images: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
});

loadMoreBtn.addEventListener('click', async function () {
  showLoader();

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

      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });

      if (currentPage * 15 >= totalHits) {
        showEndMessage();
        hideLoadMoreButton();
        showErrorMessage(`Sorry, there are no more images to load.`);
      }
    } else {
      showErrorMessage(`Sorry, there are no more images to load.`);
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: `Error fetching images: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
