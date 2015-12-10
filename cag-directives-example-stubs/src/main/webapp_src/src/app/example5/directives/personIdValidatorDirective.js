"use strict";
angular.module('directives').directive('personIdValidFive', ['$log', function ($log) {
    $log.log("in personIdValid");

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
                if (scope.noDisplay()) {
                    scope.personId = scope.hiddenPersonId;
                }
                if (scope.personId) {
                    if (scope.personId.length > 12 || scope.personId.length < 12) {
                        scope.personId = 'WTF, dude????';
                        $log.log('personId is not valid');
                        scope.hiddenPersonId = '';
                    } else {
                        $log.log('personId is valid');
                    }
                } else {
                    $log.log('personId empty');
                }
            });

            elem.bind('input', function() {
                if (scope.noDisplay()) {
                    if (scope.personId) {
                        var starString = scope.personId.slice(0, scope.personId.length - 1) + 'x';
                        setHiddenPersonId(scope.personId.slice(scope.personId.length - 1));
                        scope.personId = starString;
                        scope.$apply(scope.personId = starString);
                    }
                }

                function setHiddenPersonId(personIdByte) {
                    if (!scope.hiddenPersonId) {
                        scope.hiddenPersonId = personIdByte;
                    } else {
                        scope.hiddenPersonId = scope.hiddenPersonId.concat(personIdByte);
                    }
                }

            });

            $log.log('done binding');
        }
    };
}]);