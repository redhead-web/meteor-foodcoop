function MeteorStatusController($scope, $reactive, $mdToast) {
  // body...
  $reactive(this).attach($scope);
  
  let vm = this;
  
  vm.updateCountdownTimeout;
  vm.nextRetry = 0;
  vm.options = {
      style: true,
      lang: 'en',
      position: 'bottom',
      showLink: true,
      msgText: '',
      linkText: '',
      overlay: false
  };
  vm.firstConnection = true;
  
  vm.autorun(function() {
      //set nextRetry delay update
      if(Meteor.status().status === 'waiting') {
          vm.updateCountdownTimeout = Meteor.setInterval(function() {
              vm.nextRetry = Math.round((Meteor.status().retryTime - (new Date()).getTime()) / 1000));
          }, 1000);
      } else {
          vm.nextRetry = 0;
          Meteor.clearInterval(vm.updateCountdownTimeout);
      }
  });
  
  //do not alert on first connection to avoid meteor status flashing
  vm.autorun(function(computation) {
      if(Meteor.status().connected && Meteor.status().status === 'connected') {
          vm.firstConnection = false;
          computation.stop();
      }
  });
  
  
  
  
  
}

angular.module('meteor-status', []).component('meteorStatus', {
  controller: MeteorStatusController,
  bindings: {
    options: "<"
  },
  template: ""
})

Template.meteorStatus.helpers({
    langDisconnected: function() {
        if(Template.instance().options.msgText) {
            return Template.instance().options.msgText.replace('%delay%', Template.instance().nextRetry.get());
        } else {
            return meteorStatusI18n[Template.instance().options.lang].disconnected.replace('%delay%', Template.instance().nextRetry.get());
        }
    },
    langRetryLink: function() {
        if(Template.instance().options.linkText) {
            return Template.instance().options.linkText;
        } else {
            return meteorStatusI18n[Template.instance().options.lang].retry;
        }
    },
    isStyled: function() {
        return Template.instance().options.style;
    },
    showLink: function() {
        return Template.instance().options.showLink;
    },
    position: function () {
        if(Template.instance().options.overlay) {
            return 'meteor-status-overlay';
        } else {
            if(Template.instance().options.position === 'top') {
                return 'meteor-status-top';
            } else {
                return 'meteor-status-bottom';
            }
        }
    },
    show: function () {
        //only show alert after the first connection attempt, if disconnected, if not manually disconnected (status == 'offline), if at least second retry
        if(!Template.instance().firstConnection.get() && !Meteor.status().connected && Meteor.status().status !== 'offline' && Meteor.status().retryCount > 1){
            return true;
        }
        return false;
    }
});

Template.meteorStatus.events({
    'click a.meteor-status-retry': function() {
        if(Meteor.status().status !== 'connecting') {
            Meteor.reconnect();
        }
        return false;
    }
});


Template.meteorStatus.onCreated(function () {
    var vm = this;

    vm.updateCountdownTimeout;
    vm.nextRetry = new ReactiveVar(0);
    vm.options = {
        style: true,
        lang: 'en',
        position: 'bottom',
        showLink: true,
        msgText: '',
        linkText: '',
        overlay: false
    };
    vm.firstConnection = new ReactiveVar(true);

    //get template params
    if(Template.currentData()) {
        for(var property in vm.options) {
            if(Template.currentData()[property] !== undefined) {
                vm.options[property] = Template.currentData()[property];
            }
        }
    }

    //set tracker for retry delay
    Tracker.autorun(function() {
        //set nextRetry delay update
        if(Meteor.status().status === 'waiting') {
            vm.updateCountdownTimeout = Meteor.setInterval(function() {
                vm.nextRetry.set(Math.round((Meteor.status().retryTime - (new Date()).getTime()) / 1000));
            }, 1000);
        } else {
            vm.nextRetry.set(0);
            Meteor.clearInterval(vm.updateCountdownTimeout);
        }
    });

    //do not alert on first connection to avoid meteor status flashing
    Tracker.autorun(function(computation) {
        if(Meteor.status().connected && Meteor.status().status === 'connected') {
            vm.firstConnection.set(false);
            computation.stop();
        }
    });
});
