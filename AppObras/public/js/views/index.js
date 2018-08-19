// public/core.js
var scotchTodo = angular.module('indexApp', [])
    .controller('indexController', function ($scope, $http) {

        $scope.user = {};

        // when submitting the add form, send the text to the node API
        $scope.login = function () {

            $http({
                method: 'POST',
                url: '/login',
                data: $scope.user
            }).then(function successCallback(response) {
                $scope.user = {};
                $scope.usuarios = response.data.usuarios;
                swal(response.data.mensaje, {
                    icon: "success",
                });
            }, function errorCallback(response) {
            });
        };

    });