'use strict'

describe('Viewer services', function() {
  beforeEach(module('viewerApp'));

  describe('getTokenService', function() {
    var getTokenService, $httpBackend;

    beforeEach(inject(function(_getTokenService_, _$httpBackend_) {
      getTokenService = _getTokenService_;

      $httpBackend = _$httpBackend_;
      $httpBackend.expectPOST('http://localhost:8000/api-token-auth/', 'username=admin&password=password').
        respond({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'});
    }));

    it('should return a JWT auth token when called with a username and password', function() {
      var token = getTokenService('admin', 'password');
      $httpBackend.flush();

      expect(token).toMatch(/^[a-zA-Z0-9].*[a-zA-Z0-9].*[a-zA-Z0-9]$/);
    });
  });

  describe('sessionStorageService', function() {
    var sessionStorageService, key, value;

    beforeEach(inject(function(_sessionStorageService_) {
      sessionStorageService = _sessionStorageService_;
      key = 'key';
      value = 'value';
    }));

    it('should save the key and value to session storage', function() {
      sessionStorageService.set(key, value);
      expect(sessionStorage.getItem(key)).toEqual(value);
    });

    it('should return the value of the given key from session storage', function() {
      sessionStorage.setItem(key, value);
      var result = sessionStorageService.get(key);
      expect(sessionStorage.getItem(key)).toEqual(result);
    });

    it('should remove the item with the given key from session storage', function() {
      sessionStorage.setItem(key, value);
      sessionStorageService.unset(key);
      expect(sessionStorage.getItem(key)).toBeNull();
    });
  });

});
