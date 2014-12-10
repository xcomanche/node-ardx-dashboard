/**
 * Created by comanche on 06.12.14.
 */
var BaseObject = require('./BaseObject');

Servo.prototype = new BaseObject();
Servo.prototype.constructor=Servo;

function Servo(name, params) {
  BaseObject.call(this, name, params);
}

Servo.prototype.className = 'Servo';
Servo.prototype.methods   = {
  'to'    : {
    params : [{
      name  : 'degrees',
      type  : 'int',
      min   : 0,
      max   : 180
    }, {
      name  : 'time',
      type  : 'int',
      min   : 0,
      max   : 50000
    }]
  },
  'step'   : {
    params : [{
      name  : 'degrees',
      type  : 'int',
      min   : 0,
      max   : 180
    }, {
      name  : 'time',
      type  : 'int',
      min   : 0,
      max   : 50000
    }]
  },
  'move': {
    params : [{
      name  : 'degrees',
      type  : 'int',
      min   : 0,
      max   : 180
    }, {
      name  : 'time',
      type  : 'int',
      min   : 0,
      max   : 50000
    }]
  },
  center  : {},
  stop    : {},
  sweep   : {}
};
Servo.prototype.events    = [
  'move:complete',
  'sweep:half',
  'sweep:full'
];

exports = module.exports = Servo;
