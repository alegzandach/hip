'use strict'

var viewerApp = angular.module('viewerApp', [
  'ngRoute',
  'viewerControllers',
  'viewerServices'
]);

viewerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/stl-list.html',
        controller: 'STLListCtrl'
      });
  }]);
