(function() {

  var app = angular.module("githubViewer", [ ]);

  var MainCtrl = function(n, $http, $interval) {

   var onUserComplete = function(response) {
      n.user = response.data;
      $http.get(n.user.repos_url)
        .then(onRepos, onError);
    };

    var onRepos = function(response){
      
      n.repos = response.data;
    }  
    
    var onError = function(reason) {
      n.error = "Could not find that user.";
    };
    
    var searchTimer = function(){
      n.countdown -= 1;
      if(n.countdown < 1){
        n.search(n.username);
      }
    };
    
    var startCountdown = function(){
      $interval(searchTimer, 1000, n.countdown);
    };

    n.search = function(username) {
      $http.get("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
    };

    n.username = ""
    n.message = "Github Profile Viewer";
    n.repoSortOrder = "+name";
    n.countdown = 10;
    startCountdown();

  };

  app.controller("MainCtrl", ["$scope", "$http", "$interval", MainCtrl]);

}());