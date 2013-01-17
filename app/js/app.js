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

  .service('categoryService', function($http) {
    var url = 'http://localhost:3000/v1/categories'

    this.getCategories = function() {
      return $http.jsonp(url + '?callback=JSON_CALLBACK')
    }
  });












