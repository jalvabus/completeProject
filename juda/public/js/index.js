let app = angular.module('indexApp', []);

app.controller('indexController', ($scope, $http) => {
    $scope.user = {};

    $scope.login = function () {
        console.log($scope.user);
        $http.post('/login', $scope.user)
            .success(function (data) {
                $scope.user = {}; // clear the form so our user is ready to enter another
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };


});