import { Meteor } from 'meteor/meteor';

export default function getEmailAddress(userId, testData) {
  if (testData) {
    return testData;
  }
  const user = Meteor.users.findOne(userId);
  if (user) {
    if (user.services && user.services.facebook && user.services.facebook.email) {
      return `${user.profile.name} <${user.services.facebook.email}>`;
    } else if (user.emails && user.emails.length && user.emails[0].address) {
      return `${user.profile.name} <${user.emails[0].address}>`;
    }
    throw new Meteor.Error('getEmailAddress', 'no email address found');
  }
  throw new Meteor.Error('getEmailAddress', 'no user found');
}
