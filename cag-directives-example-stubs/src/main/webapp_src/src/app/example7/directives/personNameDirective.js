"use strict";
angular.module('directives').directive('personName', function () {

    return {
        scope: true,
        restrict: 'E',
        require: '^personalInfo',
        replace: 'true',
        templateUrl: 'example7/directives/personName.tpl.html',
        link: function(scope, elem, attrs, controller) {
            scope.logMessage = 'personName ready for input.';
            controller.logInput(scope.logMessage);
        }
    };

});