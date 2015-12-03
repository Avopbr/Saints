var EduApp = angular.module("EduApp", []);
EduApp.controller('MainCtrl', ['$scope', '$http',
    function($scope, $http) {
        
        // $scope.center = (geolib.getCenter($scope.venues));

        $scope.centres = [];

        $http.get("/api/locations")
            .then(function(response) {
                $scope.centres = response.data;
            });

        var position;
        $scope.nearMe = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.getLocation);
            }
        }

        $scope.allValuesEntered = function(){
            return $scope.centre && $scope.centre.name !== "";
        }
        $scope.getLocation = function(position) {
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
            //$scope.$apply(); //this triggers a $digest
        };

        $scope.addCentre = function(centre){

            var theCenter = {
                name : centre.name,
            };

            $http
                .post('/api/locations', theCenter)
                .then(function(result){
                    $scope.centres.push(theCenter);
                    $scope.centre = {};
                })
                .catch(function(e){
                    alert(JSON.stringify(e));
                });

            
        }

    }
])