'use strict';

describe('Component: RecordComponent', function () {

  // load the controller's module
  beforeEach(module('recordSlotApp'));

  var RecordComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    RecordComponent = $componentController('record', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
