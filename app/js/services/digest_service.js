categorizeApp.service('digestService', function($http) {
  console.log('digestService: setting authorized to false!');

  this.isAuthorized = function() {
    console.log('checking authorization...' + Cookies('authorized'));
    return Cookies('authorized') ? true : false;
  };

  this.hexDigest = function(username, secret, realm) {
    realm = realm || "Application";
    return hex_md5(username + ":" + realm + ":" + secret);
  };

  this.login = function() {
    return $http.jsonp('http://localhost:3000/v1/users?callback=JSON_CALLBACK')
      .success(function() {
        Cookies('authorized', true, {expires: 300})
      })
      .error(function() {
        alert('Sign In failed: Please clear your browsers session to try again.\n\nTHIS WILL BE FIXED SOON');
      });

//      beforeSend: function(request) {
//        if (typeof authorizationHeader != 'undefined') {
//          request.setRequestHeader(digestAuth.AUTHORIZATION_HEADER, authorizationHeader);
//        }
//      },
  };
});
