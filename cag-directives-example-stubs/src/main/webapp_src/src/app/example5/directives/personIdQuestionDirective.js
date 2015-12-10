'use strict';
angular.module('directives').directive('personIdFive', [function () {

    console.log("In personIdFive's directive factory method");

    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'example5/directives/personId.tpl.html'
    };

}]);
