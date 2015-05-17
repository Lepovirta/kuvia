function StateList(listItems) {
  var self = this;
  self.list = listItems;
  self.currentIndex = 0;

  self.setList = function(listItems) {
    self.list = listItems;
    self.currentIndex = 0;
  };

  self.currentItem = function() {
    return self.list[self.currentIndex];
  };

  self.next = function() {
    setCurrentIndex(self.currentIndex + 1, 0);
    return self.currentItem();
  };

  function setCurrentIndex(index, fallback) {
    if (isIndexOutOfBounds(index)) {
      self.currentIndex = fallback;
    } else {
      self.currentIndex = index;
    }
  }

  function isIndexOutOfBounds(index) {
    return index < 0 || index > self.lastIndex();
  }

  self.lastIndex = function() {
    return self.list.length - 1;
  };

  self.previous = function() {
    setCurrentIndex(self.currentIndex - 1, self.lastIndex());
    return self.currentItem();
  };

  self.setCurrentItem = function(item) {
    var index = self.list.indexOf(item);
    setCurrentIndex(index, self.currentIndex);
  };
}

module.exports = StateList;
