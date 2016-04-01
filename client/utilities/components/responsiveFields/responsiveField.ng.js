// function ResponsiveFieldController() {
//   'ngInject';
//   let ctrl = this;
//   ctrl.editMode = false;
//
//   ctrl.save = function() {
//     let mod = {}
//     mod[ctrl.key] = ctrl.fieldValue
//     ctrl.onUpdate({modifier: {$set: modifier}});
//   }
//
//   ctrl.$onInit = function() {
//     // Set a default fieldType
//     ctrl.schema =
//   };
// }
//
//
// angular.module('food-coop').component('fcResponsiveField', {
//   templateUrl: 'client/utilities/components/responsiveFields/responsive-field.ng.html',
//   controller: ResponsiveFieldController,
//   bindings: {
//     data: "<",
//     key: "@",
//     collection: "@?",
//     onUpdate: "&",
//     defaultText: "@",
//     canEdit: "<"
//   }
// })