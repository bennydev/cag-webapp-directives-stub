"use strict";

angular
    .module('uploadError', [])
    .controller('uploadErrorController', ['$scope', 'scope', '$modalInstance', 'error', 'integrationRestService',
        function ($scope, scope, $modalInstance, error, integrationRestService) {
            function saveClaimSuccess(data) {
                scope.setClaimData(data);
                scope.claimAcceptance.claimId = scope.claim.claimId;
            }

            $scope.saveClaim = function(){
                integrationRestService.saveClaim(scope.baggageModel, saveClaimSuccess);
                $scope.close();
            };

            $scope.close = function(){
                $modalInstance.close();
            };
    }]);
