'use strict';

angular.module('recordSlotApp', ['recordSlotApp.constants', 'ngCookies', 'ngResource', 'ngSanitize',
    'btford.socket-io', 'ui.router', 'ui.bootstrap', 'angular-velocity'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
