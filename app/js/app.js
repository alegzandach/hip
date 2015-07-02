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
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/viewer', {
        templateUrl: 'partials/viewer.html',
        controller: 'STLListCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });

    $locationProvider.html5Mode(true);
  }]);

viewerApp.config(['$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push(['$rootScope',
      function($rootScope) {
        return {
          'request': function(config) {
            if (sessionStorage.getItem('access_token')) {
              config.headers['Authorization'] = "JWT " + sessionStorage.getItem('access_token');
              console.log(config.headers);
            }
            return config;
          },
          'response': function(response) {
            return response;
          }
        };
      }]);
  }]);

viewerApp.config(['$resourceProvider',
  function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }]);
