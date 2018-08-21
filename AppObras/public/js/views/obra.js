// public/core.js
var scotchTodo = angular.module('obraApp', [])
    .controller('obraController', function ($scope, $http) {
        $('#idObra').hide();

        $scope.obra = {};
        $scope.obras = [];
        $scope.cuentasBancarias = [];
        $scope.administradores = [];

        // when submitting the add form, send the text to the node API
        $scope.guardarObra = function () {

            console.log($scope.obra);

            var formData = new FormData();

            formData.append('nombre', $scope.obra.nombre);
            formData.append('precio_contrato', $scope.obra.precio_contrato);
            formData.append('porcentaje_anticipo', $scope.obra.porcentaje_anticipo);
            formData.append('cuentaBancaria', $scope.obra.cuentaBancaria._id);
            formData.append('administrador', $scope.obra.administrador._id);
            formData.append('direccion', $scope.obra.direccion);
            formData.append('fecha_inicio', $scope.obra.fecha_inicio);
            formData.append('fecha_limite', $scope.obra.fecha_limite);

            var file = $('#file')[0].files[0];

            formData.append('file', file);

            console.log(formData);

            $.ajax({
                url: '/api/obra',
                type: 'POST',
                data: formData,
                success: function (data) {
                    alert(data)
                },
                cache: false,
                contentType: false,
                processData: false
            });
        };

        $http({
            method: 'GET',
            url: '/api/obra'
        }).then(function successCallback(response) {
            console.log(response);
            $scope.obras = response.data;
        }, function errorCallback(response) {
        });

        $http({
            method: 'GET',
            url: '/api/cuentaBancaria'
        }).then(function successCallback(response) {
            $scope.cuentasBancarias = response.data;
        }, function errorCallback(response) {
        });

        $http({
            method: 'GET',
            url: '/api/usuario'
        }).then(function successCallback(response) {
            $scope.administradores = response.data.usuarios;
        }, function errorCallback(response) {
        });

    });