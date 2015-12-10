'use strict';
/**
 This is a minimal template for claim angular apps.
 */
angular.module('demoApp', [
        //////////////////
        // Core modules //
        //////////////////
        'ngAnimate',
        'ngResource',
        'ngSanitize',
        'ngMessages',
        /////////////////////////
        // Third party modules //
        /////////////////////////
        'ui.router',
        //////////////////////
        // Template modules //
        //////////////////////
        'templates-app',
        'templates-common',
        /////////////////
        // App modules //
        /////////////////
        'controllers',
        'services',
        'directives',
        'filters',
        'integration'])
    .controller('AppController', ['$scope', '$state', '$rootScope',
        function ($scope, $state, $rootScope) {
            $scope.pageTitle = "Template for angular claim apps";
        }])
    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/example1');

        $stateProvider
            .state('example1', {
                url: '/example1',
                views: {
                    'main': {
                        templateUrl: 'example/example.tpl.html',
                        controller: 'ExampleCtrl'
                    }
                }
            }).state('example2', {
            url: '/example2',
            views: {
                'main': {
                    templateUrl: 'example2/example2.tpl.html',
                    controller: 'Example2Ctrl'
                }
            }}).state('example3', {
            url: '/example3',
            views: {
                'main': {
                    templateUrl: 'example3/example3.tpl.html',
                    controller: 'Example3Ctrl'
                }
            }}).state('example4', {
            url: '/example4',
            views: {
                'main': {
                    templateUrl: 'example4/example4.tpl.html',
                    controller: 'Example4Ctrl'
                }
            }}).state('example5', {
            url: '/example5',
            views: {
                'main': {
                    templateUrl: 'example5/example5.tpl.html',
                    controller: 'Example5Ctrl'
                }
            }}).state('example6', {
            url: '/example6',
            views: {
                'main': {
                    templateUrl: 'example6/example6.tpl.html',
                    controller: 'Example6Ctrl'
                }
            }}).state('example7', {
            url: '/example7',
            views: {
                'main': {
                    templateUrl: 'example7/example7.tpl.html',
                    controller: 'Example7Ctrl'
                }
            }});

    }]);

angular.module('services', []);
angular.module('directives', ['services', 'filters']);
angular.module('filters', []);
angular.module('controllers', ['services']);

