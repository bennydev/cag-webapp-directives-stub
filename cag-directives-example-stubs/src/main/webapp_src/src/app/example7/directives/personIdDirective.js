"use strict";
angular.module('directives').directive('personIdSeven', function() {

    return {
        scope: true,
        restrict: 'E',
        replace: 'true',
        templateUrl: 'example7/directives/personId.tpl.html',
        link: function(scope, elem, attrs) {
        }
    };

});