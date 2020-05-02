'use strict';
angular.module('myApp.userLogin', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'userLoginCtrl'
        });
    }])

    .controller('userLoginCtrl', ['$scope', '$http',
        function ($scope, $httpClient) {
            $scope.submit = function () {

                console.log('Username: ' + $scope.username);
                console.log('Password: ' + $scope.password);

                $httpClient.get("http://localhost:8080/api/v1/rest/Auth/auth(" + $scope.username + ")")
                    .then(function (response) {

                        console.log( "FIRST RESPONSE === ");
                        console.log( response.data.type);

                        if (response.data.type === "Response") {
                            var cryptedPassresponse = response.data.token + "__" + $scope.password;

                            var authRequestDTO = {
                                username: $scope.username,
                                crypted_token: cryptedPassresponse
                            };


                            var postData = JSON.stringify(authRequestDTO);
                            console.log(postData);

                            $httpClient.post("http://localhost:8080/api/v1/rest/Auth/auth/login", postData)
                                .then(function (response) {
                                    if(response.data.type === "ERROR"){
                                        alert('AUTH FAILED: ' + response.data.message);
                                    }
                                    document.getElementById("auth_content").textContent = response.data.secretContnet;
                                    console.log("Auth response:");
                                   console.log(response);
                                });


                        }

                        console.log(response);
                    }).catch(function (error) {
                    console.log(error);
                });
            }

        }]);

