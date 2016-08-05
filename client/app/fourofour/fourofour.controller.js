'use strict';

(function(){

class FourofourComponent {
  constructor($timeout) {
    this.shouldCycleIn = false;
    $timeout(() => this.shouldCycleIn = true, 500);
  }
}

angular.module('recordSlotApp')
  .component('fourofour', {
    templateUrl: 'app/fourofour/fourofour.html',
    controller: FourofourComponent,
    controllerAs: 'fourofourCtrl'
  });

})();
