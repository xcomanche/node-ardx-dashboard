'use strict';
/**
 * @ngdoc function
 * @name nodeArdxDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodeArdxDashboardApp
 */
angular.module('nodeArdxDashboardApp')
  .controller('DashboardCtrl', function ($scope, $http, messagesSocket) {
    var apiUrl = 'http://127.0.0.1:8080/api';

    $scope.objects    = {};
    $scope.devices    = {};
    $scope.steps      = {};
    $scope.stepModel  = {};
    $scope.events     = [];

    $scope.$on('socket:firmatraEvent', function (ev, data) {
      if (data.event) {
        $scope.events.push(data);
      }
    });

    refreshObjects();
    refreshWorkflow();
    refreshDevices();

    $scope.postStep   = function () {
      $http.post(apiUrl + '/step').
        success(function(data) {
          console.log('Success: ' + data);
          refreshWorkflow();
        }).
        error(function(data) {
          console.log('Fail: ' + data);
        });
    };

    $scope.updateStep   = function () {
      var body            = {};
      body.trigger        = $scope.stepModel.trigger;
      body.triggerParams  = $scope.stepModel.triggerParams;
      body.command        = $scope.stepModel.command;
      body.commandParams  = $scope.stepModel.commandParams;
      body.device         = $scope.stepModel.device;
      body.step           = $scope.stepModel.step;

      $http.put(apiUrl + '/step', body).
        success(function(data) {
          console.log('Success: ' + data);
          refreshWorkflow();
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

    function refreshWorkflow() {
      $http.get(apiUrl + '/step').
        success(function(data) {
          if (data['steps']) {
            if (Object.keys(data.steps).length) {
              $scope.steps = data.steps;
            }
          }
        }).
        error(function() {
          console.log('Something went wrong');
        });
    }

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
