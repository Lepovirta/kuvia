var dom = require('./domtools');
var utils = require('./utils');

function callEach(items) {
  var args = Array.prototype.slice.call(arguments, 1);
  var results = items.map(function(item) { return item.apply(null, args) });
  return results.every(function(v) { return v === true; });
}

var elementIds = ['imginfo', 'imgarea', 'linksarea', 'sidebar'];

var createView = function() {
  var self = {},
      elements = {},
      nextHandlers = [],
      previousHandlers = [],
      zoomHandlers = [];

  self.initialize = function() {
    elements = dom.byIds(elementIds);
    addClassClickHandlers([
      ['next_image', callNextHandlers.bind(null, false)],
      ['previous_image', callPreviousHandlers.bind(null, false)],
      ['toggle_sidebar', toggleSidebar],
      ['toggle_zoom', callZoomHandlers]
    ]);
    dom.onKeyDown({
      32: toggleSidebar,
      75: callPreviousHandlers.bind(null, false),
      74: callNextHandlers.bind(null, false),
      37: callPreviousHandlers.bind(null, true),
      39: callNextHandlers.bind(null, true),
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

  var callNextHandlers = callEach.bind(null, nextHandlers);
  var callPreviousHandlers = callEach.bind(null, previousHandlers);
  var callZoomHandlers = callEach.bind(null, zoomHandlers);

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
