// public/core.js
var scotchTodo = angular.module('obraDetApp', [])
    .controller('obraDetController', function ($scope, $http) {
        $('#idObra').hide();

        $scope.obra = {};
        $scope.cuentasBancarias = [];
        $scope.gasto = {};
        $scope.obraId;
        $scope.gastos = {}

        $scope.estimacion = {
            monto: "",
            conceptos_extras: "",
            monto_conceptos_extras: "",
            amortizacion_anticipo: "",
            fondo_garantia: "",
            subtotal: "",
            iva: "",
            total: "",
            fecha_inicio: '',
            fecha_limite: '',
            cuentaBancaria: 0
        }

        $scope.pagado = 0;

        $scope.estimaciones = []

        $scope.gasto = {
            descripcion: "",
            proveedor: '',
            monto: "",
            cuentaBancaria: 0
        }

        $scope.totalGastos;

        $scope.conceptos = [];
        $scope.proveedores = [];

        /**
         * Obtener la obra
         */
        $scope.getObra = function () {
            $http({
                method: 'GET',
                url: '/api/obra/' + $('#idObra').val()
            }).then(function successCallback(response) {
                var obra = response.data;
                $scope.gastosList = response.data.insumos;

                var amortizacion_anticipo = obra.precio_contrato * (obra.porcentaje_anticipo / 100);

                for (var i = 0; i < obra.estimaciones.length; i++) {
                    amortizacion_anticipo -= obra.estimaciones[i].amortizacion_anticipo;
                }

                obra.amortizacion_anticipo = amortizacion_anticipo;

                var fondo_garantia = 0;

                for (var i = 0; i < obra.estimaciones.length; i++) {
                    fondo_garantia += obra.estimaciones[i].fondo_garantia;
                }

                obra.fondo_garantia = fondo_garantia;

                $scope.obra = obra;

                $scope.estimaciones = obra.estimaciones;
                console.log(obra.estimaciones);

                $scope.gastos = obra.gastos;
                $scope.getTotalGastos();
                $scope.gasto = {};
                $scope.calcularPagado();

            }, function errorCallback(response) {
            });
        }

        $scope.getTotalGastos = function () {
            var total = 0;
            for (var i = 0; i < $scope.gastos.length; i++) {
                total += $scope.gastos[i].monto;
            }
            $scope.totalGastos = total;
        }

        $scope.calcularPagado = function () {
            var pagado = 0;
            pagado += $scope.obra.precio_contrato * ($scope.obra.porcentaje_anticipo / 100);
            for (var i = 0; i < $scope.estimaciones.length; i++) {
                pagado += $scope.estimaciones[i].monto;
            }

            $scope.pagado = pagado;
        }

        $scope.guardarGasto = function () {
            $scope.gasto.obra = $scope.obra;

            $http({
                method: 'POST',
                url: '/api/gasto',
                data: $scope.gasto
            }).then(function successCallback(response) {
                console.log(response);
                $scope.getObra();
            }, function errorCallback(response) {
            });
        }

        $scope.registrarEstimacion = function () {
            $http({
                method: 'POST',
                url: '/api/obra/registrarEstimacion/' + $scope.obra._id,
                data: $scope.estimacion
            }).then(function successCallback(response) {
                console.log(response);
                $scope.getObra();
                $scope.calcularPagado();
                $scope.estimacion = {};
            }, function errorCallback(response) {
            });
        }

        $scope.pagarEstimacion = function (idEstimacion) {
            $http({
                method: 'PUT',
                url: '/api/obra/pagarEstimacion/' + $scope.obra._id + '/' + idEstimacion,
                data: $scope.estimacion
            }).then(function successCallback(response) {
                console.log(response);
                $scope.getObra();
            }, function errorCallback(response) {
            });
        }

        $scope.pagarAnticipo = function () {
            $http({
                method: 'PUT',
                url: '/api/obra/pagarAnticipo/' + $scope.obra._id,
                data: $scope.estimacion
            }).then(function successCallback(response) {
                console.log(response);
                $scope.getObra();
            }, function errorCallback(response) {
            });
        }


        $scope.actualizarValoresEstimacion = function () {
            $scope.estimacion.monto_conceptos_extras = $scope.estimacion.monto + $scope.estimacion.conceptos_extras;
            $scope.estimacion.amortizacion_anticipo = $scope.estimacion.monto * .20
            $scope.estimacion.fondo_garantia = $scope.estimacion.monto_conceptos_extras * .10

            $scope.estimacion.subtotal = $scope.estimacion.monto_conceptos_extras - $scope.estimacion.amortizacion_anticipo - $scope.estimacion.fondo_garantia
            $scope.estimacion.iva = $scope.estimacion.subtotal * .16
            $scope.estimacion.total = $scope.estimacion.subtotal + $scope.estimacion.iva
        }

        /**
         * 
         * @param {*} string 
         * Autocompletar los gastos
         */
        $scope.gastosList = [];
        $scope.complete = function (string) {
            var output = [];
            angular.forEach($scope.gastosList, (insumos) => {
                if (insumos.insumo.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(insumos);
                }
            });
            $scope.filterGastos = output;
            $scope.hideThis = true;
            if (!string) {
                $scope.hideThis = false;
            }
        }
        $scope.hideThis = true;
        $scope.fillTextDescription = function (string) {
            $scope.gasto.descripcion = string.insumo;
            $scope.hideThis = false;
        }

        /**
         * Obtener las cuentas bancarias
         */
        $http({
            method: 'GET',
            url: '/api/cuentaBancaria'
        }).then(function successCallback(response) {
            $scope.cuentasBancarias = response.data;
        }, function errorCallback(response) {
        });

        $scope.getObra();
    });