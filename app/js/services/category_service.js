categorizeApp.service('categoryService', function($http) {
  var url = 'http://localhost:3000/v1/categories'

  this.getCategories = function() {
    return $http.jsonp(url + '?callback=JSON_CALLBACK')
  }
});