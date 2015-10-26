var StateList = require('./statelist');
var log = require('./logging');

function imageHashFunction(image) {
  return image.src;
};

function Gallery(display, imageFactory) {
  var self = this;
  var images = new StateList([], imageHashFunction);
  var zoom = new StateList(['min', 'med', 'max']);

  self.initialize = function(urls, selectedImage) {
    setNoImagesWarning(urls.length === 0);
    images.setList(createImages(urls));
    display.setImages(images.list);

    if (typeof selectedImage === 'number') {
      self.setIndex(selectedImage);
    } else if (typeof selectedImage === 'string') {
      self.setById(selectedImage);
    }
  };

  function setNoImagesWarning(visible) {
    if (visible) display.showNoImagesWarning();
    else display.hideNoImagesWarning();
  }

  function createImages(urls) {
    var createImage = function(url) {
      var image = imageFactory(url, self.setNextZoom, self.invalidImage);
      image.addLinkOnClick(function() { showImage(image); });
      return image;
    };

    return urls.map(createImage);
  }

  function updateImage(f, noLocationUpdate) {
    hideCurrentImage();
    f().show();
    setImageInfo(noLocationUpdate);
  }

  function currentImage() {
    return images.currentItem();
  }

  function showImage(image) {
    updateImage(function() { return images.setCurrentItem(image); });
  }

  function hideCurrentImage() {
    var image = currentImage();
    if (image) image.hide();
  }

  function setImageInfo(noLocationUpdate) {
    var image = currentImage();
    if (image && !noLocationUpdate) {
      display.setImageLocation(imageHashFunction(image));
    }
    display.setImageInfoHtml(imageInfoText());
  }

  function imageInfoText() {
    var current = images.currentIndex + 1;
    var last = images.lastIndex() + 1;
    return current + '/' + last;
  }

  function isMaxZoom() {
    return zoom.currentItem() === 'max';
  }

  self.invalidImage = function(image) {
    var nextImage = images.removeItem(image);
    if (image) {
      log('Invalid or missing image: ', image.src);
      image.removeElements();
    }
    if (nextImage) {
      showImage(nextImage);
    }
  };

  self.next = function(checkZoom) {
    if (checkZoom && isMaxZoom()) return true;

    updateImage(function() { return images.next(); });
  };

  self.previous = function(checkZoom) {
    if (checkZoom && isMaxZoom()) return true;

    updateImage(function() { return images.previous(); });
  };

  self.setNextZoom = function() {
    display.setZoom(zoom.next());
  };

  self.setIndex = function(index) {
    var isCurrentImage = images.currentIndex === index;

    updateImage(
        function() { return images.setCurrentIndex(index); },
        isCurrentImage);
  };

  self.setById = function(id) {
    var isCurrentImage = images.currentKey === id;

    updateImage(
        function() { return images.setCurrentId(id); },
        isCurrentImage);
  };

  display.addNextHandler(self.next);
  display.addPreviousHandler(self.previous);
  display.addZoomHandler(self.setNextZoom);
}

module.exports = Gallery;
