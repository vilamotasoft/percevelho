(function () {
    'use strict';

    // Injeção de Dependência
    angular.module('vilaMota', [
        'ngRoute'
    ]);

    angular.module('vilaMota').config(vilaMotaConfig);
    vilaMotaConfig.$inject  = [ '$routeProvider', '$locationProvider' ];

    angular.module('vilaMota').run(vilaMotaRun);
    vilaMotaRun.$inject     = [ ];

    // Config method
    function vilaMotaConfig($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                'templateUrl'    : 'src/components/home/home.html',
                'controller'     : 'homeController',
                'reloadOnSearch' : false
            })

            .when('/escritorio', {
                'templateUrl'    : 'src/components/escritorio/escritorio.html',
                'controller'     : 'escritorioController',
                'reloadOnSearch' : false
            })

            .when('/area-de-atuacao', {
                'templateUrl'    : 'src/components/area-de-atuacao/area-de-atuacao.html',
                'controller'     : 'areaDeAtuacaoController',
                'reloadOnSearch' : false
            })

            .when('/noticias', {
                'templateUrl'    : 'src/components/noticias/noticias.html',
                'controller'     : 'noticiasController',
                'reloadOnSearch' : false
            })

            .when('/contato', {
                'templateUrl'    : 'src/components/contato/contato.html',
                'controller'     : 'contatoController',
                'reloadOnSearch' : false
            })

            .otherwise({
                'redirectTo': '/'
            });

        $locationProvider.html5Mode(true);

    }

    // Run method
    function vilaMotaRun() {

        window.console.log('Funcionando!');

    }

}());
