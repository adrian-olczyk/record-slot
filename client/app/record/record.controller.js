'use strict';

(function(){

class RecordComponent {
  constructor($stateParams, $http, $state, slotProviders, Notification, $log) {
    this.recordId = $stateParams.recordId;
    this.isNew = !this.recordId;

    this.$http = $http;
    this.$state = $state;
    this.record = {};
    this.loading = true;
    this.Notification = Notification;
    this.$log = $log;

    this.availableProviders = slotProviders;

    if (!this.isNew) {
      this.fetchRecord(this.recordId)
        .then(() => this.loading = false);
    }
    else{
      // no need to load anything
      this.loading = false;
    }
  }

  fetchRecord(recordId){
    return this.$http.get('/api/records/' + recordId)
      .then(response => {
        this.record = response.data;
      })
      .catch((err) => {
        if (err.status === 404){
          this.$state.go('404');
          this.Notification.error('Record not found');
          return;
        }

        this.Notification.error('An error has occurred, please try again later');
        this.$log.error(err);
      });
  }

  save(record){
    if (this.isNew){
       this.createRecord(record);
    }
    else{
      this.updateRecord(record);
    }
  }

  createRecord(record){
    this.$http.post('/api/records', record)
      .then((res) => this.$state.go('main'))
      .catch((err) => {
        this.Notification.error('An error has occurred, please try again later');
        this.$log.error(err);
      });
  }

  updateRecord(record){
    this.$http.put('/api/records/' + this.recordId, record)
      .then((res) => this.$state.go('main'))
      .catch((err) => {
        this.Notification.error('An error has occurred, please try again later');
        this.$log.error(err);
      });
  }

  addSlot(){
    if (!this.record.slots){
      this.record.slots = [];
    }

    this.record.slots.push({});
  }

  deleteSlot(slot){
    if (!this.record.slots){
      return;
    }

    var index = this.record.slots.indexOf(slot);
    if (index > -1){
      this.record.slots.splice(index, 1);
    }
  }
}

angular.module('recordSlotApp')
  .component('record', {
    templateUrl: 'app/record/record.html',
    controller: RecordComponent,
    controllerAs: 'recordCtrl'
  });

})();
