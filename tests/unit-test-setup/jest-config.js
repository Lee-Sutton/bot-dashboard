module.exports = {
  'rootDir': './../../',
  'roots': [
    '<rootDir>'
  ],
  'coveragePathIgnorePatterns': [
    '<rootDir>/tests/',
    '<rootDir>/node_modules/',
    '<rootDir>/private/',
    // collection definitions ignored from unit test coverage, no logic
    '<rootDir>/src/imports/modules/[a-zA-Z-]+/shared/collections/'
  ],
  'testURL': 'http://www.meteor-vue-app.com',
  'testMatch': ['<rootDir>/imports/**/*.spec.js', '<rootDir>/tests/**/*.spec.js'],
  // 'setupFiles': ['<rootDir>/tests/unit-test-setup/setup-tests.js'],
  'verbose': true,
  'collectCoverage': false,
  'collectCoverageFrom': ['imports/**/*', '!src/**/*-fixture.js'],
  'coverageDirectory': '<rootDir>/tests/coverage/unit-tests/',
  'moduleFileExtensions': [
    'js',
    'vue'
  ],
  // "reporters": [ "default", "jest-junit" ],
  'transform': {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  'moduleNameMapper': {
    '^meteor/(.*)': '<rootDir>/tests/unit-test-setup/meteor-mocks/$1.js',
    '^[/](.*)': '<rootDir>/$1'
  },
  'coverageThreshold': {
    'global': {
      'branches': 70,
      'functions': 85,
      'lines': 85,
      'statements': 85
    }
  },
};
