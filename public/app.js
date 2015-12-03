var EduApp = angular.module("EduApp", []);
EduApp.controller('MainCtrl', ['$scope', '$http',
    function($scope, $http) {
        
        // $scope.center = (geolib.getCenter($scope.venues));

        $scope.centres = [];

        $http.get("/api/locations")
            .then(function(response) {
                $scope.centres = response.data;
            });

        // var position;
        $scope.nearMe = function() {
            if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition($scope.getLocation);
            }
        }

        $scope.findEvents = (function(position){
            
            alert($scope.target_latitude + ", " + $scope.target_longitude);
            // do get ajax call --- {
                // longitude :,
                // latitude : 
            // }
        });
        // $scope.allValuesEntered = function(){
        //     return $scope.centre && $scope.centre.name !== "";
        // }
        $scope.getLocation = function(position) {
            //$scope.target_name = position.name;
            $scope.target_latitude = position.coords.latitude;
            $scope.target_longitude = position.coords.longitude;
            //$scope.$apply(); //this triggers a $digest
        };

        $scope.addCentre = function(centre){

            var theCenter = {
                name : centre.name,
                latitude : centre.latitude,
                longitude : centre.longitude
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