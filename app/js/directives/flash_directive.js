categorizeApp.directive('flashMessage', function(flashService) {
  return {
    template: '<p>{{message}}</p>',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      element.addClass('hidden');
      var message_obj = flashService.getMessage();
      if (message_obj) {
        scope.message = message_obj.message;
        element.find('p').addClass(message_obj.severity);
        element.slideDown('slow');
        element.removeClass('hidden');
      } else {
        element.find('p').removeClass('notice', 'alert', 'warning', 'error');
      }
    }
  }
});