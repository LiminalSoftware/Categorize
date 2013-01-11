categorizeApp.service('modService', function($http) {
  'use strict';
  var currentMod,
    allModsPromise,
    promise,
    mods,
    baseUrl = 'http://localhost:3000/v1/',
    uncategorizedUrl = baseUrl + 'mods/uncategorized/100?callback=JSON_CALLBACK',
    incompleteUrl = baseUrl + 'mods/incomplete/100?callback=JSON_CALLBACK';

  return {
    getUncategorized: function() {
      return $http.jsonp(uncategorizedUrl);
//        promise.success(function(data, status, headers){
//          console.dir(data);
//        })
    },
    getIncomplete: function() {
      return $http.jsonp(incompleteUrl);
//        promise.success(function(data, status, headers){
//          mods = data;
//        });
//        return mods;
    },
    getCurrentMod: function(id) {

    },
    setCurrentMod: function(data) {

    },
    getAllMods: function() {
      allModsPromise = $http.jsonp(url);
      return allModsPromise;
    }
  }
});
