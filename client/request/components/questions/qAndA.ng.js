function QandAController($scope) {
  var vm = this;
  vm.questions = [
    { 
      _id: Random.id(),
      itemId: vm.item._id,
      question: {
        createdAt: moment().subtract(18, 'hours').toDate(),
        user: {
          id: Meteor.userId(),
          name: "Matt Stanley"
        },
        body: "Is delivery around 8pm okay?"
      },
      answer: {
        createdAt: moment().subtract(4, 'minutes').toDate(),
        user: {
          id: Meteor.userId(),
          name: "Sean Stanley"
        },
        body: "yes"
      }
    },
    {
      _id: Random.id(),
      itemId: vm.item._id,
      question: {
        createdAt: moment().subtract(18, 'hours').toDate(),
        user: {
          id: Meteor.userId(),
          name: "Matt Stanley"
        },
        body: "Is it okay if they have just a little bit of rabbit damage?"
      }
    },
  ];
  
  vm.restrictedQuestioner = restrictedQuestioner;
  
  vm.canAnswer = canAnswer;
  
  vm.insert = insert;
  
  vm.update = update;
  
  function canAnswer() {
    var user = Meteor.userId()
    if (user && (user === vm.item.user || user === vm.item.creator.creatorId) ) {
      return true;
    }
    return false;
  }
  
  function insert(question) {
    console.log(question);
    vm.questions.push(question);
    // Questions.insert(question)
  }
  
  function restrictedQuestioner() {
    // only let a particular user ask questions about this item
    if (!Meteor.userId()) {
      return false;
    }
    
    if (vm.item.creator.creatorId === Meteor.userId() || vm.item.user === Meteor.userId()) {
      return false;
    }
    
    if (vm.questioner && Meteor.userId() === vm.questioner) {
      return true;
    } else if (!vm.questioner) {
      return true;
    } else {
      return false;
    }
  }
  
  function update(question, modifier) {
    var keys, key1, key2;
    
    if (canAnswer(Meteor.userId())) {
      
      /* 
        Questions.update(request._id, modifier);
      */
      
      var idx = vm.questions.indexOf(question);
      if (_.keys(modifier.$set)[0].split('.').length > 1 ) {
        keys = _.keys(modifier.$set)
        key1 = _.keys(modifier.$set)[0].split('.')[0];
        key2 = _.keys(modifier.$set)[0].split('.')[1];
        console.log(key1, key2)
        if (vm.questions[idx].hasOwnProperty(key1)) {
          vm.questions[idx][key1][key2] = modifier.$set[keys[0]];
        } else {
          vm.questions[idx][key1] = {
            createdAt: moment().toDate(),
            user: {
              id: Meteor.userId(),
              name: Meteor.user().profile.name
            }
          };
          vm.questions[idx][key1][key2] = modifier.$set[keys[0]];
        }
      }
    }
  }
}


angular.module('food-coop').component('qAndA', {
  templateUrl: 'client/request/components/questions/q-and-a.ng.html',
  controller: QandAController,
  bindings: {
    item: '<',
    questioner: '<'
  }
})