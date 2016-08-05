'use strict';

(function(){
  angular.module('recordSlotApp')
    .directive('spinner', function() {
      return {
        restrict: 'E',
        template: '<div class="loader">Loading...</div>'
      };
    });
})();
