var dom = require('./domtools');
var utils = require('./utils');

var callEach = function(items, args) {
  utils.forEach(items, function(item) {
    item.apply(null, args);
  });
};

var createView = function() {
  var self = {},
      elementIds = ['imginfo', 'imgarea', 'linksarea', 'sidebar', 'toolbar'],
      elements = {},
      nextHandlers = [],
      previousHandlers = [];

  self.initialize = function() {
    elements = dom.byIds(elementIds);
    addClassClickHandlers([
      ['next_image', callNextHandlers],
      ['previous_image', callPreviousHandlers],
      ['toggle_toolbar', toggleToolbar],
      ['toggle_sidebar', self.toggleSidebar]
    ]);
    dom.onKeyDown({
      32: self.toggleSidebar,
      37: callPreviousHandlers,
      39: callNextHandlers,
      72: toggleToolbar
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

  function callNextHandlers() {
    callEach(nextHandlers);
  }

  function callPreviousHandlers() {
    callEach(previousHandlers);
  }

  function toggleToolbar() {
    toggleElement(elements.toolbar);
  }

  function toggleElement(element) {
    dom.toggleCssClass(element, 'show');
  }

  self.toggleSidebar = function() {
    toggleElement(elements.sidebar);
  };

  self.addNextHandler = function(handler) {
    nextHandlers.push(handler);
  };

  self.addPreviousHandler = function(handler) {
    previousHandlers.push(handler);
  };

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

  return self;
};

exports.createView = createView;
