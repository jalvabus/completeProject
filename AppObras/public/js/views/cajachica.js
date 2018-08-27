// public/core.js
var scotchTodo = angular.module('cajaApp', [])
    .controller('cajaController', function ($scope, $http) {
        $('#idObra').hide();

        $scope.obra = {};

        $scope.gastos = [];

        $scope.depositosTotales = 0;
        $scope.gastosTotales = 0;
        $scope.total = 0;

        $scope.deposito = { }

        $scope.cuentasBancarias = [];
        $scope.cuentaBancaria = '';

        $scope.calcularDepositos = function () {

            for (let deposito of $scope.obra.caja_chica.depositos) {
                $scope.depositosTotales += deposito.monto;
            }
        }

        $scope.calcularGastos = function () {
            for (let gasto of $scope.obra.caja_chica.gastos) {
                $scope.gastosTotales += gasto.total;
            }
        }

        $scope.obtenerObra = function () {

            $http({
                method: 'GET',
                url: '/api/obra/' + $('#idObra').val()
            }).then((response) => {
                console.log(response);
                $scope.obra = response.data;
                $scope.gastos = $scope.obra.caja_chica.gastos;

                $scope.calcularDepositos();
                $scope.calcularGastos();

                $scope.total = $scope.depositosTotales - $scope.gastosTotales;
            }, (err) => {

            });
        }

        $scope.depositar = function () {
            console.log($scope.deposito);
            $http({
                method: 'PUT',
                url: '/api/caja-chica/' + $scope.obra.caja_chica._id + '/depositar/',
                data: $scope.deposito
            }).then((response) => {
                console.log(response);
                let gasto = {
                    descripcion: "Caja Chica " + $scope.obra.nombre,
                    monto: $scope.deposito.monto,
                    cuentaBancaria: $scope.cuentaBancaria._id
                }
                $http({
                    method: 'PUT',
                    url: '/api/gasto',
                    data: gasto
                }).then((response) => {
                    console.log(response);
                    $scope.obtenerObra();
                }, (err) => {

                });
            }, (err) => {

            });
        }

        $scope.obtenerObra();

    });