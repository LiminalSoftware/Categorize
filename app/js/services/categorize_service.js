categorizeApp.service('categorizeService', function categorizeService($http) {
  var url = 'http://localhost:3000/v1/categorizations'

  this.submitCategorization = function(mod_id, category_ids) {
    return $http.post(url,
      {categorization: {
        mod_id: mod_id,
        category_ids: category_ids }
      },
      {withCredentials: true}
    )
  }
});