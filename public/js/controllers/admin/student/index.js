angular.module('MoveStudentsViewCtrl', [])
        .controller('MoveStudentsViewController',
                function ($scope, $state, $location, student, Flash) {
                    //console.log('In UserViewController');
                    // Get Transaction member details
                    $scope.moveTranscation = function () {
                        //console.log($scope.selectedItem);
                        student.movestudents().then(function (data) {
                            //console.log(data)
                            if (!data.success) {
                                var message = '<strong> Error!</strong>  Something went wrong, Retry again.';
                                Flash.create('danger', message, 'custom-class');
                            } else {
                                var message = '<strong> Information</strong>  Operation successful!';
                                Flash.create('info', message, 'custom-class');
                                $location.path('/admin/currentstudents');
                                $state.go('admin.currentstudents', {reload:true});
                            }
                        });
                    };
                }
        );
