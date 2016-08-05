'use strict';

angular.module('recordSlotApp', ['recordSlotApp.constants', 'ngCookies', 'ngResource', 'ngSanitize',
    'btford.socket-io', 'ui.router', 'ui.bootstrap', 'angular-velocity', 'ui-notification'
  ])
  .config(function($urlRouterProvider, $locationProvider, NotificationProvider) {
    $urlRouterProvider.otherwise('/404');

    $locationProvider.html5Mode(true);

    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 60,
      startRight: 10,
      verticalSpacing: 10,
      horizontalSpacing: 10,
    });
  });
