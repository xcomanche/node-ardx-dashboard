/**
 * Created by comanche on 06.12.14.
 */
var Common = require('../utils/common');

var DevicesStore = function () {
  this.devices = [];
};

DevicesStore.prototype.getItems = function () {
  return this.devices;
};

DevicesStore.prototype.add = function (device) {
  this.devices.push(device);
};

DevicesStore.prototype.findById = function (id, shouldReturnIndex) {
  var device = false;

  this.devices.forEach(function(each, i) {
    if (each.id === id) {
      device = (shouldReturnIndex) ? i : each;
      return false;
    }
  });

  return device;
};

DevicesStore.prototype.getItemsForSerialization = function () {
  var items = {};

  this.getItems().forEach(function(item){
    items[item.id] = item.getSerializedItem();
  });

  return items;
};

DevicesStore.prototype.remove = function (id) {
  var index = this.findById(id, true);

  this.devices.splice(index, 1);
};


exports = module.exports = DevicesStore;
