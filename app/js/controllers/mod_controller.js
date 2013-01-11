categorizeApp.controller('ModController', function ModController($rootScope, $scope, $routeParams, modService, categoryResource, digestService) {
  if ($routeParams.broken !== undefined) {
    alert($routeParams.broken);
  }
  $rootScope.isAuthorized = $rootScope.isAuthorized || false;
  if ($scope.isAuthorized === false) {
    $scope.buttonText = " Sign In";
    $scope.buttonClass = "green-button icon-sign-in";
  } else if ($scope.isAuthorized === true) {
    $scope.buttonText = " Categorize!";
    $scope.buttonClass = "blue-button icon-checkmark";
  }
  $scope.currentMod = modService.getCurrentMod($routeParams.modId);
  $scope.allCategories = categoryResource.get();

//  $scope.$on('event:authorized', function(event) {
//    $rootScope.isAuthorized = true;
//    $scope.buttonText = " Categorize!";
//    $scope.buttonClass = "blue-button icon-checkmark";
//    $scope.$apply();
//  });

  $scope.authorize = function() {
    if (!digestService.isAuthorized()) {
      digestService.login('http://localhost:3001/v1/users');
    }
  }
});
