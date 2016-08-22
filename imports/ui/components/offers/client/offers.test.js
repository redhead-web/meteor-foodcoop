let offers = [
  {
    _id: Random.id(),
    request: this.request._id,
    user: "LNjTJT7EtNpvCDv8x",
    name: "Sean Stanley",
    companyName: "",
    bid: 10,
    dateCreated: moment().subtract(1, 'days').toDate(),
    status: 'withdrawn',
    description: "I'd like to offer exactly what you're looking for and we can arrange delivery to suit you. Please call me at 0210409066 for details."
  }, {
    _id: Random.id(),
    request: this.request._id,
    user: "LNjTJT7EtNpvCDv8x",
    name: "Matt Stanley",
    companyName: "",
    bid: 8,
    dateCreated: moment().subtract(9, 'hours').toDate(),
    quantity: 8,
    status: 'active',
    description: "This is not spam I swear. I'd like to provide what you want. I'd like to offer exactly what you're looking for and we can arrange delivery to suit you. Please call me at 0210409066 for details."
  }, {
    _id: Random.id(),
    request: this.request._id,
    user: "LNjTJT7EtNpvCDv8x",
    name: "Mike Shaw",
    companyName: Meteor.user().profile.companyName,
    bid: 6,
    dateCreated: moment().subtract(90, 'minutes').toDate(),
    status: 'active',
    description: "It'll come from Kaikohe but I can offer you the best price. This is not spam I swear. I'd like to provide what you want. I'd like to offer exactly what you're looking for and we can arrange delivery to suit you. Please call me at 0210409066 for details."
  }
];
