angular.module('UserViewCtrl', [])
        .controller('UserViewController',
                function ($scope, $state, $location, users, Flash) {
                    //console.log('In UserViewController');
                    $scope.appUsersList = {};
                    $scope.signupData = {};
                    users.getall().then(function (data) {
                        $scope.appUsersList = data.data;
                        //console.log($scope.appUsersList);
                    });

                    // Add New App User
                    $scope.createUser = function () {
                        console.log($scope.signupData.username);
                        users.create($scope.signupData).then(function (data) {
                            $scope.signupData = {};
                            console.log(data);
                            if (data.success) {
                                $location.path('/admin/appusers');
                                $state.go('admin.appusers', {}, { reload: true });
                            } else {
                                //error due to server side validation
                                $scope.errfor = data.errfor;
                                $scope.errorMsg = data.errors[0];
                            }
                        }, function (e) {
                            var message = '<strong> Login Issue!...</strong> Please try Signup again.';
                            Flash.create('danger', message, 'custom-class');
                            $location.path('/login');
                            $state.go('login');
                        });
                    };
                    // Add New App User
                    $scope.deleteUser = function (id){
                        console.log('Inside delete function ' + id);
                         users.inactive(id).then(function (data) {
                            console.log(data);
                            if (data.success) {
                                $location.path('/admin/appusers');
                                $state.go('admin.appusers', {}, { reload: true });
                            } else {
                                //error due to server side validation
                                $scope.errfor = data.errfor;
                                $scope.errorMsg = data.errors[0].error;
                            }
                        }, function (e) {
                            var message = '<strong> Login Issue!...</strong> Please try Signup again.';
                            Flash.create('danger', message, 'custom-class');
                            $location.path('/login');
                            $state.go('login');
                        });
                    };
                }
        );