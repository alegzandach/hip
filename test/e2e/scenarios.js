describe('Stent App', function() {

  describe('Airways list view', function() {

    beforeEach(function() {
      browser.get('/');
    });

    it('should have three airways', function() {
      var airwayList = element.all(by.repeater('airway in airways'));

      expect(airwayList.count()).toBe(3);
    });

    it('should have the title `My Bronchial App`', function() {
      expect(browser.getTitle()).toMatch(/My Bronchial App$/);
    });
  });
});
