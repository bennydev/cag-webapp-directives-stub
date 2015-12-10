'use strict';
angular.module('controllers').controller('ExampleCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.hideBackButton = true;

    $scope.nextStep = function () {
        $state.go('example2');
    };
}
])
;


