categorizeApp.service('modService', function($http) {
  'use strict';
  var baseUrl = 'http://localhost:3000/v1/';

  this.getMods = function() {
    return $http.jsonp(baseUrl + 'mods/uncategorized/100?callback=JSON_CALLBACK');
  };

  this.getMod = function(id) {
    return $http.jsonp(baseUrl + 'mods/' + id + '?callback=JSON_CALLBACK');
  };

  this.postBroken = function(id) {
    return $http.post(baseUrl + 'mods/' + id + '/break', {}, {withCredentials: true});
  }
});
