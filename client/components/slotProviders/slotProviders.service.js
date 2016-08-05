'use strict';

(function(){

angular.module('recordSlotApp')
  .factory('slotProviders', function() {
    return [
      { id: 1, name: 'Google' },
      { id: 2, name: 'Facebook' },
      { id: 3, name: 'Twitter' }
    ];
  });

})();
