var forEach = function(obj, cb) {
  for (var i = 0; i < obj.length; i++) {
    cb(obj[i], i, obj);
  }
};

var mapForKeys = function(items, cb) {
  var obj = {};
  forEach(items, function(item) {
    obj[item] = cb(item);
  });
  return obj;
};

exports.forEach = forEach;
exports.mapForKeys = mapForKeys;
