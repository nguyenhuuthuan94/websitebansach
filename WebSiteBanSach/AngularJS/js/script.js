
var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: 'Views/Home/Index.html', controller: 'HomeController' }).
        when('/home', { templateUrl: 'Views/Home/Index.html', controller: 'HomeController' }).
        when('/login', { templateUrl: 'Views/User/login.html', controller: 'LoginController' }).
        when('/sigup', { templateUrl: 'Views/User/signup.html', controller: 'LoginController' }).
    //    when('/detail', { templateUrl: 'Views/detail.html', controller: 'DetailController' }).
    //    when('/add', { templateUrl: 'Views/add.html', controller: 'AddController' }).
    //otherwise({ redirectTo: '/index' });
    otherwise({ redirectTo: '/' });

});

myApp.controller('HomeController', function($scope, $http) {
    $scope.currentPage = 1;
    $scope.pageSize = 9;
    //alert('fdfaf');
    $http({
        method: 'GET',
        url: '../../../api/home/all'
    })
    .success(function(data, status){
        $scope.products = data;
    })
    .error(function(data, status){
        alert(status);
    });

});

//myApp.controller('HomeController', HomeController);
