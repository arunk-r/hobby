/* Directives */
angular.module('sbpuc.passwordcheck', [])
        .directive('pwCheck', [function () {
                return {
                    require: 'ngModel',
                    link: function (scope, elem, attrs, ctrl) {
                        var firstPassword = '#' + attrs.pwCheck;
                        elem.add(firstPassword).on('keyup', function () {
                            scope.$apply(function () {
                                //console.info(elem.val() === scope.signupData.password);
                                ctrl.$setValidity('pwmatch', elem.val() === scope.signupData.password);
                            });
                        });
                    }
                };
            }]);