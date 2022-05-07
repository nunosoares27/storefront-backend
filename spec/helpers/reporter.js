//  https://github.com/bcaudan/jasmine-spec-reporter/tree/master/examples/node
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayPending: true,
    },
  }),
);
