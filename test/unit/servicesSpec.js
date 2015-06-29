'use strict'

describe('Viewer services', function() {
  beforeEach(module('viewerApp'));

  describe('Login', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectPOST('http://localhost:8000/api-token-auth/', 'username=admin&password=password').
        respond({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'});
      scope = $rootScope.$new();
      ctrl = $controller('LoginCtrl', {$scope: scope});
    }));

    it('should return a JWT auth token', function() {
      scope.username = 'admin';
      scope.password = 'password';
      scope.login();
      $httpBackend.flush();

    });

  });

});
