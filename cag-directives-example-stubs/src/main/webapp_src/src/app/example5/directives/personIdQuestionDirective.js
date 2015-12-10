'use strict';
angular.module('directives').directive('personIdFive', [function () {

    console.log("In personIdTwo's factory method");

    return {
/*
        scope: {
            personId: '=',
            noDisplay: '@'
        },
*/
        restrict: 'E',
        replace: 'true',
        templateUrl: 'example5/directives/personId.tpl.html'
    };

}]);
