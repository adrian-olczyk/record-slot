'use strict';

(function() {

  class MainController {
    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.records = [];
      this.loading = true;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('records');
      });
    }

    $onInit() {
      this.$http.get('/api/records')
        .then(response => {
          this.loading = false;
          this.records = response.data;
          this.socket.syncUpdates('records', this.records);
        });
    }

    removeRecord(record){
      var index = this.records.indexOf(record);
      if (index > -1 && confirm('Are you sure?')){
        this.records.splice(index, 1);
        this.$http.delete('/api/records/' + record._id)
          .catch((err) => {
            // FIXME handle error
            console.error(err);
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
