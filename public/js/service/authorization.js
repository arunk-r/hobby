angular.module('security.authorization', [])
        .service('securityAuthorization', function () {
            var service = {
                //setter
                setAuthenticatedUser: function (value) {
                    service.currentUser = value;
                },
                //getter
                getAuthenticatedUser: function () {
                    return service.currentUser;
                },
                // Information about the current user
                currentUser: null,
                // Is the current user authenticated?
                isAuthenticated: function () {
                    return !!service.currentUser;
                }
            };
            return service;
        }
        );