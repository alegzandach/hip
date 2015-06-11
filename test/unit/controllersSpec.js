'use strict'

/* jasmine specs for controllers go here */

describe('Stent controllers', function() {

  describe('AirwayListCtrl', function() {

    beforeEach(module('stentApp'));

    it("should create an 'airways' model with 3 airways", inject(function($controller) {
      var scope = {},
        ctrl = $controller('AirwayListCtrl', {$scope:scope});

      expect(scope.airways.length).toBe(3);
    }));

  });
});
