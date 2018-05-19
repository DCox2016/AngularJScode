(function() {

  var app = angular.module("githubViewer", [ ]);

  var MainCtrl = function(n, $http) {

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

    n.search = function(username) {
      $http.get("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
    };

    n.username = ""
    n.message = "Github Profile Viewer";
    n.repoSortOrder = "+name";

  };

  app.controller("MainCtrl", ["$scope", "$http", MainCtrl]);

}());