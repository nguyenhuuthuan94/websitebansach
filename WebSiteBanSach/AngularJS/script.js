
var myApp = angular.module("myApp");

function HomeController($scope, $http) {
    $scope.currentPage = 1;
    $scope.pageSize = 9;

    $http({
        method: 'GET',
        url: '../api/home/all'
    })
    .success(function(data, status){
        $scope.products = data;
    })
    .error(function(data, status){
        alert(status);
    });

};

myApp.cotroller('HomeController', HomeController);