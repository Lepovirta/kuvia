(function(window, console) {
  var doc = window.document,
      imagelist = [],
      elemnames = ['previous', 'next', 'imginfo',
                   'imgarea', 'linksarea'];

  var mk_gallery = function(imagelist, elements) {
    var that = {}, current = 0,
        last = imagelist.length - 1,
        currentimg, callbacks = [], images = [];

    that.init = function() {
      var imgs = doc.createDocumentFragment(),
          links = doc.createDocumentFragment();
      images = imagelist.map(function(imgurl) {
        var imgobj = new_imgobj(imgurl),
            liel = doc.createElement('li');
        imgs.appendChild(imgobj.imglink);
        on_event(imgobj.link, 'click', function(e) {
          that.load_img(imgobj);
          e.preventDefault();
        });
        liel.appendChild(imgobj.link);
        links.appendChild(liel);
        return imgobj;
      });
      elements.imgarea.appendChild(imgs);
      elements.linksarea.appendChild(links);
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
      var img;
      if (typeof num !== 'number')
        num = images.indexOf(num);
      if (num < 0) return;

      img = images[num];
      if (currentimg)
        currentimg.toggle();
      img.toggle();
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

  var new_imgobj = function(src) {
    var obj = {
      src: src,
      imglink: doc.createElement('a'),
      link: doc.createElement('a')
    };
    var img = doc.createElement('img'),
        text = src.substring(src.lastIndexOf('/')+1, src.length),
        shown = false;
    obj.link.href = '#';
    obj.link.appendChild(doc.createTextNode(text));
    obj.imglink.href = src;
    obj.imglink.appendChild(img);
    obj.load_img = function() {
      if (img.src !== src)
        img.src = src;
    };
    obj.toggle = function () {
      if (shown) {
        remove_class(obj.imglink, 'show');
        remove_class(obj.link, 'show');
        shown = false;
      } else {
        add_class(obj.imglink, 'show');
        add_class(obj.link, 'show');
        shown = true;
      }
    };
    return obj;
  };

  var has_class = function(el, cls) {
    return el.className.indexOf(cls) >= 0;
  };

  var remove_class = function(el, cls) {
    var re = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    el.className = el.className.replace(re, '');
  };

  var add_class = function(el, cls) {
    el.className += ' ' + cls;
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

  var forEach = function(obj, cb) {
    for (var i = 0; i < obj.length; i++)
      cb(obj[i], i, obj);
  };

  var toggle_sidebar = function(sidebar) {
    if (sidebar.style.display === 'block')
      sidebar.style.display = 'none';
    else
      sidebar.style.display = 'block';
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

  var on_event = function(obj, evname, fun) {
    var addevent = function(el, evname, fun) {
      if (typeof el.addEventListener === 'function') {
        el.addEventListener(evname, fun, false);
      } else if (typeof el.attachEvent === 'function') {
        el.attachEvent('on'+evname, fun);
      } else {
        console.log('Failed to attach event', el);
      }
    };
    if (obj instanceof NodeList)
      forEach(obj, function(el) { addevent(el, evname, fun); });
    else
      addevent(obj, evname, fun);
  };

  load(function() {
    var imgl = window.imagelist || imagelist,
        elements = load_elems_by_ids(elemnames),
        gallery = mk_gallery(imgl, elements),
        sidebar = doc.getElementsByClassName('sidebar')[0];

    gallery.init();
    window.instantgallery = gallery;

    gallery.onimagechange(function(num, total, imgobj) {
      elements.imginfo.innerHTML = num + "/" + total;
    });

    on_event(window, 'keydown', function(e) {
      switch(e.keyCode) {
      case 32: // Space
        toggle_sidebar(sidebar);
        break;
      case 37: // Left
        gallery.previous();
        break;
      case 39: // Right
        gallery.next();
        break;
      default:
        break;
      }
    });

    on_event(doc.getElementsByClassName('toggle_sidebar'), 'click', function(e) {
      e.preventDefault();
      toggle_sidebar(sidebar);
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
}).call(null, window, console);