if (Meteor.isClient) {
    // counter starts at 0
    Template.contact.helpers({
      website: function(){
        return Session.get('website');
      },
      twitter: function(){
        return Session.get('twitterId');
      },
      youtube: function(){
        return Session.get('youtube')
      },
      showTwit: function(){
        return Session.get('showTwit');
      }

    });


    Template.contact.onRendered(function(){
    Session.setPersistent('showTwit', true);
    console.log(Session.get('showTwit'));
})
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}
