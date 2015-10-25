function StateList(listItems, hashFunction) {
  var self = this;
  self.currentIndex = 0;
  var isHashAvailable = typeof hashFunction === 'function';

  self.setList = function(items) {
    self.list = items;
    setIndex(0, 0);
    refreshKeyIndex();
  };

  function setIndex(index, fallback) {
    if (isValidIndex(index)) {
      self.currentIndex = index;
    } else {
      self.currentIndex = isValidIndex(fallback) ? fallback : 0;
    }
    updateCurrentKey();
    return self.currentItem();
  }

  function isValidIndex(index) {
    return typeof index === 'number' && !isIndexOutOfBounds(index);
  }

  function isIndexOutOfBounds(index) {
    return isNaN(index) || index < 0 || index > self.lastIndex();
  }

  function refreshKeyIndex() {
    self.indexByKey = Object.create(null);
    if (isHashAvailable) {
      self.list.forEach(function(item, index) {
        var key = hashFunction(item);
        self.indexByKey[key] = index;
      });
    }
  }

  function updateCurrentKey() {
    if (isHashAvailable) {
      var item = self.currentItem();
      if (item) {
        self.currentKey = hashFunction(item);
      }
    }
  }

  function getByKey(key) {
    if (!isHashAvailable) {
      throw 'Can\'t get by ID. No hash function set for state list!';
    }
    return self.indexByKey[key];
  }

  function getByItem(item) {
    return getByKey(hashFunction(item));
  }

  function removeByIndex(index) {
    self.list.splice(index, 1);
    refreshKeyIndex();
    return setIndex(self.currentIndex, self.lastIndex());
  }

  self.currentItem = function() {
    return self.list[self.currentIndex];
  };

  self.next = function() {
    return setIndex(self.currentIndex + 1, 0);
  };

  self.lastIndex = function() {
    return self.list.length - 1;
  };

  self.previous = function() {
    return setIndex(self.currentIndex - 1, self.lastIndex());
  };

  self.setCurrentItem = function(item) {
    var index = getByItem(item);
    return self.setCurrentIndex(index);
  };

  self.setCurrentId = function(id) {
    var index = getByKey(id);
    return self.setCurrentIndex(index);
  };

  self.setCurrentIndex = function(index) {
    return setIndex(index, self.currentIndex);
  };

  self.removeItem = function(item) {
    var index = getByItem(item);
    if (typeof index === 'number') {
      return removeByIndex(index);
    }
  };

  // init
  self.setList(listItems);
}

module.exports = StateList;
