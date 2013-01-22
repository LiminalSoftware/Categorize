categorizeApp.service('flashService', function() {
  var message, severity;

  this.getMessage = function() {
    console.log('message below:');
    console.log(message);
    if (message && severity) {
      var message_obj = {message: message, severity: severity};
      message = undefined;
      severity = undefined;
      console.log('clearing message!');
      return message_obj;
    } else {
      console.log('nothing to see here!');
      return undefined;
    }
  };

  this.notice = function(m) {
    message = m;
    severity = 'notice';
  };

  this.alert = function(m) {
    message = m;
    severity = 'alert';
  };

  this.warning = function(m) {
    message = m;
    severity = 'warning';
  };

  this.error = function(m) {
    message = m;
    severity = 'error';
  }
});