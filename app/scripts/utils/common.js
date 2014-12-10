/**
 * Created by comanche on 07.12.14.
 */
/****
 * 0 - not processed
 * 1 - in progress
 * 2 - processed without errors. Response not received
 * 3 - processed without errors. Response received
 * 4 - processed with errors
 * 5 - Other
 * 6 - completed. For callback methods
 */

var Common = {};

Common.CommandStatuses = {
  NOT_PROCESSED                   : 0,
  IN_PROGRESS                     : 1,
  PROCESSED_RESPONSE_NOT_RECEIVED : 2,
  PROCESSED_RESPONSE_RECEIVED     : 3,
  PROCESSED_WITH_ERRORS           : 4,
  OTHER                           : 5,
  COMPLETED                       : 6
};

Common.guid = (function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };
})();

Common.sleep = function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};

exports = module.exports = Common;
