categorizeApp.controller('ModController', function ModController($scope, $routeParams, $location, modService, categoryService, digestService, categorizeService) {
  $scope.registerButtonClass = "green-button icon-register";

  $scope.wizardNext = function(url) {
    $scope.wizardPartial = url;
  };

  $scope.setAsBroken = function(modId) {
    modService.postBroken(modId)
      .success(function() {
        $location.path("/");
      })
      .error(function(error) {
        alert('error: ' + error.message);
        $location.path("/");
      });
  }

  $scope.reportNoMod = function() {
    var modId = $routeParams.modId;
    //we can use this distinction between no mod and multiple mod to set a field on the db
    //the post does not contain a mod!
    $scope.setAsBroken(modId);
  };

  $scope.reportMultipleMods = function() {
    var modId = $routeParams.modId;
    //the post contains multiple mods!
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
          $scope.buttonText = " Categorize!";
          $scope.buttonClass = "blue-button icon-checkmark";
          $scope.registerButtonClass = "hidden";
          $scope.wizardNext('views/wizard/no-mod.html');
        })
        .error(function() {
          console.log('error happened!?')
        })
    } else {
      categorizeService.submitCategorization($scope.mod.id, $scope.findSelectedCategories())
        .success(function(data) {
          $location.path("/");
      })
        .error(function(error) {

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
