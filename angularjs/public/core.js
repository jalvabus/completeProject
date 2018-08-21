// public/core.js
var scotchTodo = angular.module('scotchTodo', [])
    .directive('ngFiles', ['$parse', function ($parse) {

        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files });
            });
        };

        return {
            link: fn_link
        }
    }])
    .controller('mainController', function ($scope, $http) {
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        $http.get('/api/todos')
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

        // when submitting the add form, send the text to the node API
        $scope.createTodo = function () {
            $http.post('/api/todos', $scope.formData)
                .success(function (data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        // delete a todo after checking it
        $scope.deleteTodo = function (id) {
            $http.delete('/api/todos/' + id)
                .success(function (data) {
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.product = {};

        $scope.submit = () => {
            var formData = new FormData;
            for (key in $scope.product) {
                formData.append(key, $scope.product[key]);
            }
            var file = $('#file')[0].files[0];
            var image = $('#image')[0].files[0];

            formData.append('file', file);
            formData.append('image', image);
            console.log(formData);

            $.ajax({
                url: '/api/fileupload',
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

        $('#file').fileinput({
            theme: 'fa',
            language: 'es',
            uploadUrl: '#',
            allowedFileExtensions: ['XLSX'],
            removeLabel: "Eliminar",
            removeClass: 'btn waves-effect waves-light red accent-2',
            browseLabel: 'Seleccionar archivo XLSX',
            uploadClass: 'btn waves-effect waves-light purple lightrn-1',
            showUpload: false
        });

    });