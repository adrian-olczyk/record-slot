'use strict';

(function() {

  class MainController {
    constructor($http, Notification, $log) {
      this.$http = $http;
      this.records = [];
      this.loading = true;
      this.Notification = Notification;
      this.$log = $log;
    }

    $onInit() {
      this.$http.get('/api/records')
        .then(response => {
          this.loading = false;
          this.records = response.data;
        });
    }

    removeRecord(record){
      var index = this.records.indexOf(record);
      if (index > -1 && confirm('Are you sure?')){
        this.records.splice(index, 1);
        this.$http.delete('/api/records/' + record.configuration_id)
          .catch((err) => {
            this.Notification.error('An error has occurred, please try again later');
            this.$log.error(err);
            this.records.splice(index, 0, record);
          });
      }
    }
  }

  angular.module('recordSlotApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'ctrl'
    });
})();
