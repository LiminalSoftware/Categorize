categorizeApp.service('modService', function($http) {
  'use strict';
  var url = 'http://localhost:3000/v1/mods/uncategorized/100?callback=JSON_CALLBACK';

  this.getMods = function() {
    return $http.jsonp(url);
  };

  this.getMod = function(id) {
    return $http.jsonp('http://localhost:3000/v1/mods/' + id + '?callback=JSON_CALLBACK')
  };
});
