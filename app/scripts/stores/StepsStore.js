/**
 * Created by comanche on 06.12.14.
 */
var BaseStore = require('./BaseStore');

StepsStore.prototype = new BaseStore();
StepsStore.prototype.constructor=StepsStore;

function StepsStore(processingStore) {
  BaseStore.call(this);
  this.workflowEnabled = false;
  this.processingStore = processingStore;
  this.events = {};
}

StepsStore.prototype.enable = function() {
  this.workflowEnabled = true;
};

StepsStore.prototype.disable = function() {
  this.workflowEnabled = false;
};

StepsStore.prototype.fireEvent = function (event, params) {
  var me = this;
  if (!me.workflowEnabled) {
    return false;
  }

  this.items.forEach(function(step){
    if(step.shouldBeExecuted(event, params.id)) {
      me.executeStep(step.id);
    }
  });
};

StepsStore.prototype.executeStep = function (id) {
  var step = this.findById(id);
  var serialized =  step.serialize();
  console.log('Started execution for step: ' + step.name);
  this.io.sockets.emit('step:started', serialized);
  step.execute(this.processingStore);
  this.io.sockets.emit('step:completed', serialized);
  console.log('Completed execution for step: ' + step.name);
  this.fireEvent('step:completed', step)
};

exports = module.exports = StepsStore;
