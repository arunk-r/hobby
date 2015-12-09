angular.module('appRoutes', [])
        .config(
                ['$stateProvider', '$urlRouterProvider',
                    function ($stateProvider, $urlRouterProvider) {
                        //$urlRouterProvider.otherwise('home');
                        $stateProvider
                                .state('home', {
                                    url: '/home',
                                    templateUrl: 'welcome.html'
                                })
                                .state('default', {
                                    url: '/',
                                    templateUrl: 'welcome.html'
                                })
                                .state('login', {
                                    url: '/login',
                                    templateUrl: '/user/login.html',
                                    controller: 'LoginController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: false
                                    }
                                })
                                .state('logout', {
                                    templateUrl: '/user/login.html',
                                    controller: 'LogoutController'
                                })
                                .state('settings', {
                                    url: '/settings',
                                    templateUrl: '/user/settings/settings.html'
                                })
                                .state('signup', {
                                    templateUrl: '/user/signup.html',
                                    controller: 'SignupController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('studentsdetails', {
                                    url: '/studentsdetails',
                                    templateUrl: '/student/viewstudentsdetail.html',
                                    controller: 'ViewStudentsDetailController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: false
                                    }
                                })
                                .state('addstudent', {
                                    url: '/addstudent',
                                    templateUrl: '/student/addstudent.html',
                                    controller: 'AddStudentController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('student', {
                                    url: '/student/:id',
                                    templateUrl: '/student/studentdetails.html',
                                    controller: 'StudentsDetailController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('reports', {
                                    url: '/reports',
                                    templateUrl: '/reports/index.html',
                                    controller: 'ReportsController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('selectedyearfee', {
                                    url: '/reports/anual/:years/fee',
                                    templateUrl: '/reports/anualfee.html',
                                    controller: 'AnualFeeController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('academicyearfee', {
                                    url: '/reports/academicfee',
                                    templateUrl: '/reports/currentyearfee.html',
                                    controller: 'CurrentYearFeeController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('examfee', {
                                    url: '/reports/examfee',
                                    templateUrl: '/reports/currentyearexamfee.html',
                                    controller: 'CurrentYearExamFeeController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('miscellaneousfee', {
                                    url: '/reports/miscellaneousfee',
                                    templateUrl: '/reports/currentyearmiscellaneousfee.html',
                                    controller: 'CurrentYearMiscellaneousFeeController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('studentsextract', {
                                    url: '/reports/studentsextract',
                                    templateUrl: '/reports/studentsextract.html',
                                    controller: 'StudentExtractController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                /** Admin controls*/
                                .state('admin', {
                                    url: '/admin',
                                    templateUrl: '/admin/index.html',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.staff', {
                                    url: '/staff',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/staff.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.appusers', {
                                    url: '/appusers',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/appusers.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.currentstudents', {
                                    url: '/currentstudents',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/currentstudents.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.oldstudents', {
                                    url: '/oldstudents',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/oldstudents.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.transcations', {
                                    url: '/transcations',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/transcations.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                });
                    }
                ]);