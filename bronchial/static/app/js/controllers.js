'use strict';

var stentControllers = angular.module('stentControllers', []);

stentControllers.controller('AirwayListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('api/airways').success(function(data) {
      $scope.airways = data;
    });
  }]);
