'use strict'

describe('Viewer services', function() {
  beforeEach(module('viewerApp'));

  describe('getTokenService', function() {
    var getTokenService, sessionStorageService, $httpBackend;

    beforeEach(inject(function(_getTokenService_, _sessionStorageService_,  _$httpBackend_) {
      getTokenService = _getTokenService_;
      sessionStorageService = _sessionStorageService_;

      $httpBackend = _$httpBackend_;
    }));

  });

  describe('getTokenService', function() {
    var getTokenService, $httpBackend;
    
    beforeEach(inject(function(_getTokenService_, _$httpBackend_) {
      getTokenService = _getTokenService_;

      $httpBackend = _$httpBackend_;
    }));

    it('should fetch an auth token', function(done) {
      var testToken = function(response) {
        var token = response.data['token'];
        expect(token).toEqual('abcd.1234.xyz');
      };

      var getFail = function(error) {
        expect(error).toBeUndefined();
      };

      $httpBackend.expectPOST('http://localhost:8000/api-token-auth/', 'username=admin&password=password').
        respond(200, {'token': 'abcd.1234.xyz'});

      getTokenService.get('admin', 'password').
        then(testToken).
        catch(getFail).
        finally(done);

      $httpBackend.flush();
    });
    
    it('should catch an error', function(done) {
      var testToken = function(response) {
        var token = response.data['token'];
      };

      var getFail = function(error) {
        expect(error.status).toBe(400);
      };

      $httpBackend.expectPOST('http://localhost:8000/api-token-auth/', 'username=admin&password=password').
        respond(400, 'Bad request...');

      getTokenService.get('admin', 'password').
        then(testToken).
        catch(getFail).
        finally(done);

      $httpBackend.flush();
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
