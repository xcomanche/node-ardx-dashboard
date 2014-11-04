'use strict';

/**
 * @ngdoc overview
 * @name nodeArdxDashboardApp
 * @description
 * # nodeArdxDashboardApp
 *
 * Main module of the application.
 */
angular
  .module('nodeArdxDashboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/index', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .when('/control', {
            templateUrl: 'views/control.html',
            controller: 'ControlCtrl'
        })
        .when('/documentation', {
            templateUrl: 'views/documentation.html',
            controller: 'DocumentationCtrl'
        })
        .when('/contributors', {
            templateUrl: 'views/contributors.html',
            controller: 'ContributorsCtrl'
        })
      .otherwise({
        redirectTo: '/index'
      });
  });
