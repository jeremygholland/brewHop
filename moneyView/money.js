if (Meteor.isClient) {
    // counter starts at 0
    Template.money.helpers({
      entityType: function(){
        return Session.get('entityType');
      }
    });


    Template.money.events({

    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}