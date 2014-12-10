/**
 * Created by comanche on 10.12.14.
 */
/**
 * Created by comanche on 06.12.14.
 */
var Common = require('../utils/common');

var BaseStore = function () {
  this.items = [];
};

BaseStore.prototype.getItems = function () {
  return this.items;
};

BaseStore.prototype.add = function (item) {
  this.items.push(item);
};

BaseStore.prototype.findBy = function (paramName, paramValue, shouldReturnIndex) {
  var item = false;

  this.items.forEach(function(each, i) {
    if (each[paramName] === paramValue) {
      item = (shouldReturnIndex) ? i : each;
      return false;
    }
  });

  return item;
};

BaseStore.prototype.findById = function (id, shouldReturnIndex) {
  return this.findBy('id', id, shouldReturnIndex);
};

BaseStore.prototype.serialize = function () {
  var items = {};

  this.getItems().forEach(function(item){
    items[item.id] = item.serialize();
  });

  return items;
};

BaseStore.prototype.remove = function (id) {
  var index = this.findById(id, true);

  this.items.splice(index, 1);
};


exports = module.exports = BaseStore;
