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
            }).
            when('/register', {
                controller: 'RegisterController',
                templateUrl: 'views/register.html'
            })
    })

    .factory('categoryResource', ['$resource',
    function($resource) {
        return $resource('http://wiglepedia.org/v1/categories', {callback: 'JSON_CALLBACK'}, {
            get: {method: 'JSONP', isArray: true}
        });
    }])

    .controller('IndexController', function IndexController($scope, modService, digestService) {
        //Check ifAuthorized before setting allMods, if authorized then get the mods that havn't been categorized by the current user
        ////otherwise get mods that havn't been categorized >=10 times (by all users)
        if (digestService.isAuthorized() === true) {
            console.log('I am authorized');
            modService.resource = $resource('http://wiglepedia.org/v1/mods/uncategorized/100', {callback: 'JSON_CALLBACK'}, {
                get: {method: 'JSONP', isArray: true}
            })
        }

        $scope.mods = modService.getAllMods();
        console.log('getting mods');
        $scope.flag = function(modId) {
            console.log(modId);
            //open modal dialog
        };

    })

    .controller('ModController', function ModController($rootScope, $scope, $routeParams, modService, categoryResource, digestService, eventBroadcast) {
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

        $scope.$on('event:authorized', function(event) {
            $rootScope.isAuthorized = true;
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

    .directive('registrationForm', function() {
        return {
            restrict: 'A',

            link: function(scope, element, attrs) {
                scope.submitRegistration = function() {
                    if (scope.password == $scope.passwordConfirm) {
                        //TODO: grab the realm from the backend, how?
                        // 1) backend route to provide realm,
                        // 2) hit protected resource & parse response header

                        scope.passwordHash = digestService.hexDigest($scope.username, $scope.password, 'wiglepedia login');
                    }

                    $.ajax({
                        url: 'http://localhost:3001/v1/users',
                        type: 'post',
//                header: {Origin: document.domain},
                        data: {
                            user: {
                                username: scope.username,
                                email: scope.email,
                                password_hash: scope.passwordHash
                            }
                        }
                    })
                        .success(function(data) {

                        })

                        .fail(function(data) {

                        })
                }
            }
        }
    })

    .controller('RegisterController', function($scope, $http, digestService, eventBroadcast) {
        'use strict';

//        $http.jsonp('url').success(function (data) {
//            $scope.data = data;
//        });

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
    return {
        authorized: false,

        isAuthorized: function() {
            return this.authorized;
        },

        hexDigest: function(username, secret, realm) {
            realm = realm || "Application";
            return hex_md5(username + ":" + realm + ":" + secret);
        },

        login: function(uri) {
            $.ajax({
                url: uri,
                type: this.HTTP_METHOD,
                dataType: 'jsonp',
                beforeSend: function(request) {
                    if (typeof authorizationHeader != 'undefined') {
                        request.setRequestHeader(digestAuth.AUTHORIZATION_HEADER, authorizationHeader);
                    }
                },
                success: function(response) {
                    eventBroadcast.broadcast('event:authorized', response.message);

                },
                error: function(response) {
                    //don't know wat to do yet
                }
            });
        }
    };
}])

    .service('modService', ['$resource', function($resource) {
    'use strict';
    var currentMod = {};
    var allMods = [];
    var res = $resource('http://wiglepedia.org/v1/mods/incomplete/100', {callback: 'JSON_CALLBACK'}, {
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
