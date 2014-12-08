/**
 * Created by comanche on 07.12.14.
 */
var J5Loader = function () {
  var me = this;
  me.items = {};
  [
    "Led",
    "Pir"
  ].forEach(function(constructor) {
      me.add(constructor, require(
        "./objects/" + constructor.toLowerCase()
      ));
    });
};

J5Loader.prototype.add = function (name, object) {
  if (!this.items[name]) {
    this.items[name] = object;
  }
};

J5Loader.prototype.getItems = function () {
  return this.items;
};

J5Loader.prototype.getItemsForSerialization = function () {
  var items = {};

  for (name in this.items) {
    items[name] = {
      'methods' : this.items[name]['prototype']['methods'],
      'events'  : this.items[name]['prototype']['events']
    };
  }

  return items;
};

module.exports = new J5Loader();
