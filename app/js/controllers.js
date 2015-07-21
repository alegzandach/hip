'use strict';

var viewerControllers = angular.module('viewerControllers', []);

viewerControllers.controller('ViewerCtrl', ['$scope', '$routeParams', 'STL',
  function($scope, $routeParams, STL) {
    var id = $routeParams.stlID;

    var get = STL.id.get({stlID: id});

    get.$promise.then(function(data) {
      $scope.url = data.url;
    });
  }]);

viewerControllers.controller('STLListCtrl', ['$scope', 'STL',
  function($scope, STL) {
    var get = STL.list.get();

    get.$promise.then(function(data) {
      $scope.stlFiles = data.results;
    });

  }]);

viewerControllers.controller('LoginCtrl', ['$scope','getTokenService', 'authService',
  function($scope, getTokenService, authService) {
    var fail = function(error) {
    };
    $scope.login = function() {
      return getTokenService.get($scope.username, $scope.password).
        then(function(response) {
          authService.success(response);
          $scope.$close();
        }).
        catch(fail);
    }
  }]);

viewerControllers.controller('LoginModalCtrl', ['$modal', '$scope',
  function($modal, $scope) {
    $scope.open = function() {
      return $modal.open({
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        backdrop: false
      });
    }
  }]);

viewerControllers.controller('LoginHomeCtrl', ['$scope','getTokenService', 'authService',
  function($scope, getTokenService, authService) {
    var fail = function(error) {
    };
    $scope.login = function() {
      return getTokenService.get($scope.username, $scope.password).
        then(function(response) {
          authService.success(response);
          $scope.$close();
          authService.changeLocation('/cases', false);
        }).
        catch(fail);
    }
  }]);

viewerControllers.controller('LoginHomeModalCtrl', ['$modal', '$scope',
  function($modal, $scope) {
    $scope.open = function() {
      return $modal.open({
        templateUrl: 'partials/login.html',
        controller: 'LoginHomeCtrl',
        backdrop: false
      });
    }
  }]);

viewerControllers.controller('HomeCtrl', ['$scope', 'authService', '$controller',
  function($scope, authService, $controller) {
    $controller('LoginHomeModalCtrl', {$scope: $scope, redirect: true});

    if (authService.isAuthenticated()) {
      authService.changeLocation('/cases', false);
    }
  }]);
