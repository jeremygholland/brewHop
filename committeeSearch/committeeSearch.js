
if (Meteor.isClient) {
  // counter starts at 0
  Template.committeeSearch.helpers({
    billStuff: function(){
      return Session.get('billStuff');
    },
    shortTitle: function(){
    return  Session.get('shortTitle');
    },
    committees: function(){
      return Session.get('committees');
    }
  });

  Template.body.helpers({

  });

  Template.committeeSearch.events({

});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
