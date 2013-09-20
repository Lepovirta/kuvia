var utils = require('./utils');

function DomTools(window) {
  this.window = window;
}

DomTools.prototype.isIE = function() {
  return (window.navigator.appVersion.indexOf("MSIE") !== -1);
};

DomTools.prototype.getElementsByIds = function(ids) {
  var doc = window.document;
  return utils.mapForKeys(ids, function(id) {
    return doc.getElementById(id);
  });
};

DomTools.prototype.onLoad = function(fun) {
  var doc = this.window.document;
  if (/in/.test(doc.readyState)) {
    if (this.isIE())
      window.setTimeout(fun, 9);
    else
      window.setTimeout(fun, 9, false);
  } else {
    this.load(fun);
  }
};

DomTools.prototype.onKeyDown = function(handlermap) {
  onEventNoPrevent(window, 'keydown', function(e) {
    var handler = handlermap[e.keyCode];
    if (typeof handler === 'function') {
      handler(e);
      e.preventDefault();
    }
  });
};

var onEvent = function(obj, evname, fun) {
  var handler = function(e) {
    fun(e);
    e.preventDefault();
  };
  onEventNoPrevent(obj, evname, handler);
};

var onEventNoPrevent = function(obj, evname, fun) {
  if (obj instanceof NodeList) {
    utils.forEach(obj, function(el) {
      addevent(el, evname, fun);
    });
  } else {
    addevent(obj, evname, fun);
  }
};

var addevent = function(el, evname, handler) {
  if (typeof el.addEventListener === 'function') {
    el.addEventListener(evname, handler, false);
  } else if (typeof el.attachEvent === 'function') {
    el.attachEvent('on'+evname, handler);
  } else {
    console.log('Failed to attach event', el);
  }
};

var hasCssClass = function(element, cssClass) {
  return element.className.indexOf(cssClass) >= 0;
};

var addCssClass = function(element, cssClass) {
  element.className += ' ' + cssClass;
};

var removeCssClass = function(element, cssClass) {
  var re = new RegExp('(\\s|^)'+cssClass+'(\\s|$)');
  element.className = element.className.replace(re, '');
};

var toggleCssClass = function(element, cssClass) {
  if (hasCssClass(element, cssClass)) {
    removeCssClass(element, cssClass);
  } else {
    addCssClass(element, cssClass);
  }
};

var hide = function(element) {
  if (element) {
    element.style.display = 'none';
  }
};

var show = function(element, displayType) {
  if (typeof displayType !== 'string') {
    displayType = 'inline';
  }
  if (element) {
    element.style.display = displayType;
  }
};

var clearNode = function(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};

exports.DomTools = DomTools;
exports.onEventNoPrevent = onEventNoPrevent;
exports.onEvent = onEvent;
exports.hasCssClass = hasCssClass;
exports.addCssClass = addCssClass;
exports.removeCssClass = removeCssClass;
exports.toggleCssClass = toggleCssClass;
exports.hide = hide;
exports.show = show;
exports.clearNode = clearNode;
