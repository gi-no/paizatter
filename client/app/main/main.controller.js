'use strict';

angular.module('paizatterApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, query, $location) {
    $scope.awesomeThings = [];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    var keyword = $location.search().keyword;
    $scope.busy = true;

    if(keyword){
      // RegEx search
      // query = _.merge(query, {name: {$regex: $scope.keyword, $options: 'i'}});
      // Full-text search
      query = _.merge(query, {$text: {$search: keyword}});
    }
    $http.get('/api/things', {params: {query: query}}).success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
      if($scope.awesomeThings.length<20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });

    $scope.nextPage = function(){
      if($scope.busy){
        return;
      }
      $scope.busy = true;
      var lastId = $scope.awesomeThings[$scope.awesomeThings.length-1]._id;
      var pageQuery = _.merge(query, {_id: {$lt: lastId}});
      $http.get('/api/things', {params: {query: pageQuery}}).success(function(awesomeThings_) {
        $scope.awesomeThings = $scope.awesomeThings.concat(awesomeThings_);
        $scope.busy = false;
        if(awesomeThings_.length === 0){
          $scope.noMoreData = true;
        }
      });
    };

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
    };

  });
