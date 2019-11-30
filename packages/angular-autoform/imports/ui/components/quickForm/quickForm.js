import angular from 'angular';
import _ from 'lodash';
import ngMaterial from 'angular-material';
import utils from '/utils';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import template from './quickForm.html';


class QuickForm {
  constructor($scope, $reactive) {
    'ngInject';

    let sortedSchema = {};
    this.fieldGroupds = [];

    // $reactive(this).attach($scope);

    if (this.method === 'update') {
      // expect this.item to exist
      check(this.item, Object);
    }
    this.mongoCollection = utils.getCollection(this.collection);

    check(this.mongoCollection, Mongo.Collection);

    this.formName = `${this.collection}_${this.method}`;

    this.simpleSchema = this.mongoCollection.hasOwnProperty('_c2') ? this.mongoCollection._c2._simpleSchema : this.mongoCollection._simpleSchema;

    // --------------- A. Schema --------------- //

    const fieldList = this.fields;
    if (fieldList) {
      fieldlist = utils.stringToArray(fieldList, 'AutoForm: fields attribute must be an array or a string containing a comma-delimited list of fields');
      fieldList.forEach((fieldName) => {
        sortedSchema[fieldName] = simpleSchema._schema[fieldName];
      });
    } else {
      sortedSchema = simpleSchema._schema;
    }

    // --------------- B. Field With No Groups --------------- //
    this.grouplessFields = getFieldsWithNoGroup(sortedSchema);

    // --------------- C. Field With Groups --------------- //

    // get sorted list of field groups
    const fieldGroupNames = getSortedFieldGroupNames(sortedSchema);

    // Loop through the list and make a field group context for each
    _.each(fieldGroupNames, (fieldGroupName) => {
      const fieldsForGroup = getFieldsForGroup(fieldGroupName, sortedSchema);

      if (fieldsForGroup.length > 0) {
        this.fieldGroups.push({
          name: fieldGroupName,
          fields: fieldsForGroup,
        });
      }
    });
  }
  submit() {
    this.onSubmit(this.item);
  }
}

export const name = 'ngQuickForm';

/**
 * Takes a schema object and returns a sorted array of field group names for it
 *
 * @param   {Object}   schemaObj Like from mySimpleSchema.schema()
 * @returns {String[]} Array of field group names
 */
function getSortedFieldGroupNames(schemaObj) {
  let names = _.map(schemaObj, field => field.ngAutoform && field.ngAutoform.group);

  // Remove undefined
  names = _.compact(names);

  // Remove duplicate names
  names = _.unique(names);

  return names.sort();
}

/**
 * Returns the schema field names that belong in the group.
 *
 * @param   {String}   groupName The group name
 * @param   {Object}   schemaObj Like from mySimpleSchema.schema()
 * @returns {String[]} Array of field names (schema keys)
 */
function getFieldsForGroup(groupName, schemaObj) {
  let fields = _.map(schemaObj, (field, fieldName) => (fieldName.slice(-2) !== '.$') &&
      field.ngAutoform &&
      field.ngAutoform.group === groupName &&
      fieldName);

  // Remove undefined
  fields = _.compact(fields);

  return fields;
}


/**
 * Returns the schema field names that don't belong to a group
 *
 * @param   {Object}   schemaObj Like from mySimpleSchema.schema()
 * @returns {String[]} Array of field names (schema keys)
 */
function getFieldsWithNoGroup(schemaObj) {
  let fields = _.map(schemaObj, (field, fieldName) => (fieldName.slice(-2) !== '.$') &&
      (!field.ngAutoform || !field.ngAutoform.group) &&
      fieldName);

  // Remove undefined
  fields = _.compact(fields);

  return fields;
}


export default angular.module(name, [ngMaterial]).component(name, {
  controllerAs: name,
  template,
  bindings: {
    collection: '@',
    method: '@',
    item: '<',
    schema: '<',
    live: '<',
    onSubmit: '&',
    fields: '@',
    buttonText: '@',
    buttonClasses: '@',
  },
});
