import { Meteor } from 'meteor/meteor'
import _ from 'lodash'

let module = {}

module.getCollection = function (string) {
  if (string === 'Meteor.users') {
    return Meteor.users
  }
  for (let globalObject in window) {
      if (window[globalObject] instanceof Meteor.Collection) {
          if (globalObject === string) {
              return (window[globalObject]);
              break;
          };        
      }
  }
  return undefined; // if none of the collections match
};

/**
  * @method Utility.stringToArray
  * @private
  * @param {String|Array} s A variable that might be a string or an array.
  * @param {String} errorMessage Error message to use if it's not a string or an array.
  * @return {Array} The array, building it from a comma-delimited string if necessary.
  */
 module.stringToArray = function stringToArray(s, errorMessage) {
   if (typeof s === "string") {
     return s.replace(/ /g, '').split(',');
   } else if (!_.isArray(s)) {
     throw new Error(errorMessage);
   } else {
     return s;
   }
 },
export default module