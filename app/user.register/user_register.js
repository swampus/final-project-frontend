angular.module('myApp.userRegister', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user_register', {
            templateUrl: 'user.register/user_register.html',
            controller: 'UserRegisterCtrl'
        });
    }])

    .controller('UserRegisterCtrl', ['$scope', '$http', function ($scope, $httpClient) {

    }]);