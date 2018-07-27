'use strict';

angular.module('myApp').factory('MainService', ['$http', '$q', '$location', function($http, $q, $location){

    var REST_SERVICE_URI = 'http://' + $location.host() + ":" + $location.port() + '/portfolio/';


    return {
        makeRequest: makeRequest,
        generateRandom: generateRandom
    };

    function makeRequest(request) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI+"request", request).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function generateRandom(request) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI+"random", request).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
}]);