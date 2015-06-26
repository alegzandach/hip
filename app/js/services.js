'use strict';

var viewerServices = angular.module('viewerServices', ['ngResource']);

viewerServices.factory('STL', ['$resource',
  function($resource) {
    return $resource('http://localhost:8000/api/stl/');
  }]);

viewerServices.factory('Login', ['$rootScope', '$http',
  function($rootScope, $http) {
    function login(user, pass) {
      var str = 'username=' + encodeURIComponent(user) + '&password=' + encodeURIComponent(pass);
      var request = {
        method: 'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'http://localhost:8000/api-token-auth/',
        data: str
      };
      return $http(request).success(function(data, status, headers, config) {
        sessionStorage.access_token = JSON.stringify(data['token']);
      }).error(function(data, status, headers, config) {
        console.log(data);
      });
    }
    return({login: login});
  }]);

