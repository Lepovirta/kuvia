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
      elementIds = ['previous', 'next', 'imginfo', 'imgarea',
                    'linksarea', 'sidebar', 'helpbox', 'helplink'],
      elements = {},
      nextHandlers = [],
      previousHandlers = [];

  that.initialize = function() {
    elements = domtools.getElementsByIds(elementIds);
    addClickHandler(elements.next, callNextHandlers);
    addClickHandler(elements.previous, callPreviousHandlers);
    addClickHandler(elements.helplink, toggleHelp);
    addClickHandler(getSideBarTogglers(), that.toggleSidebar);
    domtools.onKeyDown({
      32: that.toggleSidebar,
      37: callPreviousHandlers,
      39: callNextHandlers,
      72: toggleHelp
    });
  };

  var addClickHandler = function(element, handler) {
    dt.onEvent(element, 'click', handler);
  };

  var callNextHandlers = function() {
    callEach(nextHandlers);
  };

  var callPreviousHandlers = function() {
    callEach(previousHandlers);
  };

  var toggleHelp = function() {
    toggleElement(elements.helpbox);
  };

  var toggleElement = function(element) {
    dt.toggleCssClass(element, 'show');
  };

  var getSideBarTogglers = function() {
    return window.document.getElementsByClassName('toggle_sidebar');
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
