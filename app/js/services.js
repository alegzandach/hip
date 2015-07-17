'use strict';

var viewerServices = angular.module('viewerServices', ['ngResource']);

viewerServices.factory('STL', ['$resource',
  function($resource) {
    return $resource('http://localhost:8000/api/stl/');
  }]);

viewerServices.factory('getTokenService', ['$http',
  function($http) {
    return {
      get: function(user, pass) {
        var str = 'username=' + encodeURIComponent(user) + '&password=' + encodeURIComponent(pass);
        var request = {
          method: 'post',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: 'http://localhost:8000/api-token-auth/',
          data: str
        };
        return $http(request);
      }
    }
  }]);

viewerServices.factory('sessionStorageService', [
  function() {
    return {
      set: function(key,value) {
        sessionStorage.setItem(key,value);
      },
      get: function(key) {
        return sessionStorage.getItem(key);
      },
      unset: function(key) {
        sessionStorage.removeItem(key);
      }
    };
  }]);

viewerServices.factory('authService', ['sessionStorageService', '$location', 
  function(sessionStorageService, $location) {
    var authService = {};
    
    authService.isAuthenticated = function() {
      return !!sessionStorageService.get('access_token');
    }
    authService.changeLocation = function(url, force) {
      $location.path(url);
      // $scope = $scope || angular.element(document).scope();
      // if (force || !$scope.$$phase) {
        // $scope.$apply();
      // }
    }
    authService.success = function(response) {
      var token = response.data['token'];
      sessionStorageService.set('access_token', token);
    }

    return authService;
  }]);
