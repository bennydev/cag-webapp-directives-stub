'use strict';
angular.module('directives').directive('personIdTwo', [function () {

    console.log("In personIdTwo's factory method");

    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'example3/directives/personId.tpl.html'
    };

}]);
