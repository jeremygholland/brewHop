

if (Meteor.isClient) {
  // counter starts at 0
    Session.setDefaultPersistent('district', '');
    Session.setDefaultPersistent('firstName', '')
    Session.setDefaultPersistent('lastName', '');
    Session.setDefaultPersistent('state', '')
    Session.setDefaultPersistent('party', '');
    Session.setDefaultPersistent('firstTime', true);

  Template.main.helpers({
    district: function(){
      return Session.get('district');
    },
    firstName: function(){
      return Session.get('firstName');
    },
    lastName: function(){
      return Session.get('lastName');
    },
    state: function(){
      return Session.get('state');
    },
    firstTime:function(){
      return Session.get('firstTime')
    },
    party: function(){
      Session.get('party');
    },
    searchedFor: function () {
      return Session.get('someStuff');
    },
    results: function (){
      return Session.get('resultsStuff');
    }
  });

  Template.main.rendered=function(){
    $('.name').append("<button class =theseCards id = "+district+"> <div class=card blue-grey darken-1 id = "+district+"><div class=card-content id = "+district+"><div id = "+district+"><h4  id = "+district+">"+firstName+" "+lastName+ " ("+party+")</h4> </div></div></div> </button>");
}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
