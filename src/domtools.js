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

function noModifiers(e) {
  return !e.ctrkKey && !e.shiftKey && !e.altKey && !e.metaKey;
}

function onKeyDown(handlermap) {
  onEvent(window, 'keydown', function(e) {
    var handler = handlermap[e.keyCode];
    if (typeof handler === 'function' && noModifiers(e)) {
      return handler(e);
    }
    return true;
  });
}

function onEvent(obj, evname, fun) {
  var handler = function(e) {
    var r = fun(e);
    if (r !== true) e.preventDefault();
  };
  if (obj instanceof NodeList) {
    utils.forEach(obj, function(el) {
      addevent(el, evname, handler);
    });
  } else {
    addevent(obj, evname, handler);
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

function removeCssClassPrefix(element, cssClassPrefix) {
  var re = new RegExp('(\\s|^)'+cssClassPrefix+'-\\w+(\\s|$)');
  element.className = element.className.replace(re, '');
}

function removeNode(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
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
exports.onEvent = onEvent;
exports.fragment = fragment;
exports.element = element;
exports.text = text;
exports.setChild = setChild;
exports.hasCssClass = hasCssClass;
exports.addCssClass = addCssClass;
exports.removeCssClass = removeCssClass;
exports.removeCssClassPrefix = removeCssClassPrefix;
exports.removeNode = removeNode;
exports.toggleCssClass = toggleCssClass;
exports.hide = hide;
exports.show = show;
exports.clearNode = clearNode;
