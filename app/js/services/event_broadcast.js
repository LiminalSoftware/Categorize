categorizeApp.factory('eventBroadcast', function($rootScope) {
  // eventBroadcaster is the object created by the factory method.
  var eventBroadcaster = {};

  // The message is a string or object to carry data with the event.
  eventBroadcaster.message = '';

  // The event name is a string used to define event types.
  eventBroadcaster.eventName = '';

  // This method is called from within a controller to define an event and attach data to the eventBroadcaster object.
  eventBroadcaster.broadcast = function(evName, msg) {
    this.message = msg;
    this.eventName = evName;
    this.broadcastItem();
  };

  // This method broadcasts an event with the specified name.
  eventBroadcaster.broadcastItem = function() {
    $rootScope.$broadcast(this.eventName);
  };

  return eventBroadcaster;
});
