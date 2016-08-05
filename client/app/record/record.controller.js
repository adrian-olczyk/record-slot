'use strict';

(function(){

class RecordComponent {
  constructor($stateParams, $http, $state, slotProviders) {
    this.recordId = $stateParams.recordId;
    this.isNew = !this.recordId;

    this.$http = $http;
    this.$state = $state;
    this.record = {};

    this.availableProviders = slotProviders;

    if (!this.isNew) {
      this.fetchRecord(this.recordId);
    }
  }

  fetchRecord(recordId){
    this.$http.get('/api/records/' + recordId)
      .then(response => {
        this.record = response.data;
      })
      .catch(() => {
        // FIXME redirect on 404
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
        // FIXME handle error
      })
  }

  updateRecord(record){
    this.$http.put('/api/records/' + this.recordId, record)
      .then((res) => this.$state.go('main'))
      .catch((err) => {
        // FIXME handle error
      })
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
