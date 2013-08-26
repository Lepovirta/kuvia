var dt = require('./domtools');

function Image(document, src, onclick) {
  this.src = src;
  this.text = createTextFromSrc(src);
  this.image = createImageElement(document, onclick);
  this.link = createTextLink(document, this.text);
}

var createTextFromSrc = function(src) {
  return src.substring(src.lastIndexOf('/')+1, src.length);
};

var createTextLink = function(document, text) {
  var link = document.createElement('a');
  link.href = '#';
  link.appendChild(document.createTextNode(text));
  return link;
};

var createImageElement = function(document, onclick) {
  var img = document.createElement('img');
  if (typeof onclick === 'function') {
    img.onclick = onclick;
  }
  return img;
};

Image.prototype.loadImage = function() {
  if (this.image.src !== this.src) {
    this.image.src = this.src;
  }
};

Image.prototype.hide = function() {
  dt.removeCssClass(this.image, 'show');
  dt.removeCssClass(this.link, 'show');
};

Image.prototype.show = function() {
  this.loadImage();
  dt.addCssClass(this.image, 'show');
  dt.addCssClass(this.link, 'show');
};

Image.prototype.setImageOnClick = function(handler) {
  this.image.onclick = handler;
};

Image.prototype.addLinkOnClick = function(handler) {
  dt.onEvent(this.link, 'click', handler);
};

var imageFactory = function(window) {
  return function(src, onclick) {
    return new Image(window.document, src, onclick);
  };
};

exports.Image = Image;
exports.imageFactory = imageFactory;
