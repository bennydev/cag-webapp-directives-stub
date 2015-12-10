'use strict';
angular.module('controllers').controller('Example6Ctrl', ['$scope', '$state', function ($scope, $state) {

    $scope.hideBackButton = false;
    $scope.person = {
        personId: '',
        personName: ''
    };

    $scope.nextStep = function () {
        $state.go('example7');
    };

    $scope.prevStep = function () {
        $state.go('example5');
    };

 }
]);
