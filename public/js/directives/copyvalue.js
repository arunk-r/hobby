/* Directives */
angular.module('sbpuc.copyval', [])
        .directive('copyValue', function ($parse) {
            return function (scope, element, attrs) {
                if (attrs.ngModel) {
                    if (element[0].type === "hidden") {
                        $parse(attrs.ngModel).assign(scope, element.val());
                    }
                }
            };
        });