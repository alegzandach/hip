module.exports = function(config) {
  config.set({
    basePath: '../',

    frameworks: ['jasmine'],

    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.js',
    ],

    autoWatch: true,

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
			'karma-coverage',
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'app/js/**/!(app|directives).js': ['coverage']
    },

		coverageReporter: {
			type: 'text'
		}

  });
};
