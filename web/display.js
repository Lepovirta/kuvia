const dom = require('./domtools');

function callEach(items, ...args) {
  return items
    .map((item) => item(...args))
    .every((v) => v === true);
}

const elementIds = [
  'imginfo',
  'imgarea',
  'linksarea',
  'sidebar',
  'zoomindicator',
];

function createDisplay() {
  const self = {};
  let elements = {};
  const nextHandlers = [];
  const previousHandlers = [];
  const zoomHandlers = [];

  function addClickHandler(element, handler) {
    const ach = (el) => {
      dom.onEvent(el, 'click', handler);
    };

    if (element instanceof HTMLCollection) {
      [...element].forEach(ach);
    } else {
      ach(element);
    }
  }

  function addClassClickHandlers(handlers) {
    handlers.forEach((h) => {
      addClickHandler(dom.byClass(h[0]), h[1]);
    });
  }

  function toggleSidebar() {
    elements.sidebar.classList.toggle('show');
  }

  const callNextHandlers = callEach.bind(null, nextHandlers);
  const callPreviousHandlers = callEach.bind(null, previousHandlers);
  const callZoomHandlers = callEach.bind(null, zoomHandlers);

  self.addNextHandler = nextHandlers.push.bind(nextHandlers);
  self.addPreviousHandler = previousHandlers.push.bind(previousHandlers);
  self.addZoomHandler = zoomHandlers.push.bind(zoomHandlers);

  self.setImageInfoHtml = (html) => {
    elements.imginfo.innerHTML = html;
  };

  function createListElement(element) {
    const listElement = dom.element('li');
    listElement.appendChild(element);
    return listElement;
  }

  self.setImages = (images) => {
    const linksareaFragment = dom.fragment();
    const imgareaFragment = dom.fragment();

    images.forEach((image) => {
      linksareaFragment.appendChild(createListElement(image.link));
      imgareaFragment.appendChild(image.image);
    });

    dom.setChild(elements.linksarea, linksareaFragment);
    dom.setChild(elements.imgarea, imgareaFragment);
  };

  self.showNoImagesWarning = () => {
    const warning = dom.byId('noimageswarning');
    dom.show(warning, 'block');
  };

  self.hideNoImagesWarning = () => {
    const warning = dom.byId('noimageswarning');
    dom.hide(warning);
  };

  self.setZoom = (zoomMode) => {
    dom.removeCssClassPrefix(elements.imgarea, 'zoom');
    elements.imgarea.classList.add(`zoom-${zoomMode}`);
    dom.removeCssClassPrefix(elements.zoomindicator, 'zoom-ind');
    elements.zoomindicator.classList.add(`zoom-ind-${zoomMode}`);
  };

  self.setImageLocation = (l) => {
    dom.setHashLocation(l);
  };

  self.initialize = () => {
    elements = dom.byIds(elementIds);
    addClassClickHandlers([
      ['next_image', callNextHandlers.bind(null, false)],
      ['previous_image', callPreviousHandlers.bind(null, false)],
      ['toggle_sidebar', toggleSidebar],
      ['toggle_zoom', callZoomHandlers],
    ]);
    dom.onKeyDown({
      32: toggleSidebar,
      75: callPreviousHandlers.bind(null, false),
      74: callNextHandlers.bind(null, false),
      37: callPreviousHandlers.bind(null, true),
      39: callNextHandlers.bind(null, true),
      90: callZoomHandlers,
    });
  };

  return self;
}

module.exports = createDisplay;
