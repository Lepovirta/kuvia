var StateList = require('./statelist');
var log = require('./logging');

function Gallery(display, imageFactory) {
  var self = this;
  var images = new StateList();
  var zoom = new StateList(['min', 'med', 'max']);

  self.initialize = function(urls, selectedImageIndex) {
    setNoImagesWarning(urls.length === 0);
    images.setList(createImages(urls));
    display.setImages(images.list);
    self.setIndex(selectedImageIndex);
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

  function showImage(image) {
    hideCurrentImage();
    image.show();
    images.setCurrentItem(image);
    setImageInfo();
  }

  function hideCurrentImage() {
    var image = images.currentItem();
    if (image) image.hide();
  }

  function showCurrentImage() {
    var image = images.currentItem();
    if (image) image.show();
    setImageInfo();
  }

  function setImageInfo() {
    var index = currentIndex();
    display.setImageLocation(index);
    display.setImageInfoHtml(index + '/' + lastIndex());
  }

  function currentIndex() {
    return images.currentIndex + 1;
  }

  function lastIndex() {
    return images.lastIndex() + 1;
  }

  function isMaxZoom() {
    return zoom.currentItem() === 'max';
  }

  self.invalidImage = function() {
    var image = images.removeCurrent();
    if (image) {
      log('Invalid or missing image: ', image.src);
      image.removeElements();
    }
    showCurrentImage();
  };

  self.next = function(checkZoom) {
    if (checkZoom && isMaxZoom()) return true;

    hideCurrentImage();
    images.next().show();
    setImageInfo();
  };

  self.previous = function(checkZoom) {
    if (checkZoom && isMaxZoom()) return true;

    hideCurrentImage();
    images.previous().show();
    setImageInfo();
  };

  self.setNextZoom = function() {
    display.setZoom(zoom.next());
  };

  self.setIndex = function(index) {
    hideCurrentImage();
    images.setCurrentIndex(index);
    showCurrentImage();
  };

  display.addNextHandler(self.next);
  display.addPreviousHandler(self.previous);
  display.addZoomHandler(self.setNextZoom);
}

module.exports = Gallery;
