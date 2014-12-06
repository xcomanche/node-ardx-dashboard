/**
 * Created by comanche on 06.12.14.
 */
var Common = require('../utils/common');
var STATUSES = Common.CommandStatuses;

var ProcessingStore = function (server, client) {
  this.server = server;
  this.client = client;

  this.commands = [];
};

ProcessingStore.prototype.listen = function () {
  var client = this.client;
  var me = this;
  client.on('message', function(resp){
    var response = JSON.parse(resp);

    if (response.id) {
      me.processResponseToCommand(response);
    } else {
      console.log(response);
    }
  });
};

ProcessingStore.prototype.processResponseToCommand = function (command) {
  var index = this.findById(command.id, true);
  var oldCommand = this.commands[index];

  this.commands[index] = command;
  this.commands[index].callbacks = oldCommand.callbacks;

  this.fireCallbackValidation(this.commands[index]);
};

ProcessingStore.prototype.fireCallbackValidation = function (command) {
  var status = command.status;
  if(command.callbacks[status]) {
    command.callbacks[status](command);
  }
};

ProcessingStore.prototype.sync = function () {
  var commandsToSend = this.findByStatus(STATUSES.NOT_PROCESSED);
  var server = this.server;

  commandsToSend.forEach(function(command, i) {
    server.send(JSON.stringify(command));

    command.status = STATUSES.IN_PROGRESS;
  });
};

ProcessingStore.prototype.findByStatus = function (status, shouldReturnIndex) {
  var commands = [];

  this.commands.forEach(function(command, i) {
    if (command.status === status) {
      commands.push((shouldReturnIndex) ? i : command);
    }
  });

  return commands;
};

ProcessingStore.prototype.add = function (command, withoutSync) {
  command.status = STATUSES.NOT_PROCESSED;
  command.callbacks = (command.callbacks) ? command.callbacks : {};
  this.commands.push(command);
  if (withoutSync !== false) {
    this.sync();
  }
};

ProcessingStore.prototype.findById = function (id, shouldReturnIndex) {
  var command = false;

  this.commands.forEach(function(eachCommand, i) {
    if (eachCommand.id === id) {
      command = (shouldReturnIndex) ? i : eachCommand;
      return false;
    }
  });

  return command;
};


ProcessingStore.prototype.remove = function (id) {
  var index = this.findById(id, true);

  this.commands.splice(index, 1);
};


exports = module.exports = ProcessingStore;
