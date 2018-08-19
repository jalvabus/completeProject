// public/core.js
var scotchTodo = angular.module('scotchTodo', [])
    .controller('mainController', function ($scope, $http) {
        $scope.user = {};
        $scope.userNew = {};

        // when submitting the add form, send the text to the node API
        $scope.create = function () {
            $http.post('/api/user', $scope.userNew)
                .success(function (data) {
                    $scope.userNew = {}; // clear the form so our user is ready to enter another
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        // when submitting the add form, send the text to the node API
        $scope.login = function () {
            $http.post('/login', $scope.user)
                .success(function (data) {
                    window.location = '/ingresar';
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

    });