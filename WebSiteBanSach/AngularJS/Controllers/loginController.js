
myApp.controller("loginController", function ($scope, $location, DataSharing, SinhVienService, $http, $timeout) {

    $scope.url = 'http://localhost:17146/';
    $scope.goSignup = function () {
        $location.path('/signup');
    }
    $scope.signup = function () {
        var userName = $scope.sigup_userName;
        var password = $scope.sigup_password;
        var confirmPassword = $scope.confirm_sigup_password;

        SinhVienService.signup(userName, password, confirmPassword).then(function (respone) {
            alert('Sign up successfully....');
            $location.path('/login');
        }, function (error) {
            alert('Sign up fail, because ' + error);
        });

    };
    $scope.loginAndGetAccessToken = function () {
        var userName = $scope.userName;
        var password = $scope.password;
        $http({
            method: "post",
            url: $scope.url + 'Token',
            headers: { 'Authorization': 'Bearer ' + DataSharing.infoToken.access_token },
            data: 'grant_type=password&username=' + userName + '&password=' + password,
        }).then(function (respone) {
            console.log(respone);
            DataSharing.infoToken.expires = respone.data.expires;
            DataSharing.infoToken.issued = respone.data.issued;
            DataSharing.infoToken.access_token = respone.data.access_token;
            DataSharing.infoToken.expires_in = respone.data.expires_in;
            DataSharing.infoToken.token_type = respone.data.token_type;
            DataSharing.infoToken.userName = respone.data.userName;


            var scope = angular.element(document.getElementById('id')).scope();

            $timeout(function () {
                scope.titleUser = respone.data.userName;
            });
            $('#icon').removeClass('glyphicon-log-in');
            $('#icon').addClass('glyphicon-user');
            $('.btn-success').addClass('disabled');
            $('.hidden').removeClass('hidden');
            alert('Login successfully...');
            $location.path('/home');
        }, function (error) {
            alert('Log in fail, because ' + error);
        });

    };
});