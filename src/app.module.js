(function () {
    'use strict';

    // Injeção de Dependência
    angular.module('perezVelho', [
        'ngMaterial',
        'ngAnimate',
        'ngMessages',
        'ngRoute'
    ]);

    angular.module('perezVelho').config(perezVelhoConfig);
    perezVelhoConfig.$inject  = [ '$mdThemingProvider', '$routeProvider', '$locationProvider' ];

    angular.module('perezVelho').run(perezVelhoRun);
    perezVelhoRun.$inject     = [ ];

    // Config method
    function perezVelhoConfig($mdThemingProvider, $routeProvider, $locationProvider) {

        $mdThemingProvider
            .theme('default')
            .primaryPalette('pink', {
                'default': '400',
                'hue-1': '100',
                'hue-2': '600',
                'hue-3': 'A100'
            })
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('purple', {
                'default': '200'
            }).dark();

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
