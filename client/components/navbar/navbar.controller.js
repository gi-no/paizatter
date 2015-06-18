'use strict';

angular.module('paizatterApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
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
      console.log("concat");
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
  });