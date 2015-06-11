'use strict'

/* jasmine specs for controllers go here */

describe('Stent controllers', function() {
  beforeEach(module('stentApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('AirwayListCtrl', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('AirwayListCtrl', {$scope: $scope});
    });

    it("should create an 'airways' model with 3 airways", function() {
      expect($scope.airways.length).toBe(3);
    });

  });
});
