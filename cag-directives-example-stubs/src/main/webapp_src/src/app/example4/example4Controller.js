'use strict';
angular.module('controllers').controller('Example4Ctrl', ['$scope', '$state', function ($scope, $state) {

    $scope.hideBackButton = false;

    $scope.nextStep = function () {
        $state.go('example5');
    };

    $scope.prevStep = function () {
        $state.go('example4');
    };
}
]);
