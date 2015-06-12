module.exports = function(config) {
  config.set({

    basePath: '../',

    files: [
      'app/static/app/bower_components/angular/angular.js',
      'app/static/app/bower_components/angular-mocks/angular-mocks.js',
      'app/static/app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
}
