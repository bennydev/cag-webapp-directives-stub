'use strict';
angular.module('controllers').controller('Example3Ctrl', ['$scope', '$state', function ($scope, $state) {

    $scope.hideBackButton = false;

    $scope.nextStep = function () {
        $state.go('example4');
    };

    $scope.prevStep = function () {
        $state.go('example2');
    };
}
]);
