categorizeApp.directive('registrationForm', function() {
  return {
    restrict: 'A',

    link: function(scope, element, attrs) {
      scope.submitRegistration = function() {
        if (scope.password == scope.passwordConfirm) {
          //TODO: grab the realm from the backend, how?
          // 1) backend route to provide realm,
          // 2) hit protected resource & parse response header

          scope.passwordHash = digestService.hexDigest(scope.username, scope.password, 'wiglepedia login');
        }

        $.ajax({
          url: 'http://localhost:3001/v1/users',
          type: 'post',
//                header: {Origin: document.domain},
          data: {
            user: {
              username: scope.username,
              email: scope.email,
              password_hash: scope.passwordHash
            }
          }
        })
          .success(function(data) {

          })

          .fail(function(data) {

          })
      }
    }
  }
});
