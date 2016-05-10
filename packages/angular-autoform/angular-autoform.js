// Write your package code here!



// import components
import quickForm from './imports/ui/components/quickForm/quickForm'

if (!window.angular) {
  try {
    if (Package['modules-runtime']) {
      var require = Package['modules-runtime'].meteorInstall();
      require('angular');
    }
  } catch(e) {
    throw new Error('angular package is missing');
  }
}




export default angular.module('ngAutoform', [
  quickForm,
  
])




// Variables exported by this module can be imported by other packages and
// applications. See angular-autoform-tests.js for an example of importing.

