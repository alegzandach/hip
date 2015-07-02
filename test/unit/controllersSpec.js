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
    var scope, LoginCtrl, getTokenService, sessionStorageService;

    beforeEach(inject(function($q, $rootScope, $controller, _getTokenService_, _sessionStorageService_) {
      scope = $rootScope.$new();
      LoginCtrl = $controller('LoginCtrl', {$scope: scope});
      getTokenService = _getTokenService_;
      sessionStorageService = _sessionStorageService_;
      spyOn(getTokenService, 'get').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve({'token': 'abcd.1234.xyz'});
        return deferred.promise;
      });
      spyOn(sessionStorageService, 'set');
    }));

    it('should return a function that calls the login service with scope variables', function() {
      scope['username'] = 'admin';
      scope['password'] = 'password';

      var promise = scope.login();
      expect(getTokenService.get).toHaveBeenCalledWith('admin', 'password');
    });
  });

  describe('LoginCtrl', function() {
    var scope, LoginCtrl, getTokenService, sessionStorageService, $httpBackend;

    beforeEach(inject(function($q, $rootScope, $controller, _getTokenService_, _sessionStorageService_, _$httpBackend_) {
      scope = $rootScope.$new();
      LoginCtrl = $controller('LoginCtrl', {$scope: scope});
      getTokenService = _getTokenService_;
      sessionStorageService = _sessionStorageService_;
      $httpBackend = _$httpBackend_;
      spyOn(sessionStorageService, 'set');

      $httpBackend.expectPOST('http://localhost:8000/api-token-auth/', 'username=admin&password=password').
        respond(200, {'token': 'abcd.1234.xyz'});
    }));

    it('should call the set function of sessionStorageService', function() {
      scope['username'] = 'admin';
      scope['password'] = 'password';

      var promise = scope.login();
      $httpBackend.flush();
      expect(sessionStorageService.set).toHaveBeenCalledWith('access_token', 'abcd.1234.xyz');
    });
  });

});
