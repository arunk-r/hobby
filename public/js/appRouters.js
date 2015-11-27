angular.module('appRoutes', [])
        .config(
                ['$routeProvider', '$locationProvider',
                    function ($routeProvider) {

                        $routeProvider
                                .when('/', {
                                    templateUrl: 'welcome.html'
                                })
                                .when('/login', {
                                    templateUrl: '/user/login.html',
                                    controller: 'LoginController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: false
                                    }
                                })
                                .when('/signup', {
                                    templateUrl: '/user/signup.html',
                                    controller: 'SignupController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .when('/viewstudentsdetail', {
                                    templateUrl: '/student/viewstudentsdetail.html',
                                    controller: 'ViewStudentsDetailController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: false
                                    }
                                })
                                .when('/addstudent', {
                                    templateUrl: '/student/addstudent.html',
                                    controller: 'AddStudentController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                }).when('/student/:id', {
                                    templateUrl: '/student/studentdetails.html',
                                    controller: 'StudentsDetailController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                });
                    }
                ]);