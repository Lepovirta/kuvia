var StateList = require('./statelist').StateList;

function Gallery(display, imageFactory) {
  this.display = display;
  this.imageFactory = imageFactory;
  this.images = new StateList();
  display.addNextHandler(this.next.bind(this));
  display.addPreviousHandler(this.previous.bind(this));
}

Gallery.prototype.initialize = function(urls) {
  var that = this;
  this.images.setList(this.createImages(urls));
  this.display.setImages(this.images.list);
  this.showCurrentImage();
};

Gallery.prototype.createImages = function(urls) {
  var that = this;
  var onclick = function () {
    that.next();
  };
  var createImage = function(url) {
    var image = that.imageFactory(url, onclick);
    image.addLinkOnClick(function (e) {
      that.showImage(image);
    });
    return image;
  };

  return urls.map(createImage);
};

Gallery.prototype.showImage = function(image) {
  this.hideCurrentImage();
  image.show();
  this.images.setCurrentItem(image);
  this.setImageInfo();
};

Gallery.prototype.hideCurrentImage = function() {
  this.images.currentItem().hide();
};

Gallery.prototype.showCurrentImage = function() {
  this.images.currentItem().show();
  this.setImageInfo();
};

Gallery.prototype.next = function() {
  this.hideCurrentImage();
  var image = this.images.next();
  image.show();
  this.setImageInfo();
};

Gallery.prototype.previous = function() {
  this.hideCurrentImage();
  var image = this.images.previous();
  image.show();
  this.setImageInfo();
};

Gallery.prototype.setImageInfo = function() {
  var current = this.images.currentIndex + 1;
  var total = this.images.lastIndex() + 1;
  this.display.setImageInfoHtml(current + "/" + total);
};

exports.Gallery = Gallery;
