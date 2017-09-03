(function () {
    'use strict';

    // registering on angular
    angular.module('perezVelho').controller('MainController', MainController);

    // injecting dependencies
    MainController.$inject = [
        '$scope'
    ];

    // Main Controller
    function MainController($scope) {

        window.console.log($scope);

    }
}());
