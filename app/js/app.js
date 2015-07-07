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

/**
 * On 401 response, this stores the request in requests401 and broadcasts 'event:loginReequired'.
 */
viewerApp.config(['$httpProvider',
  function($httpProvider) {
    var interceptor = ['$rootScope', '$q', function($rootScope, $q) {
      function success(response) {
        return response;
      }

      function error(response) {
        var status = response.status;

        if (status === 401) {
          var deferred = $q.defer();
          var req = {
            config: response.config,
            deferred: deferred
          };

          $rootScope.requests401.push(req);
          $rootScope.$broadcast('event:loginRequired');
          return deferred.promise;
        }

        return $q.reject(response);
      }
    }];
  }]);

viewerApp.config(['$resourceProvider',
  function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }]);

/**
 * Holds the requests which failed due to 401 response.
 */
viewerApp.run(['$rootScope', '$http', function($rootScope, $http) {
  $rootScope.requests401 = [];

  $rootScope.$on('event:loginConfirmed', function() {
    var requests = $rootScope.requests401;

    for (var i = 0; i < requests.length; i++) {
      retry(requests[i]);
    }
    $rootScope.requests401 = [];

    function retry(req) {
      $http(req.config).then(function(response) {
        req.deferred.resolve(response);
      });
    }
  });
}])
