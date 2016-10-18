// OpenWeather
angular
    .module('myApp', ['ngGeolocation'])
    .controller('customersCtrl', function($scope, $http,$geolocation) {
        //  Open Weather - FREE API
        var API    = "2c4a7e13b96d39d563ef85507f95c820"; 
        
       // Geolocation
       $scope.yesClick =  function ()
        {
           $scope.geoDloc    = "loading ..."; 
           $scope.geoWeather = "loading ...";
           $geolocation.getCurrentPosition().then(function(geomatix) {
            var geoUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+geomatix.coords.latitude+"&lon="+geomatix.coords.longitude+"&appid="+API;
            $http.get(geoUrl)
               .then(function success (response) {
                    $scope.geoDloc    = response.data.name; 
                    $scope.geoWeather = response.data.weather[0].description;
                 },function error (){
                    $scope.geoDloc    = "System error"; 
                    $scope.geoWeather = "System error";  
                 });
            });
        };

      // Manual 
      $scope.noClick  = function(){

            $scope.field      = {location: ''};
            $scope.curDloc    = "";
            $scope.curWeather = "";

            function getWeather(local){
                  $scope.curDloc    = "Loading ...";
                  $scope.curWeather = "Loading ...";
                  locUrl = "http://api.openweathermap.org/data/2.5/weather?q="+local+"&appid="+API;
                  console.log('url',locUrl);
                  $http.get(locUrl)
                     .then(function success (response) {
                          $scope.curDloc    = response.data.name; 
                          $scope.curWeather = response.data.weather[0].description;
                       },function error(){
                          $scope.curDloc    = "System error"; 
                          $scope.curWeather = "System error";  
                       });
           };

           $scope.change   = function (){
                      getWeather($scope.field.location);
           };
     };
})