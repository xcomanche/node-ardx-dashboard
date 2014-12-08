/**
 * Created by comanche on 06.12.14.
 */
var BaseObject = require('./BaseObject');

PIR.prototype = new BaseObject();
PIR.prototype.constructor=PIR;

function PIR(name, params) {
  BaseObject.call(this, name, params);
}

PIR.prototype.className = 'Pir';
PIR.prototype.methods   = {};
PIR.prototype.events    = [
  'motionstart',
  'motionend',
  'calibrated'
];

exports = module.exports = PIR;
