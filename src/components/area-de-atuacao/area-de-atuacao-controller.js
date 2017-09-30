(function () {
    'use strict';

    // registering on angular
    angular.module('vilaMota').controller('areaDeAtuacaoController', AreaDeAtuacaoController);

    // injecting dependencies
    AreaDeAtuacaoController.$inject = [
        '$scope'
    ];

    // Main Controller
    function AreaDeAtuacaoController($scope, $mdSidenav) {
        var list = [],
            i;

        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        for (i = 0; i < 10; i++) {
            list.push({
                'name'  : 'List Item ' + i,
                'idx'   : i
            });
        }
        $scope.list = list;

    }
}());
