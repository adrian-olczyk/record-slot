'use strict';

angular.module('recordSlotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('fourofour', {
        url: '/404',
        template: '<fourofour></fourofour>'
      });
  });
