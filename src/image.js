var dom = require('./domtools');

function Image(src, onclick) {
  var self = this;
  self.src = src;
  self.text = createTextFromSrc(src);
  self.image = createImageElement(onclick);
  self.link = createTextLink(self.text);

  self.loadImage = function() {
    if (self.image.src !== self.src) {
      self.image.src = self.src;
    }
  };

  self.hide = function() {
    dom.removeCssClass(self.image, 'show');
    dom.removeCssClass(self.link, 'show');
  };

  self.show = function() {
    self.loadImage();
    dom.addCssClass(self.image, 'show');
    dom.addCssClass(self.link, 'show');
  };

  self.setImageOnClick = function(handler) {
    self.image.onclick = handler;
  };

  self.addLinkOnClick = function(handler) {
    dom.onEvent(self.link, 'click', handler);
  };
}

function createTextFromSrc(src) {
  return decodeURI(src.substring(src.lastIndexOf('/')+1, src.length));
}

function createTextLink(text) {
  var link = dom.element('a');
  link.href = '#';
  link.appendChild(dom.text(text));
  link.title = text;
  return link;
}

function createImageElement(onclick) {
  var img = dom.element('img');
  if (typeof onclick === 'function') {
    img.onclick = onclick;
  }
  return img;
}

module.exports = Image;
