'use strict';

describe('Viewer controllers', function() {

  beforeEach(module('viewerApp'));
  
  describe('STLListCtrl', function()  {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost:8000/api/stl/').
        respond({"count": 1, "results":[{"stl":"urlstring"}]});

      scope = $rootScope.$new();
      ctrl = $controller('STLListCtrl', {$scope: scope});
    }));

    it('should get a count of stl files and an array of results', function() {
      // expect(scope.stlFiles).toEqualData([]);
      $httpBackend.flush();

      expect(scope.stlFiles).toEqual(
          [{"stl":"urlstring"}]);
    });
  });

  describe('LoginCtrl', function() {
    var scope, ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('LoginCtrl', {$scope: scope});
    }));

    it('should return a function that calls the login service with scope variables', function() {
      expect(scope.login).toEqual(jasmine.any(Function));
      expect(scope.login.toString()).toMatch(/function \(\){.*?;Login.login\(\$scope\.username,\$scope\.password\);}/);
    });
  });

});
