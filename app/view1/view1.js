'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {

        //var values = JSON.stringify(model)
        $scope.name = "";
        $scope.surname = "";
        $scope.email = "";
        $scope.user_pk = "";
        $scope.address = "";
        $scope.password = "";
        $scope.password_re = "";

        $scope.submit = function () {
            var userDTO = {
                name: $scope.name,
                surname: $scope.surname,
                email: $scope.email,
                user_pk: $scope.user_pk,
                address: $scope.address,
            };

            var userCreateRequestDTO= {
                user_dto: userDTO,
                password_hash:$scope.password
            };


            var submitData = JSON.stringify(userCreateRequestDTO);
            console.log(submitData);
            $http.post("http://localhost:8080/api/v1/rest/User/user", submitData)
                .then(function (response) {
                    console.log(response);
                    alert('New id: ' + response.data.user_id);
                });
            }



    }]);


