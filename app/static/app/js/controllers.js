'use strict';

var stentApp = angular.module('stentApp', []);

stentApp.controller('AirwayListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('api/airways').success(function(data) {
    $scope.airways = data;
  });
}]);
