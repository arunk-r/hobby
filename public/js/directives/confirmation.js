/* Directives */
angular.module('sbpuc.confirmation', [])
        .directive('confirmationNeeded', function () {
            return {
                priority: 1,
                terminal: true,
                link: function (scope, element, attrs) {
                    var msg = attrs.confirmationNeeded || "Are you sure?";
                    var clickAction = attrs.ngClick;
                    element.bind('click', function () {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction);
                        }
                    });
                }
            };
        });