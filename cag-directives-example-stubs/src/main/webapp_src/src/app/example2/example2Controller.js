'use strict';
angular.module('controllers').controller('Example2Ctrl', ['$scope', '$state', function ($scope, $state) {

    $scope.hideBackButton = false;

    $scope.nextStep = function () {
        $state.go('example3');
    };

    $scope.prevStep = function () {
        $state.go('example1');
    };

}
]);
