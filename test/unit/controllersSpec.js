'use strict';

describe('Viewer controllers', function() {

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('viewerApp'));
  
  describe('STLListCtrl', function()  {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('api/stl').
        respond({"count": 1, "results":[{"stl":"urlstring"}]});

      scope = $rootScope.$new();
      ctrl = $controller('STLListCtrl', {$scope: scope});
    }));

    it('should get a count of stl files and an array of results', function() {
      // expect(scope.stlFiles).toEqualData([]);
      $httpBackend.flush();

      expect(scope.stlFiles).toEqualData(
          {"count": 1, "results":[{"stl":"urlstring"}]});
    });
  });

});
