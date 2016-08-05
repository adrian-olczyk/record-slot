'use strict';

angular.module('recordSlotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('record/create', {
        url: '/record',
        template: '<record></record>'
      })
      .state('record/edit', {
        url: '/record/:recordId',
        template: '<record></record>'
      });
  });
