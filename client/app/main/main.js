'use strict';

angular.module('paizatterApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/?keyword',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          query: function(){return {};}
        },
      })
      .state('starred', {
        url: '/users/:userId/starred?keyword',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          query: function($stateParams){
            return {stars: $stateParams.userId};
          }
        }
      })
      .state('user', {
        url: '/users/:userId?keyword',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          query: function($stateParams){
            return {user: $stateParams.userId};
          }
        }
      })
      ;
  });