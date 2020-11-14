function byId(id) {
  return window.document.getElementById(id);
}

function mapForKeys(items, cb) {
  const obj = {};
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    obj[item] = cb(item);
  }
  return obj;
}

function byIds(ids) {
  return mapForKeys(ids, byId);
}

function byClass(className) {
  return window.document.getElementsByClassName(className);
}

function onLoad(fun) {
  const doc = window.document;
  const retry = () => { onLoad(fun); };
  if (/in/.test(doc.readyState)) {
    window.setTimeout(retry, 9, false);
  } else {
    fun();
  }
}

function noModifiers(e) {
  return !e.ctrkKey && !e.shiftKey && !e.altKey && !e.metaKey;
}

function onEvent(obj, evname, fun) {
  const handler = (e) => {
    const r = fun(e);
    if (r !== true) {
      e.preventDefault();
    }
  };
  if (obj instanceof NodeList) {
    [...obj].forEach((el) => {
      el.addEventListener(evname, handler, false);
    });
  } else {
    obj.addEventListener(evname, handler, false);
  }
}

function onKeyDown(handlermap) {
  onEvent(window, 'keydown', (e) => {
    const handler = handlermap[e.keyCode];
    if (typeof handler === 'function' && noModifiers(e)) {
      return handler(e);
    }
    return true;
  });
}

function removeCssClassPrefix(element, cssClassPrefix) {
  const cssClassesToRemove = [];
  element.classList.forEach((cssClass) => {
    if (cssClass.startsWith(cssClassPrefix)) {
      cssClassesToRemove.push(cssClass);
    }
  });
  cssClassesToRemove.forEach(
    (cssClass) => element.classList.remove(cssClass),
  );
}

function hide(element) {
  if (element) {
    // eslint-disable-next-line no-param-reassign
    element.style.display = 'none';
  }
}

function show(element, displayType) {
  if (element) {
    // eslint-disable-next-line no-param-reassign
    element.style.display = displayType || 'inline';
  }
}

function clearNode(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

function setChild(parent, child) {
  clearNode(parent);
  parent.appendChild(child);
}

exports.byClass = byClass;
exports.byId = byId;
exports.byIds = byIds;
exports.clearNode = clearNode;
exports.element = (el) => window.document.createElement(el);
exports.fragment = () => window.document.createDocumentFragment();
exports.getHashLocation = () => window.location.hash.substring(1);
exports.hide = hide;
exports.onEvent = onEvent;
exports.onKeyDown = onKeyDown;
exports.onLoad = onLoad;
exports.removeCssClassPrefix = removeCssClassPrefix;
exports.setChild = setChild;
exports.setHashLocation = (l) => { window.location = `#${l}`; };
exports.show = show;
exports.text = (s) => window.document.createTextNode(s);
