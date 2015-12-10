"use strict";
angular.module('directives').directive('personIdSeven', function() {

    return {
        scope: true,
        restrict: 'E',
        require: '^personalInfo',
        replace: 'true',
        templateUrl: 'example7/directives/personId.tpl.html',
        link: function(scope, elem, attrs, controller) {
            scope.logMessage = 'PersonId ready for input';
            controller.logInput(scope.logMessage);
        }
    };

});