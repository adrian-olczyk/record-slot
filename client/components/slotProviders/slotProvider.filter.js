'use strict';

(function(){
  angular.module('recordSlotApp')
  .filter('slotProvider', function(slotProviders) {
    return function(input) {
      var provider = _.find(slotProviders, (provider) => provider.id === input);

      if (provider){
        return provider.name;
      }

      return 'Unknown';
    };
  });
})();
