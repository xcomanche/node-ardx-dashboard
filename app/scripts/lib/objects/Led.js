/**
 * Created by comanche on 06.12.14.
 */
var Common = require('../../utils/common');
var guid = Common.guid;


var LED = function(params) {
  this.id                   = guid();
  this.classParams          = params;
  this.lastCommandName      = '';
  this.lastCommandParams    = '';
  this.lastCommandCallbacks = {};
};

LED.prototype.className     = 'Led';
LED.prototype.init          = function() {
  return {
    id          : this.id,
    init        : true,
    initObject  : this.className,
    initParams  : this.classParams
  };
};

LED.prototype.getSerializedItem  = function() {
  return {
    id          : this.id,
    object      : this.className,
    initParams  : this.classParams,
    lastCommand : this.lastCommandName,
    lastParams  : this.lastCommandParams
  };
};

LED.prototype.getId         = function() {
  return this.id;
};

LED.prototype.command       = function(command, params, callbacks) {
  if (!(command in this.methods)) {
    throw 'Command not found!';
  }

  if (typeof(params) === Array) {
    params = params.join('|');
  }

  this.lastCommandName      = command;
  this.lastCommandParams    = params;
  this.lastCommandCallbacks = callbacks;

  return {
    id        : this.id,
    command   : command,
    params    : params,
    callbacks : callbacks
  };
};

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
