'use strict';

(function(){
  angular.module('recordSlotApp')
  .filter('slotProvider', function(slotProviders) {
    return function(input) {
      return _.find(slotProviders, (provider) => provider.id === input) || 'Unknown';
    };
  });
})();
