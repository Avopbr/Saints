var EduApp = angular.module("EduApp", []);
EduApp.controller('MainCtrl', ['$scope', '$http',
    function($scope, $http) {
        
        // $scope.center = (geolib.getCenter($scope.venues));

        $http.get("/api/locations")
            .then(function(response) {
                $scope.venues = response.data;
            });

        var position;
        $scope.nearMe = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.getLocation);
            }
        }
        $scope.getLocation = function(position) {
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
            $scope.$apply(); //this triggers a $digest
        };
    }
])