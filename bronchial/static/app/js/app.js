'use strict';

/* App Module */
var stentApp = angular.module('stentApp', [
  'ngRoute',
  'stentControllers'
]);

stentApp.config(['$routeProvider',
  function($routeProvider) {
    console.log
    $routeProvider.
      when('/airways', {
        templateUrl: 'static/app/partials/airway-list.html',
        controller: 'AirwayListCtrl'
      }).
      otherwise({
        redirectTo: '/airways'
      });
  }]);
