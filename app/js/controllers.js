'use strict';

var viewerControllers = angular.module('viewerControllers', []);

viewerControllers.controller('STLListCtrl', ['$scope', 'STL',
  function($scope, STL) {
    var get = STL.get();

    get.$promise.then(function(data) {
      $scope.stlFiles = data.results;
    });

  }]);

viewerControllers.controller('LoginCtrl', ['$rootScope', '$scope','getTokenService', 'sessionStorageService',
  function($rootScope, $scope, getTokenService, sessionStorageService) {
    var success = function(response) {
      var token = response.data['token'];
      sessionStorageService.set('access_token', token);
      $rootScope.$broadcast('event:loginConfirmed');
      $scope.$close();
    };
    var fail = function(error) {
    };
    $scope.login = function() {
      return getTokenService.get($scope.username, $scope.password).
        then(success).
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

viewerControllers.controller('HomeCtrl', ['$rootScope', '$scope', 'sessionStorageService', '$location',
  function($rootScope, $scope, sessionStorageService, $location) {
    console.log($rootScope.loggedin);
    var changeLocation = function(url, force) {
      $location.path(url);
      $scope = $scope || angular.element(document).scope();
      if (force || !$scope.$$phase) {
        $scope.$apply();
      }
    };
    if ($rootScope.loggedin) {
      debugger;
      changeLocation('/cases', false);
    }
  }]);
