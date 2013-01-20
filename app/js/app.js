var categorizeApp = angular.module('categorizeApp', [])
  .config(['$routeProvider',  function($routeProvider) {
//    $rootScope.apiBaseUrl = 'http://localhost:3000/v1';
    $.ajaxSetup({ cache: false });

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

  }]);

