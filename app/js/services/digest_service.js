categorizeApp.service('digestService', function() {
  return {
    authorized: false,

    isAuthorized: function() {
      return this.authorized;
    },

    hexDigest: function(username, secret, realm) {
      realm = realm || "Application";
      return hex_md5(username + ":" + realm + ":" + secret);
    },

    login: function(uri) {
      $.ajax({
        url: uri,
        type: this.HTTP_METHOD,
        dataType: 'jsonp',
        beforeSend: function(request) {
          if (typeof authorizationHeader != 'undefined') {
            request.setRequestHeader(digestAuth.AUTHORIZATION_HEADER, authorizationHeader);
          }
        },
        success: function(response) {
//          eventBroadcast.broadcast('event:authorized', response.message);

        },
        error: function(response) {
          //don't know wat to do yet
        }
      });
    }
  };
});
