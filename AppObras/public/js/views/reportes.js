// public/core.js
var scotchTodo = angular.module('reportesApp', [])
    .controller('reportesController', function ($scope, $http) {

        /**
         * Reportes del Otro sistema 
         */
        $scope.obras = {};
        $scope.proveedores = [];
        $scope.obras = [];
        $scope.obraSeleccionada = {}
        $scope.estimaciones = [];
        $scope.form = {
        }
        $scope.estimacionSeleccionada = {
            proveedor: 0
        }

        $scope.gastos = [];

        $scope.totalGastos = 0;

        $scope.getObras = function () {
            $http({
                method: 'GET',
                url: '/api/obra'
            }).then(function successCallback(response) {
                console.log(response);
                $scope.obras = response.data;
            }, function errorCallback(response) {
            });
        }

        $scope.getProveedores = function () {
            $http({
                method: 'GET',
                url: '/api/proveedor'
            }).then(function successCallback(response) {
                $scope.proveedores = response.data;
            }, function errorCallback(response) {
            });
        }

        $scope.verTabla = true;
        $scope.viewReport = function () {
            console.log($scope.gastosBusqueda);
            $scope.verTabla = false;
            $scope.gastosBusqueda.obra = $scope.obraSeleccionada._id;
            /*
            let fecha_inicio = $('#fecha_inicio').val();
            let fecha_fin = $('#fecha_limite').val();
            $scope.gastosBusqueda.fecha_fin = fecha_fin;
            $scope.gastosBusqueda.fecha_inicio = fecha_inicio;
            */
            $http({
                method: 'POST',
                url: '/api/gasto/reporte',
                data: $scope.gastosBusqueda
            }).then(function successCallback(response) {
                console.log(response);
                $scope.gastos = response.data;
                $scope.getTotalGastos();
            }, function errorCallback(response) {
            });

        }


        $scope.setObra = function () {
            $scope.gastos = {};
            if ($scope.form.obra_form === 0) {
                $scope.estimacionSeleccionada._id = 0;
            } else {

                $http({
                    method: 'GET',
                    url: '/api/obra/' + $scope.form.obra_form
                }).then(function successCallback(response) {
                    console.log(response);
                    $scope.obraSeleccionada = response.data;

                    $scope.estimaciones = {};

                    $scope.obraSeleccionada.estimaciones.forEach((estimacion) => {
                        estimacion.totalGatos = 0;

                        estimacion.cuentaBancaria.gasto.forEach((gasto) => {
                            estimacion.totalGatos += Number(gasto.monto);
                        })

                        estimacion.totalDepositos = 0;
                        estimacion.cuentaBancaria.depositos.forEach((deposito) => {
                            estimacion.totalDepositos += Number(deposito.monto);
                        })

                        estimacion.utilidad = 0;
                        estimacion.utilidad = Number(estimacion.total) - estimacion.totalGatos;
                    })

                    $scope.getTotalGastos();

                }, function errorCallback(response) {
                });
            }

        }

        $scope.setEstimacion = function (estimacion) {
            $scope.verTabla = false;
            if ($scope.estimacionSeleccionada._id != '0') {
                $http({
                    method: 'GET',
                    url: '/api/obra/recuperarEstimacion/' + $scope.obraSeleccionada._id + '/' + $scope.estimacionSeleccionada._id
                }).then(function successCallback(response) {
                    console.log(response);

                    $scope.estimacionSeleccionada = response.data;

                    var datos = {
                        obra: $scope.obraSeleccionada._id
                    }

                    $http({
                        method: 'POST',
                        url: '/api/gasto/getGasto',
                        data: datos
                    }).then(function successCallback(response) {
                        console.log(response);
                        $scope.gastos = response.data;
                        $scope.getTotalGastos();
                    }, function errorCallback(response) {
                    });
                }, function errorCallback(response) {
                });
            } else {
                setObra();
            }
        }

        $scope.getTotalGastos = function () {
            var total = 0;
            for (var i = 0; i < $scope.gastos.length; i++) {
                total += $scope.gastos[i].monto;
            }
            $scope.totalGastos = total;
        }


        $scope.getObras();
        $scope.getProveedores();

        $scope.materiales = [];
        $scope.getMateriales = function () {
            $http({
                method: 'GET',
                url: '/api/insumo'
            }).then(function successCallback(response) {
                console.log(response);
                $scope.materiales = response.data;
            }, function errorCallback(response) {
            });
        }

        $scope.getMateriales();

        $scope.gastosCero = function () {
            $scope.gastos = {};
            $scope.verTabla = true;
        }

        /**
         * Autocompletar Gastos
         */

        $scope.materiales = [];
        $scope.gastosBusqueda = {};
        $scope.complete = function (string) {
            var output = [];
            angular.forEach($scope.materiales, (insumo) => {
                if (insumo.insumo.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(insumo);
                }
            });
            $scope.filterMateriales = output;
            $scope.hideThis = true;
            if (!string) {
                $scope.hideThis = false;
            }
        }
        $scope.hideThis = true;
        $scope.fillTextMaterial = function (string) {
            $scope.gastosBusqueda.descripcion = string.insumo;
            $scope.hideThis = false;
        }

        $scope.reload = function() {
            window.location.reload();
        }

        $scope.seeEstimacion = false;
        $scope.getEstimacion = function (estimacion) {
            console.log(estimacion);
            $scope.seeEstimacion = true;
            $scope.estimacion = estimacion;
        }

        $scope.hide = function () {
            $scope.seeEstimacion = false;
        }
    });