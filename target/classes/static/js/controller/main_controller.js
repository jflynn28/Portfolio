'use strict';

angular.module('myApp').controller('MainController', ['$scope', 'MainService', '$location', function($scope, MainService, $location) {

    var self = this;
    self.request={field1:'A Value', field2:'A Second Value'};
    self.resultVal = "";
    self.inputVal = 10;

    $scope.generateRandom = function() {
        generateRandom();
    };

    function generateRandom(){
        if(self.inputVal != undefined) {
            MainService.generateRandom(self.inputVal).then(
                function(result) {
                    self.resultVal = result;
                },
                function(){
                    console.error('Request error');
                }
            );
        }
    }

    $scope.makeRequest = function() {
        makeRequest();
    };

    function makeRequest(){
        MainService.makeRequest(self.request).then(
            function(result) {
                console.log("success");
            },
            function(){
                console.error('Request error');
            }
        );
    }

}]);
