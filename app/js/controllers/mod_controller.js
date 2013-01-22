categorizeApp.controller('ModController', function ModController($scope, $routeParams, $location, modService, categoryService, digestService, categorizeService, flashService) {
  $scope.severities = {
    reportMultipleModsMessage: "Thank you for notifying us about that forum post. " +
      " currently can't categorize multiple mods simultaneously. We will in the future though!",

    submitCategorizationMessage: "Thank you for helping us Categorize! Keep up the good work!",

    reportNoModMessage: "Thank you for flagging that forum post as not-a-mod!"
  };


  $scope.registerButtonClass = "green-button icon-register";

  $scope.wizardNext = function(url) {
    $scope.wizardPartial = url;
  };

  $scope.setAsBroken = function(modId) {
    modService.postBroken(modId)
      .success(function() {
        $location.path("/");
      })
      .error(function(reason) {
        alert('error: ' + reason.message);
        flashService.error(reason);
        $location.path("/");
      });
  }

  $scope.reportNoMod = function() {
    var modId = $routeParams.modId;
    //we can use this distinction between no mod and multiple mod to set a field on the db
    //the post does not contain a mod!
    flashService.alert($scope.severities.reportNoModMessage);
    $scope.setAsBroken(modId);
  };

  $scope.reportMultipleMods = function() {
    var modId = $routeParams.modId;
    //the post contains multiple mods!
    flashService.alert($scope.severities.reportMultipleModsMessage);
    $scope.setAsBroken(modId);
  };

  $scope.goRegister = function() {
    $location.path("register");
  }

//  if ($routeParams.broken !== undefined) {
//    alert($routeParams.broken);
//  }
  if (digestService.isAuthorized() === false) {
    $scope.wizardPartial = 'views/wizard/categorize.html';
    $scope.buttonText = " Sign In";
    $scope.buttonClass = "green-button icon-sign-in";
    $scope.registerButtonClass = "green-button icon-register";
  } else if (digestService.isAuthorized() === true) {
    $scope.wizardPartial = 'views/wizard/no-mod.html';
    $scope.buttonText = " Categorize!";
    $scope.buttonClass = "blue-button icon-checkmark";
    $scope.registerButtonClass = "hidden";
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

  $scope.findSelectedCategories = function() {
    var checked = [];

    $('input[type="checkbox"].category-check').each(
      function(index, element) {
        element.checked ? checked.push(element.value) : undefined;
      }
    );

    return checked;
  };

  $scope.authorizeOrCategorize = function() {
    if (!digestService.isAuthorized()) {
      digestService.login()
        .success(function(data) {
          console.log('logging in...');
          modService.available($scope.mod.id)
            .success(function() {
              $scope.buttonText = " Categorize!";
              $scope.buttonClass = "blue-button icon-checkmark";
              $scope.registerButtonClass = "hidden";
              $scope.wizardNext('views/wizard/no-mod.html');
            })
            .error(function() {
              flashService.alert('You\'ve already done that mod');
              $location.path('/');
            })
        })
        .error(function(reason) {
          console.log('error happened!?')
        })
    } else {
      categorizeService.submitCategorization($scope.mod.id, $scope.findSelectedCategories())
        .success(function(data) {
          flashService.notice($scope.severities.submitCategorizationMessage);
          $location.path("/");
        })
        .error(function(reason) {
          flashService.error(reason);
          $location.path("/");
        })
    }
  };

//  $scope.mod = modService.getMod($routeParams.modId)
  modService.getMod($routeParams.modId).success(
    function(data) {
      $scope.mod = data;
    }
  );
});
