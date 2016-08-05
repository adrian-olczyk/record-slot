'use strict';

describe('Component: FourofourComponent', function () {

  // load the controller's module
  beforeEach(module('recordSlotApp'));

  var FourofourComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    FourofourComponent = $componentController('fourofour', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
