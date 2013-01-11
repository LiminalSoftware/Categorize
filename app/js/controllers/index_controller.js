categorizeApp.controller('IndexController', function IndexController($scope, modService, digestService) {
  //Check ifAuthorized before setting allMods, if authorized then get the mods that havn't been categorized by the current user
  ////otherwise get mods that havn't been categorized >=10 times (by all users)
  if (digestService.isAuthorized() == true) {
    modService.getUncategorized().success(function(data) {
      $scope.mods = data;
    });
  } else {
    modService.getIncomplete().success(function(data) {
      $scope.mods = data;
    });
  }

  console.log('getting mods');
  $scope.flag = function(modId) {
    //open modal dialog
  };

});