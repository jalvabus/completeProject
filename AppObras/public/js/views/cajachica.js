// public/core.js
var scotchTodo = angular.module('cajaApp', [])
    .controller('cajaController', function ($scope, $http) {
        $('#idObra').hide();

        $scope.cuenta = [];

        $http({
            method: 'GET',
            url: '/api/cuentaBancaria/' + $('#idObra').val()
        }).then((response) => {
            $scope.cuenta = response.data;
        }, (err) => {

        });

        $scope.nuevoDeposito = {};
        $scope.registrarDeposito = function () {
            $http({
                method: 'POST',
                url: '/api/cuentaBancaria/' + $('#idObra').val() + '/registrarDeposito',
                data: $scope.nuevoDeposito
            }).then((response) => {
                swal("Deposito realizado", "Deposito realizado!", "success");
                $scope.nuevoDeposito = {};
                $scope.cuenta.depositos = response.data.depositos;
            }, (error) => {

            })
        }

        $http({
            method: 'GET',
            url: '/api/cuentaBancaria'
        }).then(function successCallback(response) {
            let cuentas = response.data;
            for (var i = 0; i < cuentas.length; i++) {

                var depositos = cuentas[i].depositos;
                var gastos = cuentas[i].gastos;


                var totalCuenta = 0;

                for (var c = 0; c < depositos.length; c++) {
                    totalCuenta += depositos[c].monto;
                }

                for (var c = 0; c < gastos.length; c++) {
                    totalCuenta -= gastos[c].monto;
                }

                cuentas[i].monto = totalCuenta;
            }

            $scope.cuentas = cuentas;

            /*
            swal(response.data, {
                icon: "success",
            });
            */
        }, function errorCallback(response) {
        });

    });