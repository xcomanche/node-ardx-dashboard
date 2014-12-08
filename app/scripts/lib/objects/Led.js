/**
 * Created by comanche on 06.12.14.
 */
var BaseObject = require('./BaseObject');

LED.prototype = new BaseObject();
LED.prototype.constructor=LED;

function LED(name, params) {
  BaseObject.call(this, name, params);
}

LED.prototype.className     = 'Led';
LED.prototype.methods    = {
  'on'    : {},
  'off'   : {},
  'strobe': {
    params    : [{
      'type': 'int',
      'min' : 1,
      'max' : 1000
    }]
  },
  'stop'      : {},
  'fade'      : {},
  'fadeIn'    : {},
  'fadeOut'   : {},
  'pulse'     : {},
  'brightness': {
    params  : [{
      'type': 'int',
      'min' : 0,
      'max' : 255
    }]
  },
  'toggle': {}
};

exports = module.exports = LED;
