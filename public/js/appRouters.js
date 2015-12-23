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
                                .state('user', {
                                    url: '/user',
                                    templateUrl: '/user/index.html'
                                })
                                .state('user.addstudent', {
                                    url: '/user/addstudent',
                                    views: {
                                        'userview@user': {
                                            templateUrl: '/student/addstudent.html',
                                            controller: 'AddStudentController',
                                            data: {
                                                requireLogin: true,
                                                adminPrev: true
                                            }
                                        }
                                    }
                                })
                                .state('user.studentsdetails', {
                                    url: '/user/studentsdetails',
                                    views: {
                                        'userview@user': {
                                            templateUrl: '/student/viewstudentsdetail.html',
                                            controller: 'ViewStudentsDetailController',
                                            data: {
                                                requireLogin: true,
                                                adminPrev: true
                                            }
                                        }
                                    }
                                })
                                .state('user.student', {
                                    url: '/user/student/:id',
                                    views: {
                                        'userview@user': {
                                            templateUrl: '/student/studentdetails.html',
                                            controller: 'StudentsDetailController',
                                            data: {
                                                requireLogin: true,
                                                adminPrev: true
                                            }
                                        }
                                    }
                                })
                                .state('user.allstudents', {
                                    url: '/studentsearch',
                                    views: {
                                        'userview@user': {
                                            templateUrl: '/student/search.html',
                                            controller: 'SearchStudentController'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('user.allstudents.edit', {
                                    url: '/edit',
                                    views: {
                                        'edit': {
                                            templateUrl: '/student/edit.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('user.transactions', {
                                    url: '/transactions',
                                    views: {
                                        'userview@user': {
                                            templateUrl: '/transaction/index.html',
                                            controller: 'TransactionViewController'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('user.transactions.add', {
                                    url: '/add',
                                    views: {
                                        'transactionview': {
                                            templateUrl: '/transaction/add.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
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
                                .state('forgetpassword', {
                                    url: '/forgetpassword',
                                    templateUrl: '/user/forget.html',
                                    controller: 'ForgetPasswordController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: false
                                    }
                                })
                                .state('resetpassword', {
                                    url: '/resetpassword/:username/:token',
                                    templateUrl: '/user/reset.html',
                                    controller: 'ResetPasswordController',
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
                                .state('monthlyfee', {
                                    url: '/reports/monthlyfee',
                                    templateUrl: '/reports/monthlyfee.html',
                                    controller: 'MonthlyFeeController',
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
                                            templateUrl: '/admin/staff/index.html',
                                            controller: 'StaffViewController',
                                            data: {
                                                requireLogin: true,
                                                adminPrev: true
                                            }
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.staff.view', {
                                    url: '/view',
                                    views: {
                                        'staffview': {
                                            templateUrl: '/admin/staff/view.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.staff.add', {
                                    url: '/add',
                                    views: {
                                        'staffview': {
                                            templateUrl: '/admin/staff/add.html'
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
                                            templateUrl: '/admin/appusers/index.html',
                                            controller: 'UserViewController',
                                            data: {
                                                requireLogin: true,
                                                adminPrev: true
                                            }
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.appusers.add', {
                                    url: '/add',
                                    views: {
                                        'usersadd': {
                                            templateUrl: '/admin/appusers/add.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.studentsearch', {
                                    url: '/studentsearch',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/student/search.html',
                                            controller: 'SearchStudentController'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.studentsearch.edit', {
                                    url: '/edit',
                                    views: {
                                        'edit': {
                                            templateUrl: '/student/edit.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.movestudents', {
                                    url: '/movestudents',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/student/move.html',
                                            controller: 'MoveStudentsViewController'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.transactions', {
                                    url: '/transactions',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/transaction/index.html',
                                            controller: 'TransactionViewController'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.transactions.add', {
                                    url: '/add',
                                    views: {
                                        'transactionview': {
                                            templateUrl: '/transaction/add.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.oldtransactions', {
                                    url: '/oldtransactions',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/transaction/old.html',
                                            controller: 'OldTransactionViewController'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.oldtransactions.view', {
                                    url: '/oldtransactions/view',
                                    views: {
                                        'oldtransactionview': {
                                            templateUrl: '/admin/transaction/oldview.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                });
                    }
                ]);