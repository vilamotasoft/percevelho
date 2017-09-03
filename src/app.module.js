(function () {
    'use strict';

    // Injeção de Dependência
    angular.module('perezVelho', [
        'ngRoute'
    ]);

    angular.module('perezVelho').config(perezVelhoConfig);
    perezVelhoConfig.$inject  = [ '$routeProvider', '$locationProvider' ];

    angular.module('perezVelho').run(perezVelhoRun);
    perezVelhoRun.$inject     = [ ];

    // Config method
    function perezVelhoConfig($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                'templateUrl'    : 'src/components/home/home.html',
                'controller'     : 'homeController',
                'reloadOnSearch' : false
            })

            .otherwise({
                'redirectTo': '/'
            });

        $locationProvider.html5Mode(true);

    }

    // Run method
    function perezVelhoRun() {

        window.console.log('Funcionando!');

    }

}());
