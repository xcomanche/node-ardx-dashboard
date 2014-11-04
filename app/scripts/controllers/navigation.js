'use strict';

/**
 * @ngdoc function
 * @name nodeArdxDashboardApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the nodeArdxDashboardApp menu
 */
angular.module('nodeArdxDashboardApp')
    .controller('NavigationCtrl', function ($scope, $location) {
        $scope.getActiveClass = function(page) {
            var current = $location.path().substring(1);
            return page === current ? 'active' : '';
        };

        $scope.getCurrentPageTitle = function() {
            var current = $location.path().substring(1);
            var title   = '';

            $scope.links.forEach(function(link) {
                if (link.url === current) {
                    title = link.pageTitle;
                }
            });

            return title;
        };

        $scope.links = [{
            url         : 'index',
            icon        : 'fa-dashboard',
            title       : 'Dashboard',
            pageTitle   : 'Dashboard Page'
        }, {
            url         : 'control',
            icon        : 'fa-bar-chart-o',
            title       : 'Contol Center',
            pageTitle   : 'Control Center Page'
        }, {
            url         : 'documentation',
            icon        : 'fa-files-o',
            title       : 'Documentation',
            pageTitle   : 'Documentation Page'
        }, {
            url         : 'contributors',
            icon        : 'fa-sitemap',
            title       : 'Contibutors',
            pageTitle   : 'Contributors Page'
        }];
    });