'use strict';

var viewerApp = angular.module('viewerApp', [
  'ngRoute',
  'viewerControllers',
  'viewerServices',
  'viewerDirectives',
  'ui.bootstrap'
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
      when('/viewer/:stlID', {
        templateUrl:'partials/viewer.html',
        controller: 'ViewerCtrl'
      }).
      when('/cases', {
        templateUrl: 'partials/cases.html',
        controller: 'STLListCtrl'
      }).
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });

    $locationProvider.html5Mode(true);
  }]);

viewerApp.config(['$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push(['$rootScope', '$q', '$injector', '$controller',
      function($rootScope, $q, $injector, $controller) {
        return {
          'request': function(config) {
            if (sessionStorage.getItem('access_token')) {
              config.headers['Authorization'] = "Token " + sessionStorage.getItem('access_token');
            }
            return config;
          },
          'response': function(response) {
            return response;
          },
          'responseError': function(response) {
            if (response.status == 401) {
              $controller('LoginModalCtrl', {$scope: $rootScope});              
              var $http = $injector.get('$http');
              var deferred = $q.defer();
              $rootScope.open().result.
                then(deferred.resolve);;
              
              return deferred.promise.then(function() {
                return $http(response.config);
              });
            }
            return $q.reject(response);
          }
        };
      }]);
  }]);

viewerApp.config(['$resourceProvider',
  function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }]);
