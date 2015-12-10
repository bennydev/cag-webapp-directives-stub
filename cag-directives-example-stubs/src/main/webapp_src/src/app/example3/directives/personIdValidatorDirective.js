"use strict";
angular.module('directives').directive('personIdValid', ['$log', function ($log) {
    $log.log("in personIdValid");
    return {
        // Isolated scope
        scope: {
            // one-way binding to person-id-attr
            personId: '@personIdAttr'
        },
        // As attribute only
        restrict: 'A',
        link: function (scope, elem, attrs) {
            // Bind the 'blur' event
            elem.bind('blur', function () {
                // Triggered by blur
                if (scope.personId) {
                    if (scope.personId.length > 12 || scope.personId.length < 12) {
                        $log.log('personId is not valid');
                    } else {
                        $log.log('personId is valid');
                    }
                } else {
                    $log.log('personId empty');
                }
            });

            $log.log('done binding');
        }
    };
}]);