'use strict';

var stentApp = angular.module('stentApp', []);

stentApp.controller('AirwayListCtrl', function($scope) {
  $scope.airways= [
    {'name': 'Airway1'},
    {'name': 'Airway2'},
    {'name': 'Airway3'}
  ]
});
