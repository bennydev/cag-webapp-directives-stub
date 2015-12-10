"use strict";
angular.module('directives').directive('personIdValidFive', ['$log', function ($log) {
    $log.log("in personIdValidFive, calling parent scope function in isolated scope");

    return {
        // Isolated scope
        scope: {
            // two-way binding to personId - means we can change the value...
            personId: '=',
            //
            noDisplay: '&'
        },
        // As attribute only
        restrict: 'A',
        link: function (scope, elem, attrs) {
            // Bind the 'blur' event
            elem.bind('blur', function () {
                // Triggered by blur
             });

            elem.bind('input', function() {

            });

            $log.log('done binding');
        }
    };
}]);