angular.module('security.authorization', [])
        .service('securityAuthorization', function () {
            var service = {
                //setter
                setAuthenticatedUser: function (value) {
                    sessionStorage.currentUser = value;
                },
                //getter
                getAuthenticatedUser: function () {
                    return sessionStorage.currentUser;
                },
                // Is the current user authenticated?
                isAuthenticated: function () {
                    return !!sessionStorage.currentUser;
                }
            };
            return service;
        }
        );