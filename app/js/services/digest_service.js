categorizeApp.service('digestService', function($http) {
  console.log('digestService: setting authorized to false!');
  var authorized = false;

  this.isAuthorized = function() {
    console.log('checking authorization...' + authorized);
    return authorized;
  };

  this.hexDigest = function(username, secret, realm) {
    realm = realm || "Application";
    return hex_md5(username + ":" + realm + ":" + secret);
  };

  this.login = function() {
    return $http.jsonp('http://localhost:3000/v1/users?callback=JSON_CALLBACK')
      .success(function() {
        authorized = true;
      });

//      beforeSend: function(request) {
//        if (typeof authorizationHeader != 'undefined') {
//          request.setRequestHeader(digestAuth.AUTHORIZATION_HEADER, authorizationHeader);
//        }
//      },
  };
});
