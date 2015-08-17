cart = new SimpleSchema
  _id:
    type: String
    regEx: SimpleSchema.RegEx.Id
    autoValue: -> Random.id()
  last_modified:
    type: Date
  status:
    type: String
    allowedValues: ['active', 'pending', 'upcoming', 'complete', 'expiring', 'expired']
  products:
    type: [Object]
    optional: true
  "products.$._id":
    type: String
    regEx: SimpleSchema.RegEx.Id
    autoValue: -> Random.id()
  "products.$.productId":
    type: String
    regEx: SimpleSchema.RegEx.Id
  "products.$.details":
    type: Object
    blackbox: true
  "products.$.qty":
    type: Number
    min: 1
  "products.$.start_date":
    type: Date
  "products.$.end_date":
    type: Date
    optional: true
  "products.$.indefinate":
    type: Boolean
    optional: true

profile = new SimpleSchema
  name:
    type: String
  address:
    type: String
  phone:
    type: String
  hub:
    type: Object
    optional: true
  'hub._id':
    type: String
    regEx: SimpleSchema.RegEx.Id
  'hub.location':
    type: String
  'hub.dayOfTheWeek':
    type: String
  'hub.openHours':
    type: String
  cart:
    type: cart
    optional: true

Schema = new SimpleSchema
  emails:
    type: [Object]
      # this must be optional if you also use other login services like facebook
      # but if you use only accounts-password then it can be required
    optional: true
  "emails.$.address":
    type: String
    regEx: SimpleSchema.RegEx.Email

  "emails.$.verified":
    type: Boolean

  createdAt:
    type: Date

  profile:
    type: profile
    optional: true

  services:
    type: Object
    optional: true
    blackbox: true
  # Braintree id to get stored payment methods
  customerId:
    type: String
    optional: true

  ###
   Add `roles` to your schema if you use the meteor-roles package.
   Option 1: Object type
   If you specify that type as Object you must also specify the
   `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
   Example:
   Roles.addUsersToRoles(userId ["admin"] Roles.GLOBAL_GROUP);
   You can't mix and match adding with and without a group since
   you will fail validation in some cases.
  roles: {
      type: Object
      optional: true
      blackbox: true
  }
  ###

  ###
   Option 2: [String] type
   If you are sure you will never need to use role groups then
   you can specify [String] as the type
  ###
  roles:
    type: [String]
    optional: true


Meteor.users.attachSchema Schema
