'use strict';

var viewerControllers = angular.module('viewerControllers', []);

viewerControllers.controller('STLListCtrl', ['$scope', 'STL',
  function($scope, STL) {
    var get = STL.get();

    get.$promise.then(function(data) {
      $scope.stlFiles = data.results;
    });

  }]);

viewerControllers.controller('LoginCtrl', ['$scope','getTokenService',
  function($scope, getTokenService) {
    $scope.login = function() {
      getTokenService.get($scope.username, $scope.password);
    }
  }]);
