const dom = require('./domtools');

function createTextFromSrc(src) {
  return decodeURI(src.substring(src.lastIndexOf('/') + 1, src.length));
}

function createTextLink(text) {
  const link = dom.element('a');
  link.href = '#';
  link.appendChild(dom.text(text));
  link.title = text;
  return link;
}

function createImageElement(onclick, onerror) {
  const img = dom.element('img');
  img.onclick = onclick;
  img.onerror = () => {
    img.onerror = undefined; // Ensure onerror is called only once
    onerror();
  };
  return img;
}

function Image(src, onclick, onerror) {
  const self = this;
  self.src = src;
  self.text = createTextFromSrc(src);
  self.image = createImageElement(onclick, onerror.bind(self, self));
  self.link = createTextLink(self.text);

  self.loadImage = () => {
    if (self.image.src !== self.src) {
      self.image.src = self.src;
    }
  };

  self.hide = () => {
    self.image.classList.remove('show');
    self.link.classList.remove('show');
  };

  self.show = () => {
    self.loadImage();
    self.image.classList.add('show');
    self.link.classList.add('show');
  };

  self.setImageOnClick = (handler) => {
    self.image.onclick = handler;
  };

  self.addLinkOnClick = (handler) => {
    dom.onEvent(self.link, 'click', handler);
  };

  self.removeElements = () => {
    self.image.remove();
    self.link.remove();
  };
}

module.exports = Image;
