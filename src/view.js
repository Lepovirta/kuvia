var dom = require('./domtools');
var utils = require('./utils');

var callEach = function(items, args) {
  utils.forEach(items, function(item) {
    item.apply(null, args);
  });
};

var createView = function() {
  var self = {},
      elementIds = ['imginfo', 'imgarea', 'linksarea', 'sidebar'],
      elements = {},
      nextHandlers = [],
      previousHandlers = [],
      zoomHandlers = [];

  self.initialize = function() {
    elements = dom.byIds(elementIds);
    addClassClickHandlers([
      ['next_image', callNextHandlers],
      ['previous_image', callPreviousHandlers],
      ['toggle_sidebar', toggleSidebar],
      ['toggle_zoom', callZoomHandlers]
    ]);
    dom.onKeyDown({
      32: toggleSidebar,
      75: callPreviousHandlers,
      74: callNextHandlers,
      90: callZoomHandlers
    });
  };

  function addClassClickHandlers(handlers) {
    utils.forEach(handlers, function(h) {
      addClickHandler(dom.byClass(h[0]), h[1]);
    });
  }

  function addClickHandler(element, handler) {
    var addclickhandler = function(el) {
      dom.onEvent(el, 'click', handler);
    };

    if (element instanceof HTMLCollection) {
      utils.forEach(element, addclickhandler);
    } else {
      addclickhandler(element);
    }
  }

  function toggleSidebar() {
    dom.toggleCssClass(elements.sidebar, 'show');
  };

  function callNextHandlers() { callEach(nextHandlers); }
  function callPreviousHandlers() { callEach(previousHandlers); }
  function callZoomHandlers() { callEach(zoomHandlers); }

  self.addNextHandler = nextHandlers.push.bind(nextHandlers);
  self.addPreviousHandler = previousHandlers.push.bind(previousHandlers);
  self.addZoomHandler = zoomHandlers.push.bind(zoomHandlers);

  self.setImageInfoHtml = function(html) {
    elements.imginfo.innerHTML = html;
  };

  self.setImages = function(images) {
    var linksareaFragment = dom.fragment(),
        imgareaFragment = dom.fragment();

    utils.forEach(images, function(image) {
      linksareaFragment.appendChild(createListElement(image.link));
      imgareaFragment.appendChild(image.image);
    });

    dom.setChild(elements.linksarea, linksareaFragment);
    dom.setChild(elements.imgarea, imgareaFragment);
  };

  function createListElement(element) {
    var listElement = dom.element('li');
    listElement.appendChild(element);
    return listElement;
  }

  self.showNoImagesWarning = function() {
    var warning = dom.byId('noimageswarning');
    dom.show(warning, 'block');
  };

  self.hideNoImagesWarning = function() {
    var warning = dom.byId('noimageswarning');
    dom.hide(warning);
  };

  self.setZoom = function(zoomMode) {
    dom.removeCssClassPrefix(elements.imgarea, 'zoom');
    dom.addCssClass(elements.imgarea, 'zoom-' + zoomMode);
  };

  return self;
};

exports.createView = createView;
