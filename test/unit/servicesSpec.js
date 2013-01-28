'use strict';

/* jasmine specs for services go here */

//describe('service', function() {
//  beforeEach(module('myApp.services'));
//
//
//  describe('version', function() {
//    it('should return current version', inject(function(version) {
//      expect(version).toEqual('0.1');
//    }));
//  });
//});

describe('modService', function() {

  describe('getUncategorized', function() {
    it('should return 100 mods', inject(function(mods) {
      expect(mods).length.toEqual(100);
    }));
  });

  describe('getModById', function() {
    it('should return a single mod whose id matches the argument', ))

  })
});
