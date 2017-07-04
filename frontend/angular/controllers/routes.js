app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {

            templateUrl: 'angular/views/login-view.html',
            controller: 'loginController',
            controllerAs: 'loginCtrl'
        })
        .when('/forgot-password', {
            templateUrl: 'angular/views/forgot-password.html',
            controller: 'forgotController',
            controllerAs: 'forgotCtrl'

        })
        .when('/otpverification', {

            templateUrl: 'angular/views/otp-verification.html',
            controller: 'otpController',
            controllerAs: 'otpCtrl'
        })
        .when('/change-password', {
            templateUrl: 'angular/views/change-password.html',
            controller: 'passController',
            controllerAs: 'passCtrl'

        })
        .when('/admin/create_test', {
            templateUrl: 'angular/views/admin_create_test.html',
            controller: 'createTestController',
            controllerAs: 'createTestCtrl'
        })
        .when('/admin/create_test/:id', {
            templateUrl: 'angular/views/create-question.html',
            controller: 'createQuestionController',
            controllerAs: 'createQuesCtrl'

        })
        .when('/user/take_test', {
            templateUrl: 'angular/views/user-dashboard.html',
            controller: 'alltestloader',
            controllerAs: 'testLoader'

        }).when('/user/take_test/:id', {
            templateUrl: 'angular/views/attempt_test.html',
            controller: 'singleTestLoader',
            controllerAs: 'singleTestCtrl'

        })
        .when('/user/take_test/scorecard/:id', {
            templateUrl: 'angular/views/scorecard.html',
            controller: 'scorecardController',
            controllerAs: 'scorecard'
        })
        .when('/signup', {
            templateUrl: 'angular/views/signup-view.html',
            controller: 'signupController',
            controllerAs: 'signupCtrl'
        })
        .when('/user', {
            controller: 'testdashboard',
            templateUrl: 'angular/views/testdashboard.html',
            controllerAs: 'testdashboardCtrl'
        })
        .when('/user/:test_id', {
            controller: 'analyticsController',
            controllerAs: 'analyticsCtrl',
            templateUrl: 'angular/views/analytics.html'
        })
        .when('/admin', {
            controller: 'adminController',
            templateUrl: 'angular/views/admin.html',
            controllerAs: 'adminCtrl'
        })
        .when('/admin/:id', {
            controller: 'viewController',
            templateUrl: 'angular/views/singleprofile.html',
            controllerAs: 'viewCtrl'
        })
        .when('/admin/user/:id', {
            controller: 'analyticsControllerAdmin',
            controllerAs: 'analyticsCtrlForAdmin',
            templateUrl: 'angular/views/analyticsForAdmin.html'

        })

    .otherwise({
        //redirectTo:'/'
        template: '<h1>404 page not found</h1>'
    });
}]);
