var categorizeApp = angular.module('categorizeApp', ['ngResource'])
  .config(function($routeProvider) {

    $routeProvider.
      when('/', {
        controller: 'IndexController',
        templateUrl: 'views/main.html'
      }).
      when('/mods/:modId', {
        controller: 'ModController',
        templateUrl: 'views/mod-detail.html'
      });
  })

  .factory('categoryResource', ['$resource',
    function($resource) {
      return $resource('http://wiglepedia.org/categories', {callback: 'JSON_CALLBACK'}, {
        get: {method: 'JSONP', isArray: true}
      });
    }])

//    .factory('modResource', ['$resource',
//      function($resource) {
//        return $resource('http://wiglepedia.org/mods/count/100', {callback: 'JSON_CALLBACK'}, {
//          get: {method: 'JSONP', isArray: true}
//        });
//      }])

  .controller('IndexController', function IndexController($scope, modService) {
    $scope.mods = modService.getAllMods();
    $scope.flag = function(modId) {
      console.log(modId);
      //open modal dialog
    }
  })

  .controller('ModController', function ModController($scope, $routeParams, modService, categoryResource) {
    if($routeParams.broken !== undefined) {
      alert($routeParams.broken);
    }
    $scope.currentMod = modService.getCurrentMod($routeParams.modId);
    $scope.allCategories = categoryResource.get();
  })

  .service('modService', ['$resource', function($resource) {
    'use strict';
    var currentMod = {};
    var allMods = [];
    var res = $resource('http://wiglepedia.org/mods/count/100', {callback: 'JSON_CALLBACK'}, {
      get: {method: 'JSONP', isArray: true}
    });

    return {
      resource: res,
      getCurrentMod: function(id) {
        var result = allMods.filter(function(mod) {
          return mod.id == id;
        });
        currentMod = result[0] || currentMod;
        return currentMod;
      },
      setCurrentMod: function(data) {
        currentMod = data || currentMod;
      },
      getAllMods: function() {
        allMods = this.resource.get();
        return allMods;
      }
    }
  }]);


