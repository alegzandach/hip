exports.config = {
  specs: [
    'e2e/*.js'
  ],
  
  capabilities: {
    'browserName': 'chrome'
  },
  
  chromeOnly: true,
  
  baseUrl: 'http://localhost:8888/',
  
  onPrepare: function() {
    browser.driver.get('http://localhost:8000/api/api-auth/login/?next=/api/');
    
    browser.findElement(by.name('username')).sendKeys('admin');
    browser.driver.findElement(by.name('password')).sendKeys('password');
    browser.driver.findElement(by.id('submit-id-submit')).click();
    
    return browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
            return /api/.test(url);
        });
    }, 10000);
  },
  
  framework: 'jasmine',
};