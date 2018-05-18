//
(function() {
  
  var app = angular.module("githubViewer", []);
  
  var MainCtrl = function(n, $http) {

    var onUserComplete = function(response) {
      n.user = response.data;
    };

    var onError = function(reason) {
      n.error = "Could not find that user.";
    };

    $http.get("https://api.github.com/users/dcox2016")
      .then(onUserComplete, onError);

    n.message = "Hello, Angular!";

  };
  
  app.controller("MainCtrl", ["$scope", "$http", MainCtrl]);

}());