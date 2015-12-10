'use strict';
angular.module('directives').directive('personalInfo', ['$log', function ($log) {


    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'example7/directives/personInfo.tpl.html',
        controller: ['$scope', function($scope) {
            // this -> controller
            this.logInput = function(logMessage) {
                $log.info(logMessage);
            };
        }]
    };

}]);
