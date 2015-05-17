var utils = require('./utils');

function isIE() {
  return (window.navigator.appVersion.indexOf("MSIE") !== -1);
}

function byIds(ids) {
  return utils.mapForKeys(ids, byId);
};

function byId(id) {
  return window.document.getElementById(id);
};

function byClass(className) {
  return window.document.getElementsByClassName(className);
}

function onLoad(fun) {
  var doc = window.document;
  var retry = function() { onLoad(fun); }
  if (/in/.test(doc.readyState)) {
    if (isIE())
      window.setTimeout(retry, 9);
    else
      window.setTimeout(retry, 9, false);
  } else {
    fun();
  }
}

function onKeyDown(handlermap) {
  onEventNoPrevent(window, 'keydown', function(e) {
    var handler = handlermap[e.keyCode];
    if (typeof handler === 'function') {
      handler(e);
      e.preventDefault();
    }
  });
}

function onEvent(obj, evname, fun) {
  var handler = function(e) {
    fun(e);
    e.preventDefault();
  };
  onEventNoPrevent(obj, evname, handler);
}

function onEventNoPrevent(obj, evname, fun) {
  if (obj instanceof NodeList) {
    utils.forEach(obj, function(el) {
      addevent(el, evname, fun);
    });
  } else {
    addevent(obj, evname, fun);
  }
}

function addevent(el, evname, handler) {
  if (typeof el.addEventListener === 'function') {
    el.addEventListener(evname, handler, false);
  } else if (typeof el.attachEvent === 'function') {
    el.attachEvent('on'+evname, handler);
  } else {
    console.log('Failed to attach event', el);
  }
}

function hasCssClass(element, cssClass) {
  return element.className.indexOf(cssClass) >= 0;
}

function addCssClass(element, cssClass) {
  element.className += ' ' + cssClass;
}

function removeCssClass(element, cssClass) {
  var re = new RegExp('(\\s|^)'+cssClass+'(\\s|$)');
  element.className = element.className.replace(re, '');
}

function toggleCssClass(element, cssClass) {
  if (hasCssClass(element, cssClass)) {
    removeCssClass(element, cssClass);
  } else {
    addCssClass(element, cssClass);
  }
}

function hide(element) {
  if (element) {
    element.style.display = 'none';
  }
}

function show(element, displayType) {
  if (typeof displayType !== 'string') {
    displayType = 'inline';
  }
  if (element) {
    element.style.display = displayType;
  }
}

function clearNode(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

function fragment() {
  return window.document.createDocumentFragment();
}

function element(el) {
  return window.document.createElement(el);
}

function text(s) {
  return window.document.createTextNode(s);
}

function setChild(parent, child) {
  clearNode(parent);
  parent.appendChild(child);
}

function xhr() {
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

function ajax(opts) {
  var x = xhr();

  x.onreadystatechange = function() {
    if (x.readyState === 4) {
      opts.callback(x);
    }
  };

  x.open(opts.method || 'GET', opts.url, true);

  if (typeof opts.data !== 'undefined') {
    x.send(opts.data);
  } else {
    x.send();
  }
}

exports.byIds = byIds;
exports.byId = byId;
exports.byClass = byClass;
exports.onLoad = onLoad;
exports.onKeyDown = onKeyDown;
exports.ajax = ajax;
exports.onEventNoPrevent = onEventNoPrevent;
exports.onEvent = onEvent;
exports.fragment = fragment;
exports.element = element;
exports.text = text;
exports.setChild = setChild;
exports.hasCssClass = hasCssClass;
exports.addCssClass = addCssClass;
exports.removeCssClass = removeCssClass;
exports.toggleCssClass = toggleCssClass;
exports.hide = hide;
exports.show = show;
exports.clearNode = clearNode;
