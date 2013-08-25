var dt = require('./domtools');
var utils = require('./utils');

var callEach = function(items, args) {
  utils.forEach(items, function(item) {
    item.apply(null, args);
  });
};

var createView = function(window) {
  var that = {},
      domtools = new dt.DomTools(window),
      elementIds = ['previous', 'next', 'imginfo',
                    'imgarea', 'linksarea', 'sidebar'],
      elements = {},
      nextHandlers = [],
      previousHandlers = [];

  that.initialize = function() {
    elements = domtools.getElementsByIds(elementIds);
    addClickHandlerForElement(elements.next, callNextHandlers);
    addClickHandlerForElement(elements.previous, callPreviousHandlers);
    addToggleSideBarHandler();
    domtools.onKeyDown({
      32: that.toggleSidebar,
      37: callPreviousHandlers,
      39: callNextHandlers
    });
  };

  var callNextHandlers = function() {
    callEach(nextHandlers);
  };

  var callPreviousHandlers = function() {
    callEach(previousHandlers);
  };

  var addClickHandlerForElement = function(element, handler) {
    dt.onEvent(element, 'click', function(e) {
      e.preventDefault();
      handler();
    });
  };

  var addToggleSideBarHandler = function() {
    var togglers = window.document.getElementsByClassName('toggle_sidebar');
    dt.onEvent(togglers, 'click', that.toggleSidebar);
  };

  that.toggleSidebar = function() {
    var sidebar = elements.sidebar;
    if (dt.hasCssClass(sidebar, 'show')) {
      dt.removeCssClass(sidebar, 'show');
    } else {
      dt.addCssClass(sidebar, 'show');
    }
  };

  that.addNextHandler = function(handler) {
    nextHandlers.push(handler);
  };

  that.addPreviousHandler = function(handler) {
    previousHandlers.push(handler);
  };

  that.setImageInfoHtml = function(html) {
    elements.imginfo.innerHTML = html;
  };

  that.setImages = function(images) {
    var linksareaFragment = createDocumentFragment(),
        imgareaFragment = createDocumentFragment();

    utils.forEach(images, function(image) {
      linksareaFragment.appendChild(createListElement(image.link));
      imgareaFragment.appendChild(image.image);
    });

    setChildElement(elements.linksarea, linksareaFragment);
    setChildElement(elements.imgarea, imgareaFragment);
  };

  var createListElement = function(element) {
    var listElement = window.document.createElement('li');
    listElement.appendChild(element);
    return listElement;
  };

  var createDocumentFragment = function() {
    return window.document.createDocumentFragment();
  };

  var setChildElement = function(parent, child) {
    dt.clearNode(parent);
    parent.appendChild(child);
  };

  return that;
};

exports.createView = createView;
