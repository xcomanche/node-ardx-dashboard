/**
 * Created by comanche on 06.12.14.
 */
var BaseObject = require('./BaseObject');

PIR.prototype = new BaseObject();
PIR.prototype.constructor=PIR;

function PIR() {

}

PIR.prototype.className     = 'Pir';
PIR.prototype.methods    = {
};
PIR.prototype.events    = {
  'motionstart' : function() {},
  'motionend'   : function() {},
  'calibrated'  : function() {}
};

exports = module.exports = PIR;
