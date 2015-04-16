module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['browserify', 'mocha', 'es5-shim', 'chai-sinon'],
    autoWatch: true,
    browsers: ['PhantomJS'],

    plugins: [
      'karma-mocha',
      'karma-chai-sinon',
      'karma-browserify',
      'karma-es5-shim',
      'karma-phantomjs-launcher'
    ],

    port: 7357,
    reporters: ['dots'],
    preprocessors: {
      'test/unit/**/*.js': ['browserify']
    },
    browserify: {
      extensions: ['.js', '.json'],
      ignore: [],
      watch: true,
      debug: true,
      noParse: []
    },
    files: [
      'test/unit/**/*.js'
    ],
    exclude: ['**/*.swp']
  });
};
