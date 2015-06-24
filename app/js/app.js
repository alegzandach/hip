'use strict'

var viewerApp = angular.module('viewerApp', [
  'ngRoute',
  'viewerControllers',
  'viewerServices',
  'viewerDirectives'
]);

viewerApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/stl', {
        templateUrl: 'partials/stl-list.html',
        controller: 'STLListCtrl'
      });

    $locationProvider.html5Mode(true);
  }]);
