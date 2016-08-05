'use strict';

describe('Component: mainComponent', function() {

  // load the controller's module
  beforeEach(module('recordSlotApp'));
  beforeEach(module('stateMock'));

  var scope;
  var mainComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state, Notification, $log) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/records')
      .respond([]);

    scope = $rootScope.$new();
    state = $state;
    mainComponent = $componentController('main', {
      $http, Notification, $log
    });
  }));

  it('should attach a list of things to the controller', function() {
    mainComponent.$onInit();
    $httpBackend.flush();

    expect(mainComponent.records.length)
      .to.equal(0);
  });
});
