'use strict';

/**
 * @ngdoc function
 * @name nodeArdxDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodeArdxDashboardApp
 */
angular.module('nodeArdxDashboardApp')
  .controller('ControlCtrl', function($scope, $http) {
    $scope.objects  = {};
    $scope.devices  = {};
    $scope.messages = {};
    $scope.objModel = {};
    $scope.devModel = {};


    refreshObjects()
    refreshDevices();

    $scope.postDevice = function (objectName) {
      var body    = {};
      body.name   = objectName;
      body.params = $scope.objModel.params;
      body.init   = $scope.objModel.init;

      $http.post('http://localhost:8080/api/device', body).
        success(function(data, status, headers, config) {
          console.log('Success: ' + data);
          refreshDevices();
        }).
        error(function(data, status, headers, config) {
          console.log('Fail: ' + data);
        });
    };

    $scope.putDevice = function (id) {
      var body    = {};
      body.id     = id;
      body.params = $scope.devModel.params;
      body.command= $scope.devModel.command;

      $http.put('http://localhost:8080/api/device', body).
        success(function(data, status, headers, config) {
          console.log('Success: ' + data);
        }).
        error(function(data, status, headers, config) {
          console.log('Fail: ' + data);
        });
    };

    function refreshObjects () {
      $http.get('http://localhost:8080/api/object').
        success(function(data, status, headers, config) {
          if (data['objects']) {
            $scope.objects = JSON.parse(data.objects);
          }
        }).
        error(function(data, status, headers, config) {
          console.log('Something went wrong');
        });
    };

    function refreshDevices () {
      $http.get('http://localhost:8080/api/device').
        success(function(data, status, headers, config) {
          if (data['devices']) {
            $scope.devices = data.devices;
          }

        }).
        error(function(data, status, headers, config) {
          console.log('Something went wrong');
        });
    }
  });


