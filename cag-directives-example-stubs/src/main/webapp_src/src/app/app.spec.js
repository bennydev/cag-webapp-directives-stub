'use strict';

describe('AppCtrl', function () {
    describe('app controller tests', function () {
        var AppCtrl, $scope;

        beforeEach(module('demoApp'));

        beforeEach(inject(function ($controller, $rootScope) {

            $scope = $rootScope.$new();

            AppCtrl = $controller('AppController', {$scope: $scope});


        }));

        it('should pass a dummy test', inject(function () {
            expect(AppCtrl).toBeTruthy();
        }));
    });
});
