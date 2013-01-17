categorizeApp.controller('IndexController', function IndexController($scope, modService, digestService) {
  modService.getMods().success(function(data) {
    $scope.mods = data;
  });
});