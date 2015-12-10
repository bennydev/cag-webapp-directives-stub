'use strict';
angular.module('directives').directive('personalInfo', ['$log', function ($log) {


    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'example7/directives/personInfo.tpl.html'
    };

}]);
