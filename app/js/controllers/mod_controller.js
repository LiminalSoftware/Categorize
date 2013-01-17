categorizeApp.controller('ModController', function ModController($scope, $routeParams, modService, categoryService, digestService) {
  if ($routeParams.broken !== undefined) {
    alert($routeParams.broken);
  }
  if (digestService.isAuthorized() === false) {
    $scope.buttonText = " Sign In";
    $scope.buttonClass = "green-button icon-sign-in";
  } else if (digestService.isAuthorized() === true) {
    $scope.buttonText = " Categorize!";
    $scope.buttonClass = "blue-button icon-checkmark";
  }
//  $scope.currentMod = modService.getCurrentMod($routeParams.modId);
//  $scope.allCategories = categoryService.getCategories();
  categoryService.getCategories().success(
    function(data) {
      console.log('getting categories');
      $scope.allCategories = data;
    }
  ).error(
    function(data) {
      console.log('failed to get categories')
    }
  );

  $scope.authorize = function() {
    if (!digestService.isAuthorized()) {
      digestService.login()
        .success(function(data) {
          console.log('logging in...');
          $scope.buttonText = " Categorize!";
          $scope.buttonClass = "blue-button icon-checkmark";
        })
        .error(function(){console.log('error happened!?')})
    }else{
      console.log('else happened!?')
    }
  };

//  $scope.mod = modService.getMod($routeParams.modId)
  modService.getMod($routeParams.modId).success(
    function(data) {
      $scope.mod = data;
    }
  );
});
