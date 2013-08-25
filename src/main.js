(function(window, console) {
  var Gallery = require('./gallery').Gallery,
      view = require('./instantgalleryview'),
      image = require('./image'),
      DomTools = require('./domtools').DomTools;

  var dt = new DomTools(window),
      factory = image.imageFactory(window),
      display = view.createView(window),
      gallery = new Gallery(display, factory);

  dt.onLoad(function() {
    display.initialize();
    gallery.initialize(window.imagelist);
    window.instantgallery = gallery;
  });
}).call(null, window, console);
