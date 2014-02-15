(function(window) {
  var Gallery = require('./gallery').Gallery,
      view = require('./instantgalleryview'),
      image = require('./image'),
      DomTools = require('./domtools').DomTools;

  var dt = new DomTools(window),
      factory = image.imageFactory(window),
      display = view.createView(window),
      gallery = new Gallery(display, factory);

  dt.onLoad(function() {
    var images = window.imagelist;

    if (images && images.length > 0) {
      display.initialize();
      gallery.initialize(images);
      window.instantgallery = gallery;
    } else {
      display.showNoImagesWarning();
    }
  });
}).call(null, window);
