/* eslint-env browser */
import { Meteor } from 'meteor/meteor';

const id = Meteor.settings.public.TAWKTO_ID || '58e719d730ab263079b5eea9'; // default id;
if (!!id && id.length) {
  const s1 = document.createElement('script');
  const s0 = document.getElementsByTagName('script')[0];

  s1.async = true;
  s1.src = `https://embed.tawk.to/${id}/default`;
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
} else {
  console.error('Missing TawkTo id.');
}
