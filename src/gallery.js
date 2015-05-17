var StateList = require('./statelist');

function Gallery(display, imageFactory) {
  var self = this;
  var images = new StateList();

  self.initialize = function(urls) {
    images.setList(createImages(urls));
    display.setImages(images.list);
    showCurrentImage();
  };

  function createImages(urls) {
    var createImage = function(url) {
      var image = imageFactory(url, display.toggleZoom);
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
    images.currentItem().hide();
  }

  function showCurrentImage() {
    images.currentItem().show();
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

  display.addNextHandler(self.next);
  display.addPreviousHandler(self.previous);
}

module.exports = Gallery;
