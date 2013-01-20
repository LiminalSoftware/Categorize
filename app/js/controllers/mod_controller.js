categorizeApp.controller('ModController', function ModController($scope, $routeParams, $location, modService, categoryService, digestService, categorizeService) {
  $scope.wizardPartial = 'views/q1.html';

  $scope.goNext = function(url){
    $scope.wizardPartial = url;
  };

  $scope.registerButtonClass = "green-button icon-register";

  $scope.goRegister = function() {
    $location.path("register");
  }

  if ($routeParams.broken !== undefined) {
    alert($routeParams.broken);
  }
  if (digestService.isAuthorized() === false) {
    $scope.buttonText = " Sign In";
    $scope.buttonClass = "green-button icon-sign-in";
    $scope.registerButtonClass = "green-button icon-register";
  } else if (digestService.isAuthorized() === true) {
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
        })
        .error(function() {
          console.log('error happened!?')
        })
    } else {
      categorizeService.submitCategorization($scope.mod.id, $scope.findSelectedCategories())
    }
  };

//  $scope.mod = modService.getMod($routeParams.modId)
  modService.getMod($routeParams.modId).success(
    function(data) {
      $scope.mod = data;
    }
  );
});
