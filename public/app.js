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

        $scope.findEvents = (function(position) {

            console.log($scope.target_latitude + ", " + $scope.target_longitude);
            var target_latitude = $scope.target_latitude;
            var target_longitude = $scope.target_longitude;
            // do get ajax call --- {
            // longitude :,
            // latitude : 
            // }
            $http.get("/api/locations")
                .then(function(response) {
                    $scope.centres = response.data;
                    var centresArray = $scope.centres;

                    console.log(JSON.stringify($scope.centres));

                    
                    console.log(centresArray);
                    console.log(typeof centresArray);
                    // coords array
                    console.log(target_longitude,target_latitude);

                    
                    var locationMap = {};

                    $scope.centres.forEach(function(centre){
                        locationMap[centre.name] = { latitude : centre.latitude, longitude : centre.longitude}
                    });

                    // console.log(JSON.stringify(locationMap));

                    var orderedCentres = geolib.orderByDistance({
                        latitude: target_latitude,
                        longitude: target_longitude
                    }, locationMap);

                    console.log(JSON.stringify(orderedCentres));

                    orderedCentres = orderedCentres.map(function(centre){
                        centre.name = centre.key;
                        centre.distance = centre.distance / 1000;
                        delete centre.key;
                        return centre;
                    })

                    console.log($scope.orderedCentres = orderedCentres);

                    // console.log(JSON.stringify(orderedCentres));

                });
        });
        // $scope.allValuesEntered = function(){
        //     return $scope.centre && $scope.centre.name !== "";
        // }
        $scope.getLocation = function(position) {
            //$scope.target_name = position.name;
            $scope.target_latitude = position.coords.latitude;
            $scope.target_longitude = position.coords.longitude;
            $scope.$apply(); //this triggers a $digest
        };

        $scope.addCentre = function(centre) {

            var theCenter = {
                name: centre.name,
                latitude: centre.latitude,
                longitude: centre.longitude
            };

            $http
                .post('/api/locations', theCenter)
                .then(function(result) {
                    $scope.centres.push(theCenter);
                    $scope.centre = {};
                })
                .catch(function(e) {
                    alert(JSON.stringify(e));
                });


        }

    }
])