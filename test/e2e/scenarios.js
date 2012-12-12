'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('categorize', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  afterEach(function(){
    pause();
  });

  describe('flag as broken', function() {
    it('should open a modal dialog when clicked', function() {
      element('.icon-wrench:first').click();
      expect(element('.modal-dialog').css('display')).toBe('block');
    });
  });

//  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
//    expect(browser().location().url()).toBe("/view1");
//  });


//  describe('view1', function() {
//
//    beforeEach(function() {
//      browser().navigateTo('#/view1');
//    });
//
//
//    it('should render view1 when user navigates to /view1', function() {
//      expect(element('[ng-view] p:first').text()).
//        toMatch(/partial for view 1/);
//    });
//
//  });

//
//  describe('view2', function() {
//
//    beforeEach(function() {
//      browser().navigateTo('#/view2');
//    });
//
//
//    it('should render view2 when user navigates to /view2', function() {
//      expect(element('[ng-view] p:first').text()).
//        toMatch(/partial for view 2/);
//    });
//
//  });
});
