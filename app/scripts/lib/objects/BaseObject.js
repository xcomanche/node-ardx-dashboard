/**
 * Created by comanche on 08.12.14.
 */
var Common = require('../../utils/common');
var guid = Common.guid;

var BaseObject = function(params) {
  this.id                   = guid();
  this.classParams          = params;
  this.lastCommandName      = '';
  this.lastCommandParams    = '';
  this.lastCommandCallbacks = {};
};

BaseObject.prototype.init          = function() {
  return {
    id          : this.id,
    init        : true,
    initObject  : this.className,
    initParams  : this.classParams
  };
};

BaseObject.prototype.getSerializedItem  = function() {
  return {
    id          : this.id,
    object      : this.className,
    initParams  : this.classParams,
    lastCommand : this.lastCommandName,
    lastParams  : this.lastCommandParams
  };
};

BaseObject.prototype.getId         = function() {
  return this.id;
};

BaseObject.prototype.command       = function(command, params, callbacks) {
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

exports = module.exports = BaseObject;
