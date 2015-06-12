'use strict'

/* jasmine specs for controllers go here */
describe('Stent controllers', function() {
  describe('AirwayListCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(module('stentApp'));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('api/airways').
        respond({"count": 1,"results":[{"stl":"urlstring"}]});

      scope = $rootScope.$new();
      ctrl = $controller('AirwayListCtrl', {$scope: scope});
    }));

    it("should create an 'airways' model with 2 airways", function() {
      expect(scope.airways).toBeUndefined();
      $httpBackend.flush();

      expect(scope.airways).toEqual({"count": 1,"results":[{"stl":"urlstring"}]});
    });

  });
});
