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
    $scope.workflowEnabled = {};
    $scope.subscribeEvents = [
      'Manual',
      'step:started',
      'step:completed',
      'motionstart',
      'motionend',
      'sweep:full',
      'sweep:half'
    ];
    $scope.events     = [];

    $scope.$on('socket:firmatraEvent', function (ev, data) {
      if (data.event) {
        $scope.events.push(data);
      }
    });

    refreshObjects();
    refreshWorkflow();
    refreshDevices();
    getWorkflowStatus();

    $scope.getWorkflow   = function () {
      $http.post(apiUrl + '/step').
        success(function(data) {
          console.log('Success: ' + data);
          refreshWorkflow();
        }).
        error(function(data) {
          console.log('Fail: ' + data);
        });
    };

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

    $scope.runStep    = function (id) {

      $http.post(apiUrl + '/runStep', {id:id}).
        success(function(data) {
          console.log('Success: ' + data);
          refreshWorkflow();
        }).
        error(function(data) {
          console.log('Fail: ' + data);
        });
    };

    $scope.removeStep    = function (id) {

      $http.post(apiUrl + '/removeStep', {id:id}).
        success(function(data) {
          console.log('Success: ' + data);
          refreshWorkflow();
        }).
        error(function(data) {
          console.log('Fail: ' + data);
        });
    };

    $scope.toogleWorkflow = function () {
      $http.post(apiUrl + '/enableWorkflow', {enable:!$scope.workflowEnabled}).
        success(function(data) {
          console.log('Success: ' + data);
          getWorkflowStatus();
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

    function getWorkflowStatus() {
      $http.get(apiUrl + '/enableWorkflow').
        success(function(data) {
          $scope.workflowEnabled = data['enabled'];
        }).
        error(function() {
          console.log('Something went wrong');
        });
    }

    function refreshWorkflow() {
      $http.get(apiUrl + '/step').
        success(function(data) {
          if (data['steps']) {
            if (Object.keys(data.steps).length) {
              $scope.steps = data.steps;
            } else {
              $scope.steps = {};
            }
          } else {
            $scope.steps = {};
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
