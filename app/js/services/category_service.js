categorizeApp.service('categoryService', function($http) {
  var url = 'http://wiglepedia.org/v1/categories'

  this.getCategories = function() {
    return $http.jsonp(url + '?callback=JSON_CALLBACK')
  }
});