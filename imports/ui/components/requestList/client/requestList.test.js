let requests = [
  {
    _id: Random.id(),
    creator: {
      name: "Oli Reuschel",
      avatar: "certification/organicfarmnz.png",
      companyName: "Grasscouch Greens",
      creatorId: "jhxyGsY5KW7HXyk2S"
    },
    title: "Melons Please",
    description: "It's melon season and I'd really like a local organic melon or two. Does anyone have any for sale?",
    dateCreated: moment().subtract(2, 'days').toDate(),
    price: 1,
    shipping: "Deliver to Whangarei Food Co-op Sorting Center"
  }, {
    _id: Random.id(),
    creator: {
      name: "Sean Stanley",
      creatorId: "LNjTJT7EtNpvCDv8x"
    },
    title: "1000L of Vinegar for foodhub",
    description: "We urgently need some local vinegar for our tamarillo vinegar production. Vinegar must be a minimum of 6% acetic acid and produced from a local feedstock. Can pick up.",
    dateCreated: moment().subtract(4, 'days').toDate(),
    deadline: moment().add(1, 'days').toDate(),
    quantity: 1000,
    unitOfMeasure: 'litres',
    price: 0,
    shipping: "Offer must include shipping",
    address: "123 Worsnop Road, Ruatangata West"
  }, {
    _id: Random.id(),
    creator: {
      name: "John Johnson",
      companyName: "Pak n Save Whangarei",
      creatorId: "jhxyGsY5KW7HXyk2S"
    },
    title: "50kg of Broccoli",
    description: "We are looking for a top up of 50kg of Brocolli heads in the next 5 days. We are offering a fixed price for this order.",
    dateCreated: moment().subtract(2, 'days').toDate(),
    deadline: moment().add(5, 'days').toDate(),
    quantity: 50,
    unitOfMeasure: 'kg',
    fixedPrice: 100,
    price: 0,
    shipping: "Offer must include shipping"
  }, {
    _id: Random.id(),
    creator: {
      name: "Chef Francis",
      creatorId: "LNjTJT7EtNpvCDv8x"
    },
    title: "Large Organic Free Range Duck Eggs Please",
    description: "I need organic duck eggs please",
    dateCreated: moment().subtract(1, 'days').toDate(),
    deadline: moment().add(1, 'days').toDate(),
    quantity: 2,
    unitOfMeasure: 'dozen',
    price: 2,
    shipping: "I am happy to pickup."
  }
]
