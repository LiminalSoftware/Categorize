categorizeApp.controller('RegisterController', function($scope, $http, $location, digestService) {
  'use strict';
//$http.jsonp('url').success(function (data) {
//  $scope.data = data;
//});
  $scope.submitRegistration = function() {
    if ($scope.password == $scope.passwordConfirm) {
      $scope.toggleValidationMessage();

      //TODO: grab the realm from the backend, how?
      // 1) backend route to provide realm,
      // 2) hit protected resource & parse response header

      $scope.passwordHash = digestService.hexDigest($scope.username, $scope.password, 'wiglepedia login');

      $http.post('http://localhost:3000/v1/users',
        { user: {
          username: $scope.username,
          email: $scope.email,
          password_hash: $scope.passwordHash }
        }
      )
        .success(function(data) {
          alert(data.message);
          $location.path('/');
        })
        .error(function(data) {
          $scope.toggleValidationMessage(data.message)
        })
    } else {
      $scope.toggleValidationMessage('Passwords must match!')
    }
  }

  $scope.toggleValidationMessage = function(message) {
    if (message) {
      $('.validation-message').text(message).fadeIn();
    } else {
      $('.validation-message').fadeOut('fast');
    }
  }

})
;


