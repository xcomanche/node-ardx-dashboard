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
var Led             = require('./app/scripts/models/Led');
var Common          = require('./app/scripts/utils/common');

var store = new ProcessingStore(server, client);

server.bindSync('tcp://127.0.0.1:3001');
console.log('Radiostation connected to port 3001');

client.connect('tcp://127.0.0.1:3000');
console.log('Listener connected to port 3000');

store.listen();

// configuration =================

mongoose.connect('mongodb://node-ardx-dashboard:a21tdEMAbeos@proximus.modulusmongo.net:27017/i5Soqosy');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/app/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);

app.post('/api/addDevice', function(req, res) {
  console.log(req, res);
});

app.get('/api/device', function(req, res) {
  var led = new Led(9);
  var led2 = new Led(10);

  store.add(led.init());
  store.add(led2.init());

  var callbacks = {};
  callbacks[Common.CommandStatuses.PROCESSED_RESPONSE_RECEIVED] = function (response) {
    console.log('Processed');
  };
  callbacks[Common.CommandStatuses.COMPLETED] = function (response) {
    console.log('COMPLETED Callback Fired!!!');
    console.log(response);
  };
  store.add(led.command('on', '', callbacks));

  res.json({'device':'hey'});
});



