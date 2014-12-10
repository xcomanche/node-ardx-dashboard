'use strict';

/**
 * @ngdoc function
 * @name nodeArdxDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodeArdxDashboardApp
 */
angular.module('nodeArdxDashboardApp')
  .controller('ControlCtrl', function($scope, $http, messagesSocket) {

    var apiUrl = 'http://127.0.0.1:8080/api';
    $scope.objects  = {};
    $scope.devices  = {};
    $scope.steps    = {};
    $scope.events   = [];
    $scope.objModel = {};
    $scope.devModel = {};

    $scope.$on('socket:firmatraEvent', function (ev, data) {
      if (data.event) {
        $scope.events.push(data);
      }
    });

    refreshObjects();
    refreshDevices();

    $scope.postDevice = function (objectName) {
      var body        = {};
      body.name       = $scope.objModel.name;
      body.objectName = objectName;
      body.params     = $scope.objModel.params;

      $http.post(apiUrl + '/device', body).
        success(function(data) {
          console.log('Success: ' + data);
          refreshDevices();
        }).
        error(function(data) {
          console.log('Fail: ' + data);
        });
    };

    $scope.putDevice = function (id) {
      var body    = {};
      body.id     = id;
      body.params = $scope.devModel.params;
      body.command= $scope.devModel.command;

      $http.put(apiUrl + '/device', body).
        success(function(data) {
          console.log('Success: ' + data);
        }).
        error(function(data) {
          console.log('Fail: ' + data);
        });
    };

    function refreshObjects () {
      $http.get(apiUrl + '/object').
        success(function(data) {
          if (data['objects']) {
            $scope.objects = JSON.parse(data.objects);
          }
        }).
        error(function() {
          console.log('Something went wrong');
        });
    }

    function refreshDevices () {
      $http.get(apiUrl + '/device').
        success(function(data) {
          if (data['devices']) {
            $scope.devices = data.devices;
          }

        }).
        error(function() {
          console.log('Something went wrong');
        });
    }
  });


