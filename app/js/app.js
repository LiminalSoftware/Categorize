var categorizeApp = angular.module('categorizeApp', [])
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

  .controller('IndexController', function IndexController($scope, modService) {
    $scope.mods = modService.getAllMods();
  })

  .controller('ModController', function($scope, $routeParams, modService, categoryService) {
    $scope.currentMod = modService.getCurrentMod($routeParams.modId);
    $scope.allCategories = categoryService.getAllCategories();
  })

  .service('modService', function() {
    'use strict';
    var currentMod = {};
    //we will get this from the server later...
    var allMods = [
      {id: 1, name: 'Red Power 2', category: 'uncategorized', forumLink: 'http://www.redpower2.com'},
      {id: 2, name: 'BuildCraft', category: 'uncategorized', forumLink: 'http://www.buildcraft.com'},
      {id: 3, name: 'Portal Gun', category: 'uncategorized', forumLink: 'http://www.portalgun.com'}
    ];
    return {
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
        return allMods;
      }
    }
  })

  .service('categoryService', function() {
    //this will be pulled from a server
    var allCategories = [
      {id: 1, name: 'Full Conversion'},
      {id: 2, name: 'World Generation'},
      {id: 3, name: 'Add-ons'},
      {id: 4, name: 'Item Only'}
    ];

    return {
      getAllCategories: function() {
        return allCategories;
      }
    }

  });

