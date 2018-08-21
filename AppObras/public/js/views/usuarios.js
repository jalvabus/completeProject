// public/core.js
var scotchTodo = angular.module('usuariosApp', [])
    .controller('usuariosController', function ($scope, $http) {

        $scope.usuario = {};
        $scope.usuarios = {};
        $scope.cuentas = [];

        // when submitting the add form, send the text to the node API
        $scope.guardarAdministrador = function () {

            $http({
                method: 'POST',
                url: '/api/usuario',
                data: $scope.usuario
            }).then(function successCallback(response) {
                $scope.usuarios.push(response.data);
                swal("Usuario creado con exito", {
                    icon: "success",
                });
            }, function errorCallback(response) {
            });
        };

        $http({
            method: 'GET',
            url: '/api/usuario'
        }).then(function successCallback(response) {
            console.log(response);
            $scope.usuarios = response.data.usuarios;
        }, function errorCallback(response) {
        });

    });