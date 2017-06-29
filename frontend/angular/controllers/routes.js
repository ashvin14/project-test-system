app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {

            templateUrl: 'angular/views/login-view.html',
            controller: 'loginController',
            controllerAs:'loginCtrl'
        })
        .when('/forgot-password', {
            templateUrl: 'angular/views/forgot-password.html',
            controller: 'forgotController',
            controllerAs:'forgotCtrl'

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
        .when('/loggedIn/upload', {
            templateUrl: 'views/query-upload.html',
            controller: 'queryUploadController',
            controllerAs: 'queryUpload'

        })

    /*
        .when('/edit/:id',{

            templateUrl     : 'views/edit-view.html',
            controller      :  'editBlogController',
            controllerAs    : 'editBlgCtrl'
        })
*/
    .otherwise({
        //redirectTo:'/'
        template: '<h1>404 page not found</h1>'
    });
}]);
