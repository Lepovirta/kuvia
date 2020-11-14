const StateList = require('./statelist');
const log = require('./logging');

function imageHashFunction(image) {
  return image.src;
}

function Gallery(display, imageFactory) {
  const self = this;
  const images = new StateList([], imageHashFunction);
  const zoom = new StateList(['min', 'med', 'max']);

  function setNoImagesWarning(visible) {
    if (visible) {
      display.showNoImagesWarning();
    } else {
      display.hideNoImagesWarning();
    }
  }

  function currentImage() {
    return images.currentItem();
  }

  function hideCurrentImage() {
    const image = currentImage();
    if (image) {
      image.hide();
    }
  }

  function imageInfoText() {
    const current = images.currentIndex + 1;
    const last = images.lastIndex() + 1;
    const image = images.currentItem();
    const imageText = image ? image.text : '';
    return `${current}/${last} - ${imageText}`;
  }

  function setImageInfo(noLocationUpdate) {
    const image = currentImage();
    if (image && !noLocationUpdate) {
      display.setImageLocation(imageHashFunction(image));
    }
    display.setImageInfoHtml(imageInfoText());
  }

  function updateImage(f, noLocationUpdate) {
    hideCurrentImage();
    f().show();
    setImageInfo(noLocationUpdate);
  }

  function showImage(image) {
    updateImage(() => images.setCurrentItem(image));
  }

  function createImages(urls) {
    const createImage = (url) => {
      const image = imageFactory(url, self.setNextZoom, self.invalidImage);
      image.addLinkOnClick(() => { showImage(image); });
      return image;
    };

    return urls.map(createImage);
  }

  function isMaxZoom() {
    return zoom.currentItem() === 'max';
  }

  self.invalidImage = (image) => {
    const nextImage = images.removeItem(image);
    if (image) {
      log('Invalid or missing image: ', image.src);
      image.removeElements();
    }
    if (nextImage) {
      showImage(nextImage);
    }
  };

  self.next = (checkZoom) => {
    if (checkZoom && isMaxZoom()) {
      return true;
    }

    return updateImage(() => images.next());
  };

  self.previous = (checkZoom) => {
    if (checkZoom && isMaxZoom()) {
      return true;
    }

    return updateImage(() => images.previous());
  };

  self.setNextZoom = () => {
    display.setZoom(zoom.next());
  };

  self.setIndex = (index) => {
    updateImage(
      () => images.setCurrentIndex(index),
      images.currentIndex === index,
    );
  };

  self.setById = (id) => {
    updateImage(
      () => images.setCurrentId(id),
      images.currentKey === id,
    );
  };

  self.initialize = (urls, selectedImage) => {
    setNoImagesWarning(urls.length === 0);
    images.setList(createImages(urls));
    display.setImages(images.list);
    display.setZoom(zoom.currentItem());

    if (typeof selectedImage === 'number') {
      self.setIndex(selectedImage);
    } else if (typeof selectedImage === 'string') {
      self.setById(selectedImage);
    }
  };

  display.addNextHandler(self.next);
  display.addPreviousHandler(self.previous);
  display.addZoomHandler(self.setNextZoom);
}

module.exports = Gallery;
