(function(window) {
  var doc = window.document,
      imagelist = [],
      elemnames = ['previous', 'next', 'imginfo', 'imgarea'];

  var mk_gallery = function(imagelist, elements) {
    var that = {}, current = 0,
        last = imagelist.length - 1,
        currentimg, callbacks = [];
    var images = imagelist.map(function(imgn) {
      return new_img(imgn);
    });

    that.init = function() {
      images.forEach(function(el) {
        hide(el);
        elements.imgarea.appendChild(el);
      });
    };

    that.onimagechange = function(fun) {
      callbacks.push(fun);
    };

    that.previous = function() {
      var num = current;
      if (num === 0)
        num = last;
      else
        num--;
      that.load_img(num);
    };

    that.next = function() {
      var num = current;
      if (num === last)
        num = 0;
      else
        num++;
      that.load_img(num);
    };

    that.load_img = function(num) {
      var img = images[num];
      hide(currentimg);
      show(img);
      img.load_img();
      currentimg = img;
      current = num;
      call_callbacks();
    };

    var call_callbacks = function() {
      callbacks.forEach(function(cb) {
        cb(current + 1, last + 1, currentimg);
      });
    };

    return that;
  };

  var new_img = function(src) {
    var link = doc.createElement('a'),
        img = doc.createElement('img');
    link.href = src;
    link.appendChild(img);
    link.load_img = function() {
      if (img.src !== src)
        img.src = src;
    };
    return link;
  };

  var hide = function(el) {
    if (el)
      el.style.display = 'none';
  };

  var show = function(el, param) {
    if (typeof param !== 'string')
      param = 'inline';
    if (el)
      el.style.display = param;
  };

  var is_ie = function() {
    return (navigator.appVersion.indexOf("MSIE") !== -1);
  };

  var load_elems_by_ids = function(ids) {
    var obj = {};
    ids.forEach(function(eln) {
      obj[eln] = doc.getElementById(eln);
    });
    return obj;
  };

  var load = function(fun) {
    if (/in/.test(document.readyState)) {
      if (is_ie())
        window.setTimeout(fun, 9);
      else
        window.setTimeout(fun, 9, false);
    } else {
      load(fun);
    }
  };

  var on_event = function(el, evname, fun) {
    if (typeof el.addEventListener === 'function') {
      el.addEventListener(evname, fun, false);
    } else if (typeof el.attachEvent === 'function') {
      el.attachEvent('on'+evname, fun);
    } else {
      console.log('Failed to attach event');
    }
  };

  load(function() {
    var imgl = window.imagelist || imagelist,
        elements = load_elems_by_ids(elemnames),
        gallery = mk_gallery(imgl, elements);

    gallery.init();
    window.instantgallery = gallery;

    gallery.onimagechange(function(num, total, img) {
      elements.imginfo.innerHTML = num + "/" + total;
    });

    on_event(window, 'keydown', function(e) {
      switch(e.keyCode) {
      case 37:
        gallery.previous();
        break;
      case 39:
        gallery.next();
        break;
      default:
        break;
      }
    });

    on_event(elements.previous, 'click', function(e) {
      e.preventDefault();
      gallery.previous();
    });

    on_event(elements.next, 'click', function(e) {
      e.preventDefault();
      gallery.next();
    });

    gallery.load_img(0);
  });
}).call(null, window);