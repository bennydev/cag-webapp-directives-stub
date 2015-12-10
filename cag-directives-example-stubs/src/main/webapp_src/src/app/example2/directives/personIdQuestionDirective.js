'use strict';
angular.module('directives').directive('personId', [function () {

    console.log("In the directive's factory method");

    return {
        // No scope here, we get parent scope

        // Only as element
        restrict: 'E',
        // Replace <person-id> tag
        replace: 'true',
        // What to show.
        templateUrl: 'example2/directives/personId.tpl.html'
    };

}]);
