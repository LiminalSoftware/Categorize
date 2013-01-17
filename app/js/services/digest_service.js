categorizeApp.service('digestService', function($http) {
  var authorized = false;

  this.isAuthorized = function() {
    return authorized;
  };

  this.hexDigest = function(username, secret, realm) {
    realm = realm || "Application";
    return hex_md5(username + ":" + realm + ":" + secret);
  };

  this.login = function() {
    return $http.jsonp('http://localhost:3000/v1/users?callback=JSON_CALLBACK');

//      beforeSend: function(request) {
//        if (typeof authorizationHeader != 'undefined') {
//          request.setRequestHeader(digestAuth.AUTHORIZATION_HEADER, authorizationHeader);
//        }
//      },
  };
});
