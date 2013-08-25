function StateList(listItems) {
  this.list = listItems;
  this.currentIndex = 0;
}

StateList.prototype.setList = function(listItems) {
  this.list = listItems;
  this.currentIndex = 0;
};

StateList.prototype.currentItem = function() {
  return this.list[this.currentIndex];
};

StateList.prototype.next = function() {
  this.setCurrentIndex(this.currentIndex + 1, 0);
  return this.currentItem();
};

StateList.prototype.setCurrentIndex = function(index, fallback) {
  if (this.isIndexOutOfBounds(index)) {
    this.currentIndex = fallback;
  } else {
    this.currentIndex = index;
  }
};

StateList.prototype.isIndexOutOfBounds = function(index) {
  return index < 0 || index > this.lastIndex();
};

StateList.prototype.lastIndex = function() {
  return this.list.length - 1;
};

StateList.prototype.previous = function() {
  this.setCurrentIndex(this.currentIndex - 1, this.lastIndex());
  return this.currentItem();
};

StateList.prototype.setCurrentItem = function(item) {
  var index = this.list.indexOf(item);
  this.setCurrentIndex(index, this.currentIndex);
};

exports.StateList = StateList;
