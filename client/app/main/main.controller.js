'use strict';

angular.module('paizatterApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.awesomeThings = [];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    $scope.starThing = function(thing) {
      $http.put('/api/things/' + thing._id + '/star').success(function(newthing){
        $scope.awesomeThings[$scope.awesomeThings.indexOf(thing)] = newthing;
      });
    };
    $scope.unstarThing = function(thing) {
      $http.delete('/api/things/' + thing._id + '/star').success(function(newthing){
        $scope.awesomeThings[$scope.awesomeThings.indexOf(thing)] = newthing;
      });
    };
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.isMyTweet = function(thing){
      return Auth.isLoggedIn() && thing.user && thing.user._id===Auth.getCurrentUser()._id;
    };
    $scope.isMyStar = function(thing){
      return Auth.isLoggedIn() && thing.stars && thing.stars.indexOf(Auth.getCurrentUser()._id)!==-1;
    }

  });
