var categorizeApp = angular.module('categorizeApp', ['ngResource'])
    .config(function ($routeProvider) {

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
      function ($resource) {
        return $resource('http://wiglepedia.org/categories', {callback: 'JSON_CALLBACK'}, {
          get: {method: 'JSONP', isArray: true}
        });
      }])

    .factory('modResource', ['$resource',
      function ($resource) {
        return $resource('http://wiglepedia.org/mods/count/20', {callback: 'JSON_CALLBACK'}, {
          get: {method: 'JSONP', isArray: true}
        });
      }])

    .controller('IndexController', function IndexController($scope, modService) {
      $scope.mods = modService.getAllMods();
    })

    .controller('ModController', function ($scope, $routeParams, modService, categoryResource) {
      $scope.currentMod = modService.getCurrentMod($routeParams.modId);
      $scope.allCategories = categoryResource.get();
    })

    .service('modService', function () {
      'use strict';
      var currentMod = {};
      //we will get this from the server later...
      var allMods = [
        {id: 1, name: 'Red Power 2', category: 'uncategorized', forumLink: 'http://www.redpower2.com'},
        {id: 2, name: 'BuildCraft', category: 'uncategorized', forumLink: 'http://www.buildcraft.com'},
        {id: 3, name: 'Portal Gun', category: 'uncategorized', forumLink: 'http://www.portalgun.com'}
      ];
      return {
        getCurrentMod: function (id) {
          var result = allMods.filter(function (mod) {
            return mod.id == id;
          });
          currentMod = result[0] || currentMod;
          return currentMod;
        },
        setCurrentMod: function (data) {
          currentMod = data || currentMod;
        },
        getAllMods: function () {
          return allMods;
        }
      }
    })

  ;


