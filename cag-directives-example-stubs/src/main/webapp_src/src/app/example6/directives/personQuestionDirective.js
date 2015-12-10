'use strict';
angular.module('directives').directive('personInfo', [ function () {


    return {
        scope: true,
        restrict: 'E',
        replace: 'true',
        templateUrl: 'example6/directives/personInfo.tpl.html'
    };

}]);
