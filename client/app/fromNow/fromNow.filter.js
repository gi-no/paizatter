'use strict';

angular.module('paizatterApp')
  .filter('fromNow', function () {
    return function (input) {
      return 'fromNow filter: ' + input;
    };
  });
