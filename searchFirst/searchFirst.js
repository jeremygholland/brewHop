
if (Meteor.isClient) {
      Session.setDefaultPersistent('firsties', '');
    Session.setDefaultPersistent('lasties', '');
  // counter starts at 0
  Template.searchFirst.helpers({
    searchedFor: function () {
      return Session.get('someStuff');
    },
    results: function (){
      return Session.get('resultsStuff');
    },
    district: function(){
      return Session.get('district');
    },
    firstName: function(){
      return Session.get('firstName');
    },
    state: function(){
      return Session.get('state');
    },
    party: function(){
      return Session.get('party');
    },
    firsties:function(){
      return Session.get('firsties');
    },
    lasties:function(){
      return Session.get('lasties');
    }
  });

  Template.body.helpers({
    searchedFor: function () {
      return Session.get('someStuff');
    },
    results: function (){
      return Session.get('resultsStuff');
    },
    district: function(){
      return Session.get('district');
    },
    firstName: function(){
      return Session.get('firstName');
    },
    state: function(){
      return Session.get('state');
    },
    party: function(){
      return Session.get('party');
    },
    firsties:function(){
      return Session.get('firsties');
    },
    lasties:function(){
     return Session.get('lasties');
    }
  });

  Template.searchFirst.events({
    'click button': function(event){
      
      var newSearch = (event.target.id);
      console.log(newSearch);
      var state = Session.get('state');
      $.getJSON('http://congress.api.sunlightfoundation.com/legislators?state='+state+'&district='+newSearch+'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
      var firsties = json.results[0].first_name;
      var lasties = json.results[0].last_name;
      console.log(firsties);  
      Session.setPersistent('firsties', firsties);
      Session.setPersistent('lasties', lasties);
    });

  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
