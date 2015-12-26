

myApp.controller('tempController', function ($location, $scope, SinhVienService, DataSharing, $timeout) {

    $scope.titleUser = 'Log in';

    //$scope.goAdd = function () {
    //    if (DataSharing.infoToken.access_token == '')
    //        alert('Pleased log in....');
    //    else
    //        $location.path("/add");
    //}
    $scope.goHome = function () {
        if (DataSharing.infoToken.access_token == '')
            alert('Pleased log in....');
        else
            $location.path("/showall");
    }
    $scope.login = function () {

        $location.path("/login");
    }
    $scope.logout = function () {
        SinhVienService.logout().then(function (respone) {

            DataSharing.infoToken.expires = '';
            DataSharing.infoToken.issued = '';
            DataSharing.infoToken.access_token = '';
            DataSharing.infoToken.expires_in = '';
            DataSharing.infoToken.token_type = '';
            DataSharing.infoToken.userName = '';

            $('.btn-warning').addClass('hidden');
            $('.btn-success').removeClass('disabled');
            var scope = angular.element(document.getElementById('id')).scope();
            $timeout(function () {
                scope.titleUser = 'Log in';
                $('.glyphicon').removeClass('glyphicon-user');
                $('.glyphicon').addClass('glyphicon-log-in');
            });
            console.log(scope.titleUser);
            $location.path('/home');
        },
            function (err) {
                console.log('that bai');

            });

    }
});