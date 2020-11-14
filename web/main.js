const Gallery = require('./gallery');
const createDisplay = require('./display');
const Image = require('./image');
const domtools = require('./domtools');

function imageFactory(src, onclick, onerror) {
  return new Image(src, onclick, onerror);
}

const display = createDisplay();
const gallery = new Gallery(display, imageFactory);

function getImageHash() {
  return domtools.getHashLocation();
}

function loadGallery(images) {
  display.initialize();
  gallery.initialize(images, getImageHash());
  window.kuvia = gallery;
}

function loadAjaxGallery(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load images list from ${url}`);
      }
      loadGallery(response.json());
    });
}

domtools.onLoad(() => {
  const images = window.imagelist;

  if (typeof images === 'string') {
    loadAjaxGallery(images);
  } else if (images && images.length > 0) {
    loadGallery(images);
  } else {
    loadGallery([]);
  }
});

domtools.onEvent(window, 'hashchange', () => {
  gallery.setById(getImageHash());
});
