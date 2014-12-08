/**
 * Created by comanche on 19.11.14.
 */
// set up ========================
var express         = require('express');
var zmq             = require('zmq'),
    server          = zmq.socket('push'),
    client          = zmq.socket('pull');
var app             = express();                               // create our app w/ express
var mongoose        = require('mongoose');                     // mongoose for mongodb
var morgan          = require('morgan');             // log requests to the console (express4)
var bodyParser      = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride  = require('method-override'); // simulate DELETE and PUT (express4)
var ProcessingStore = require('./app/scripts/stores/ProcessingStore');
var DevicesStore    = require('./app/scripts/stores/DevicesStore');
var j5loader        = require('./app/scripts/lib/j5loader');
var Common          = require('./app/scripts/utils/common');

var processingStore = new ProcessingStore(server, client);
var devicesStore    = new DevicesStore();
var allowCrossDomain= function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};


server.bindSync('tcp://127.0.0.1:3001');
console.log('Radiostation connected to port 3001');

client.connect('tcp://127.0.0.1:3000');
console.log('Listener connected to port 3000');

processingStore.listen();

// configuration =================

mongoose.connect('mongodb://node-ardx-dashboard:a21tdEMAbeos@proximus.modulusmongo.net:27017/i5Soqosy');     // connect to mongoDB database on modulus.io

app.use(allowCrossDomain);
app.use(express.static(__dirname + '/app/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
  console.log('Express Started');
});

app.get('/api/object', function(req, res) {
  res.json({'objects': JSON.stringify(j5loader.getItemsForSerialization())});
});

app.get('/api/device', function(req, res) {
  res.json({'devices': devicesStore.getItemsForSerialization()});
});

app.get('/api/device/:id', function(req, res) {
  var id = req.param("id");
  var led = new Led(9);

  processingStore.add(led.init());

  var callbacks = {};
  callbacks[Common.CommandStatuses.PROCESSED_RESPONSE_RECEIVED] = function (response) {
    console.log('Processed');
  };
  callbacks[Common.CommandStatuses.COMPLETED] = function (response) {
    console.log('COMPLETED Callback Fired!!!');
    console.log(response);
  };
  processingStore.add(led.command('on', '', callbacks));

  res.json({'device':'hey'});
});

app.post('/api/device', function(req, res) {
  var items       = j5loader.getItems();
  var objectName  = req.body.name;
  var params      = req.body.params;
  var init        = req.body.init;

  if (!Boolean(items[objectName])) {
    res.json({
      status: 'error',
      code  : 'Object not found',
      msg   : ''
    });

    return false;
  }

  try {
    var device = new items[objectName](params);
  } catch (err) {
    res.json({
      status: 'error',
      code  : 'Unknown error',
      msg   : err.message
    });

    return false;
  }

  devicesStore.add(device);

  if (init) {
    processingStore.add(device.init());
    res.json({'status': 'initialized', 'id':device.id});

    return true;
  }

  res.json({'status': 'added', 'id':device.id});

  return true;
});

app.put('/api/device', function(req, res) {
  var id          = req.body.id;
  var params      = req.body.params;
  var command     = req.body.command;
  var device      = devicesStore.findById(id);

  processingStore.add(device.command(command, params));

  res.json({'status': 'command_send', 'id':device.id});

  return true;
});




