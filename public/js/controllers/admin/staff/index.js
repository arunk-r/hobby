angular.module('StaffViewCtrl', [])
        .controller('StaffViewController',
                function ($scope, $state, $location, staff, Flash) {
                    //console.log('In UserViewController');
                    $scope.staffList = {};
                    $scope.formData = {};
                    //console.log($scope.staffMember)
                    staff.getall().then(function (data) {
                        $scope.staffList = data.data;
                    });
                    // Get Staff member details
                    $scope.viewDetails = function (id) {
                        $scope.staffMember = ''
                        staff.getdetail(id).then(function (data) {
                            //console.log(data);
                            $scope.staffMember = data.data[0];
                            console.log($scope.staffMember);
                            //$location.path('/admin/staff/view');
                            //    $state.go('admin.staff.view', {}, {reload: true});
                        });
                    };

                    // Add New App User
                    $scope.createStaff = function () {
                        $scope.formData.image = $('#tumbimage').val();
                        console.log($scope.formData);
                        staff.create($scope.formData).then(function (data) {
                            $scope.formData = {};
                            console.log(data);
                            if (data.success) {
                                $location.path('/admin/staff');
                                $state.go('admin.staff', {}, {reload: true});
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
                    $scope.deleteStaff = function (id) {
                        console.log('Inside delete function ' + id);
                        staff.inactive(id).then(function (data) {
                            console.log(data);
                            if (data.success) {
                                $location.path('/admin/staff');
                                $state.go('admin.staff', {}, {reload: true});
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