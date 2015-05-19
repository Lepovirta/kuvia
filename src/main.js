(function() {
  var Gallery = require('./gallery'),
      view = require('./view'),
      Image = require('./image'),
      domtools = require('./domtools');

  function imageFactory(src, onclick) {
    return new Image(src, onclick);
  }

  var display = view.createView(),
      gallery = new Gallery(display, imageFactory);

  function loadGallery(images) {
    display.initialize();
    gallery.initialize(images);
    window.instantgallery = gallery;
  }

  function loadAjaxGallery(url) {
    domtools.ajax({
      url: url,
      callback: function(xhr) {
        var images = xhr.status === 200 ? JSON.parse(xhr.responseText) : [];
        loadGallery(images);
      }
    });
  }

  domtools.onLoad(function() {
    var images = window.imagelist;

    if (typeof images === 'string') {
      loadAjaxGallery(images);
    } else if (images && images.length > 0) {
      loadGallery(images);
    } else {
      loadGallery([]);
    }
  });
}());
