var StateList = require('./statelist');

function Gallery(display, imageFactory) {
  var self = this;
  var images = new StateList();
  var zoom = new StateList(['min', 'med', 'max']);

  self.initialize = function(urls) {
    setNoImagesWarning(urls.length === 0);
    images.setList(createImages(urls));
    display.setImages(images.list);
    showCurrentImage();
  };

  function setNoImagesWarning(visible) {
    if (visible) display.showNoImagesWarning();
    else display.hideNoImagesWarning();
  }

  function createImages(urls) {
    var createImage = function(url) {
      var image = imageFactory(url, self.setNextZoom);
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
    var current = images.currentIndex + 1;
    var total = images.lastIndex() + 1;
    display.setImageInfoHtml(current + "/" + total);
  }

  self.next = function() {
    hideCurrentImage();
    images.next().show();
    setImageInfo();
  };

  self.previous = function() {
    hideCurrentImage();
    images.previous().show();
    setImageInfo();
  };

  self.setNextZoom = function() {
    display.setZoom(zoom.next());
  };

  display.addNextHandler(self.next);
  display.addPreviousHandler(self.previous);
  display.addZoomHandler(self.setNextZoom);
}

module.exports = Gallery;
