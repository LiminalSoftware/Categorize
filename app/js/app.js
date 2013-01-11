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
      }).
      when('/register', {
        controller: 'RegisterController',
        templateUrl: 'views/register.html'
      })
  })

  .factory('categoryResource', ['$resource',
    function($resource) {
      return $resource('http://localhost:3000/v1/categories', {callback: 'JSON_CALLBACK'}, {
        get: {method: 'JSONP', isArray: true}
      });
    }]);












