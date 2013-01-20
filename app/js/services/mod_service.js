categorizeApp.service('modService', function($http) {
  'use strict';
  var baseUrl = 'http://wiglepedia.org/v1/mods/';

  this.getMods = function() {
    return $http.jsonp(baseUrl + 'uncategorized/100?callback=JSON_CALLBACK');
  };

  this.getMod = function(id) {
    return $http.jsonp(baseUrl + id + '?callback=JSON_CALLBACK');
  };

  this.postBroken = function(id) {
    return $http.post(baseUrl + '' + id + '/break', {}, {withCredentials: true});
  };

  this.available = function(id) {
    return $http.jsonp(baseUrl + 'available/' + id + '?callback=JSON_CALLBACK');
  }
});
