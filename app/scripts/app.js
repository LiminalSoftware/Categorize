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
  });


