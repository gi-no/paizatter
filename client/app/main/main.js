'use strict';

angular.module('paizatterApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          query: function(){}
        }
      })
      .state('starred', {
        url: '/users/:userId/starred',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          query: function($stateParams){
            return {stars: $stateParams.userId}
          }
        }
      })
      .state('user', {
        url: '/users/:userId',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          query: function($stateParams){
            return {user: $stateParams.userId}
          }
        }
      })
      ;
  });