describe('Stent App', function() {

  beforeEach(function() {
    browser.get('/');
  });

  describe('Airways list view', function() {


    it('should have two airways', function() {
      var airwayList = element.all(by.repeater('result in airways.results'));

      expect(airwayList.count()).toBe(2);
    });

    it('should have the title `My Bronchial App`', function() {
      expect(browser.getTitle()).toMatch(/My Bronchial App$/);
    });
  });
});
