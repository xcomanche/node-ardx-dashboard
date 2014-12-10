/**
 * Created by comanche on 10.12.14.
 */
var Common = require('../utils/common');
var guid = Common.guid;

var Step = function(name) {
  this.id       = guid();
  this.name     = name;
  this.triggers = {};
  this.commands = [];
};

Step.prototype.events = ['step:started', 'step:finished'];

Step.prototype.addTrigger = function(trigger, value) {
  value = (value) ? value : true;
  this.triggers[trigger] = value;
};

Step.prototype.addCommand = function(device, command, params) {
  if (device.id) {
    this.commands.push({device: device, command: command, params: params});
  } else {
    console.log('Error. Device should be initialized');
  }
};

Step.prototype.shouldBeExecuted = function(event, id) {
  return (this.triggers[event] == id);
};

Step.prototype.getTriggers = function() {
  return this.triggers;
};

Step.prototype.getCommands = function() {
  return this.commands;
};

Step.prototype.execute = function(processingStore) {
  this.commands.forEach(function(complexCommand) {
    processingStore.add(complexCommand.device.command(complexCommand.command, complexCommand.params));
  });
};

Step.prototype.serialize = function() {
  return {
    id       : this.id,
    name     : this.name,
    triggers : this.triggers,
    commands : this.commands,
    events   : this.events
  }
};

exports = module.exports = Step;
