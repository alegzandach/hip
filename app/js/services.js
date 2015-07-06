'use strict';

var viewerServices = angular.module('viewerServices', ['ngResource']);

viewerServices.factory('STL', ['$resource',
  function($resource) {
    var yo = $resource('http://localhost:8000/api/stl/');
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



