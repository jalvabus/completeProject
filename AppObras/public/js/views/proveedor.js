// public/core.js
var scotchTodo = angular.module('proveedorApp', [])
    .controller('proveedorController', function ($scope, $http) {

        $scope.proveedores = {};

        $http({
            method: 'GET',
            url: '/api/proveedor'
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.proveedores = response.data;
        }, function errorCallback(response) {
        });

        $scope.guardarProveedor = function() {
            $http({
                method: 'POST',
                url: '/api/proveedor',
                data: $scope.proveedor
            }).then(function successCallback(response) {
                $scope.proveedor = {};
                $scope.proveedores.push(response.data);
            }, function errorCallback(response) {
            });
        }

    });