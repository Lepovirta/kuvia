function StateList(listItems, hashFunction) {
  const self = this;
  self.currentIndex = 0;
  const isHashAvailable = typeof hashFunction === 'function';

  function isIndexOutOfBounds(index) {
    return Number.isNaN(index) || index < 0 || index > self.lastIndex();
  }

  function isValidIndex(index) {
    return typeof index === 'number' && !isIndexOutOfBounds(index);
  }

  function updateCurrentKey() {
    if (isHashAvailable) {
      const item = self.currentItem();
      if (item) {
        self.currentKey = hashFunction(item);
      }
    }
  }

  function setIndex(index, fallback) {
    if (isValidIndex(index)) {
      self.currentIndex = index;
    } else {
      self.currentIndex = isValidIndex(fallback) ? fallback : 0;
    }
    updateCurrentKey();
    return self.currentItem();
  }

  function refreshKeyIndex() {
    self.indexByKey = Object.create(null);
    if (isHashAvailable) {
      self.list.forEach((item, index) => {
        const key = hashFunction(item);
        self.indexByKey[key] = index;
      });
    }
  }

  function getByKey(key) {
    if (!isHashAvailable) {
      throw new Error('Can\'t get by ID. No hash function set for state list!');
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

  self.setList = (items) => {
    self.list = items;
    setIndex(0, 0);
    refreshKeyIndex();
  };

  self.currentItem = () => self.list[self.currentIndex];

  self.next = () => setIndex(self.currentIndex + 1, 0);

  self.lastIndex = () => self.list.length - 1;

  self.previous = () => setIndex(self.currentIndex - 1, self.lastIndex());

  self.setCurrentItem = (item) => {
    const index = getByItem(item);
    return self.setCurrentIndex(index);
  };

  self.setCurrentId = (id) => {
    const index = getByKey(id);
    return self.setCurrentIndex(index);
  };

  self.setCurrentIndex = (index) => setIndex(index, self.currentIndex);

  self.removeItem = (item) => {
    const index = getByItem(item);
    if (typeof index === 'number') {
      return removeByIndex(index);
    }
    return null;
  };

  // init
  self.setList(listItems);
}

module.exports = StateList;
