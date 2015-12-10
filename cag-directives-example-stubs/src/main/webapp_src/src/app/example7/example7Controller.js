'use strict';
angular.module('controllers').controller('Example7Ctrl', ['$scope', '$state', function ($scope, $state) {

    $scope.hideNextButton = true;
    $scope.personInfo = {
        personId: '',
        firstName: '',
        lastName: ''
    };


    $scope.prevStep = function () {
        $state.go('example6');
    };

 }
]);
