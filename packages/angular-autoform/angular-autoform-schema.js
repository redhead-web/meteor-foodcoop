// Write your package code here!
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Match } from 'meteor/check'

SimpleSchema.extendOptions({
  ngAutoform: Match.Optional({
    type: Match.Maybe(String),
    roles: Match.Maybe([String])
  })
});

// Variables exported by this module can be imported by other packages and
// applications. See angular-autoform-tests.js for an example of importing.
export const name = 'angular-autoform';
