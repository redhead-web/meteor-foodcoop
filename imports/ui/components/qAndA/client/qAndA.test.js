import moment from 'moment';


const questions = [
  {
    itemId: item._id,
    question: {
      createdAt: moment().subtract(18, 'hours').toDate(),
      user: {
        id: Meteor.userId(),
        name: 'Matt Stanley',
      },
      body: 'Is delivery around 8pm okay?',
    },
    answer: {
      createdAt: moment().subtract(4, 'minutes').toDate(),
      user: {
        id: Meteor.userId(),
        name: 'Sean Stanley',
      },
      body: 'yes',
    },
  },
  {
    itemId: item._id,
    question: {
      createdAt: moment().subtract(18, 'hours').toDate(),
      user: {
        id: Meteor.userId(),
        name: 'Matt Stanley',
      },
      body: 'Is it okay if they have just a little bit of rabbit damage?',
    },
  },
];
