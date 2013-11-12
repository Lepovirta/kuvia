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
      elementIds = ['imginfo', 'imgarea', 'linksarea', 'sidebar', 'toolbar'],
      elements = {},
      nextHandlers = [],
      previousHandlers = [];

  that.initialize = function() {
    elements = domtools.getElementsByIds(elementIds);
    addClickHandler(getByClassName('next_image'), callNextHandlers);
    addClickHandler(getByClassName('previous_image'), callPreviousHandlers);
    addClickHandler(getByClassName('toggle_toolbar'), toggleToolbar);
    addClickHandler(getByClassName('toggle_sidebar'), that.toggleSidebar);
    domtools.onKeyDown({
      32: that.toggleSidebar,
      37: callPreviousHandlers,
      39: callNextHandlers,
      72: toggleToolbar
    });
  };

  var addClickHandler = function(element, handler) {
    var addclickhandler = function(el) {
      dt.onEvent(el, 'click', handler);
    };

    if (element instanceof HTMLCollection) {
      utils.forEach(element, addclickhandler);
    } else {
      addclickhandler(element);
    }
  };

  var callNextHandlers = function() {
    callEach(nextHandlers);
  };

  var callPreviousHandlers = function() {
    callEach(previousHandlers);
  };

  var toggleToolbar = function() {
    toggleElement(elements.toolbar);
  };

  var toggleElement = function(element) {
    dt.toggleCssClass(element, 'show');
  };

  var getByClassName = function(className) {
    return window.document.getElementsByClassName(className);
  };

  that.toggleSidebar = function() {
    toggleElement(elements.sidebar);
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
