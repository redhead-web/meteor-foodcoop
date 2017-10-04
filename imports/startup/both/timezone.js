import moment from 'moment-timezone';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  moment.tz.setDefault(Meteor.settings.public.tz);
});
