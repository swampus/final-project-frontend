'use strict';

angular.module('myApp.books', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/books', {
            templateUrl: 'books/books.html',
            controller: 'BooksCtrl',
            cache: false
        });
    }])

    .controller('BooksCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $httpClient) {
        $scope.arrRec = [];
        $scope.searchStr = "";

        $httpClient.get("http://localhost:8080/api/v1/rest/Book.svc/books")
            .then(function (response) {
                $scope.arrRec = response.data;
                console.log($scope.arrRec);
            }).catch(function (error) {
            console.log(error);
        });


        $scope.clickFilter = function () {
            document.getElementById('isa_error').textContent = "";
            document.getElementById('isa_error').style.display = "none";

            $httpClient.get("http://localhost:8080/api/v1/rest/Book.svc/books$filter=" + searchStr.value)
                .then(function (response) {
                    if(response.data.length > 0){
                        $scope.arrRec = response.data;
                    }else{
                        document.getElementById('isa_error').textContent = "No Books Found!";
                        document.getElementById('isa_error').style.display = "block";
                        $scope.arrRec = null;
                    }

                }).catch(function (error) {
                console.log(error);
            })
        };
    }]);

function showAdvanced() {
    var style = document.getElementById("advanced_search").style.display;
    console.log(style);
    if (style === "block") {
        document.getElementById("advanced_search").style.display = "none";
    } else {
        document.getElementById("advanced_search").style.display = "block";
    }

}