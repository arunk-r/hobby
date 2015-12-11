angular.module('security.authorization', [])
        .service('securityAuthorization', function () {
            var service = {
                //setter
                setAuthenticatedUser: function (value) {
                    //console.log(value)
                    sessionStorage.setItem('currentUser', JSON.stringify(value));
                },
                //getter
                getAuthenticatedUser: function () {
                    return JSON.parse(sessionStorage.getItem('currentUser'));
                },
                // Is the current user authenticated?
                isAuthenticated: function () {
                    return !!this.getAuthenticatedUser();
                }
                ,
                // Is the current user admin?
                isAdminUser: function () {
                    var user = this.getAuthenticatedUser();
                    if (!!user)
                        return (!!user.roles.admin);
                    else
                        return  false;
                }
            };
            return service;
        }
        );