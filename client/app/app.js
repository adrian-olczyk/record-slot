'use strict';

angular.module('recordSlotApp', ['recordSlotApp.constants', 'ngCookies', 'ngResource', 'ngSanitize',
    'ui.router', 'ui.bootstrap', 'angular-velocity', 'ui-notification'
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

console.info("%cCurious?", "color: blue; font-size: x-large");
console.info('This is how this website was built: https://www.youtube.com/watch?v=2J5xs2ukksE');
