(function(window) {
  var Gallery = require('./gallery').Gallery,
      view = require('./instantgalleryview'),
      image = require('./image'),
      domtools = require('./domtools');

  var dt = new domtools.DomTools(window),
      factory = image.imageFactory(window),
      display = view.createView(window),
      gallery = new Gallery(display, factory);

  function showError() {
    display.showNoImagesWarning();
  }

  function loadGallery(images) {
    display.initialize();
    gallery.initialize(images);
    window.instantgallery = gallery;
  }

  dt.onLoad(function() {
    var images = window.imagelist;

    if (typeof images === 'string') {
      domtools.ajax({
        url: images,
        callback: function(xhr) {
          if (xhr.status === 200) {
            loadGallery(JSON.parse(xhr.responseText));
          } else {
            showError();
          }
        }
      });
    } else if (images && images.length > 0) {
      loadGallery(images);
    } else {
      showError();
    }
  });
}).call(null, window);
