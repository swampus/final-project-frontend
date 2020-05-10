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

        $scope.buttonClick = function ($bookId) {
            console.log($bookId);
            $httpClient.get("http://localhost:8080/api/v1/rest/BookContent.svc/book(" + $bookId + ")/page(1)")
                .then(function (response) {
                    console.log(response);
                    document.getElementById("next").style.display = "block";
                    document.getElementById("prev").style.display = "none";
                    document.getElementById("book_list").style.display = "none";
                    document.getElementById("book_content").style.display = "block";
                    document.getElementById("book_content_value").textContent = response.data.content;
                    document.getElementById("pageNumberSpan").textContent = "[ 1 ]";
                    $scope.bookIdForm = $bookId;
                    $scope.pageNumber = 1;


                }).catch(function (error) {
                console.log(error);
            })
        };

        $scope.nextClick = function () {



            var goToPage = false;
            var stop = false;

            if($scope.goToPage > $scope.pageNumber){

                $httpClient.get("http://localhost:8080/api/v1/rest/BookContent.svc/book(" + $scope.bookIdForm + ")/page("
                    + $scope.goToPage + ")").then(function (response) {
                    console.log(response);
                    if(response.data.content !== null || response.data.content !== ""){
                        console.log("response.data.content");
                        console.log(response.data.content);
                        goToPage = true;
                    }else{
                        stop = true;
                        goToPage = true;
                    }
                }).catch(function (error) {
                   alert('page does not exists!');
                    stop = true;
                    goToPage = false;
                })

            }
            if(goToPage){
                $scope.pageNumber = $scope.goToPage;
            }



            if(!stop){
                if(!goToPage) {
                    $scope.pageNumber = $scope.pageNumber + 1;
                }
                $httpClient.get("http://localhost:8080/api/v1/rest/BookContent.svc/book(" + $scope.bookIdForm + ")/page("
                    + $scope.pageNumber + ")").then(function (response) {
                    console.log(response);

                    document.getElementById("book_content_value").textContent = response.data.content;
                    document.getElementById("pageNumberSpan").textContent = "[ " + $scope.pageNumber + " ]";

                    document.getElementById("prev").style.display = "block";
                }).catch(function (error) {
                    document.getElementById("book_content_value").textContent = "Book Ended";
                    document.getElementById("pageNumberSpan").textContent = "[ " + $scope.pageNumber + " ]";
                    document.getElementById("next").style.display = "none";
                })


            }


        };

        $scope.backClick = function () {
            $scope.pageNumber = $scope.pageNumber - 1;
            document.getElementById("pageNumberSpan").textContent = "[ " + $scope.pageNumber + " ]";
            document.getElementById("next").style.display = "block";
            if($scope.pageNumber === 1){
                document.getElementById("prev").style.display = "none";
            }

            $httpClient.get("http://localhost:8080/api/v1/rest/BookContent.svc/book(" + $scope.bookIdForm + ")/page("
                + $scope.pageNumber + ")").then(function (response) {
                console.log(response);
                document.getElementById("book_content_value").textContent = response.data.content;
            }).catch(function (error) {
                console.log(error);
            })


        };

        $scope.goToBookList = function () {
            document.getElementById("book_list").style.display = "block";
            document.getElementById("book_content").style.display = "none";
            document.getElementById("book_content_value").textContent = "";
        }

        $scope.clickFilter = function () {
            document.getElementById('isa_error').textContent = "";
            document.getElementById('isa_error').style.display = "none";

            $httpClient.get("http://localhost:8080/api/v1/rest/Book.svc/books$filter=" + searchStr.value)
                .then(function (response) {
                    if (response.data.length > 0) {
                        $scope.arrRec = response.data;
                    } else {
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