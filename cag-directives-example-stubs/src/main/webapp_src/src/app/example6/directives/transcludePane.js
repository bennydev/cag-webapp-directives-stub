"use strict";
angular.module('directives').directive('transcludePane', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: false,
        template: '<div style="border: 1px solid black; height: inherit ">' +
            '<div ng-transclude></div>' +
            '</div>'
    };
});