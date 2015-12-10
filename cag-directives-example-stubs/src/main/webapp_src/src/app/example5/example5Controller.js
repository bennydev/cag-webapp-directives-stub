'use strict';
angular.module('controllers').controller('Example5Ctrl', ['$scope', '$state', function ($scope, $state) {

    $scope.hideBackButton = false;
    $scope.personId = '';

    $scope.nextStep = function () {
        $state.go('example6');
    };

    $scope.prevStep = function () {
        $state.go('example4');
    };

    $scope.noDisplay = function () {
        return true;
    };
}
]);
