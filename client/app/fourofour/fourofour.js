'use strict';

angular.module('recordSlotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('404', {
        url: '/404',
        template: '<fourofour></fourofour>'
      });
  });
