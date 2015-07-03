'use strict';

angular.module('paizatterApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $timeout, $state) {
    $scope.menu = [{
      'title': 'All',
      'link': '/'
    }];
    if(Auth.isLoggedIn()){
      $scope.menu = $scope.menu.concat([
        {
          'title': 'Mine',
          'link': '/users/' + Auth.getCurrentUser()._id
        },{
          'title': 'Starred',
          'link': '/users/' + Auth.getCurrentUser()._id + '/starred'
        }
      ]);
    }

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.search = function(keyword) {
      var state = ($state.current.controller === 'MainCtrl') ? $state.current.name : 'main';
      $state.go(state, {keyword: keyword});
    };

  });