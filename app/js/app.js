var categorizeApp = angular.module('categorizeApp', ['ngResource'])
    .config(function($routeProvider) {

        $routeProvider.
            when('/', {
                controller: 'IndexController',
                templateUrl: 'views/main.html'
            }).
            when('/mods/:modId', {
                controller: 'ModController',
                templateUrl: 'views/mod-detail.html'
            });
    })

    .factory('categoryResource', ['$resource',
    function($resource) {
        return $resource('http://wiglepedia.org/categories', {callback: 'JSON_CALLBACK'}, {
            get: {method: 'JSONP', isArray: true}
        });
    }])

    .controller('IndexController', function IndexController($scope, modService) {
        $scope.mods = modService.getAllMods();
        $scope.flag = function(modId) {
            console.log(modId);
            //open modal dialog
        }
    })

    .controller('ModController', function ModController($scope, $routeParams, modService, categoryResource, digestService, eventBroadcast) {
        if ($routeParams.broken !== undefined) {
            alert($routeParams.broken);
        }
        $scope.buttonText = " Sign In";
        $scope.buttonClass = "green-button icon-sign-in"
        $scope.currentMod = modService.getCurrentMod($routeParams.modId);
        $scope.allCategories = categoryResource.get();

        $scope.$on('event:authorized', function(event){
            $scope.buttonText = " Categorize!";
            $scope.buttonClass = "blue-button icon-checkmark";
            $scope.$apply();
        });

        $scope.authorize = function() {
            if (!digestService.isAuthorized()) {
                digestService.login('http://localhost:3001/v1/users');
            }
        }
    })

    .factory('eventBroadcast', function($rootScope) {
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
    })

    .service('digestService', ['eventBroadcast', function(eventBroadcast) {
        var digestServiceObject = {
            authorized: false,

            isAuthorized: function() {
                return this.authorized;
            },

            login: function(uri) {
                $.ajax({
                    url: uri,
                    type: this.HTTP_METHOD,
                    dataType: 'jsonp',
                    beforeSend: function(request){
                        if(typeof authorizationHeader != 'undefined'){
                            request.setRequestHeader(digestAuth.AUTHORIZATION_HEADER, authorizationHeader);
                        }
                    },
                    success: function(response) {
//                        digestServiceObject.authorized = true;
                        eventBroadcast.broadcast('event:authorized', response.message);

                    },
                    error: function(response) {
                        //don't know wat to do yet
                    }
                });
            }
        };

        return digestServiceObject;
    }])

    .service('modService', ['$resource', function($resource) {
    'use strict';
    var currentMod = {};
    var allMods = [];
    var res = $resource('http://wiglepedia.org/mods/count/100', {callback: 'JSON_CALLBACK'}, {
        get: {method: 'JSONP', isArray: true}
    });

    return {
        resource: res,
        getCurrentMod: function(id) {
            var result = allMods.filter(function(mod) {
                return mod.id == id;
            });
            currentMod = result[0] || currentMod;
            return currentMod;
        },
        setCurrentMod: function(data) {
            currentMod = data || currentMod;
        },
        getAllMods: function() {
            allMods = this.resource.get();
            return allMods;
        }
    }
}]);
