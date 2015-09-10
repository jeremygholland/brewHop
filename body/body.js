

if (Meteor.isClient) {
  // counter starts at 0
    Session.setDefaultPersistent('district', '');
    Session.setDefaultPersistent('firstName', '')
    Session.setDefaultPersistent('lastName', '');
    Session.setDefaultPersistent('state', '')
    Session.setDefaultPersistent('party', '');
    Session.setDefaultPersistent('firstTime', true);

  Template.body.helpers({
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

  Template.body.events({
    "submit .test": function (event) {
      event.preventDefault();
      var search = event.target.test.value;
      console.log(search);
      // increment the counter when button is clicked
      Session.setPersistent('someStuff', search);
      $.getJSON("http://congress.api.sunlightfoundation.com/legislators/locate?zip="+search+"&apikey=8b48c930d6bb4552be3b0e6248efb463").then(function (json){
        for(var i = 0; i< json.results.length; i++){
          if(json.results[i].chamber == "house"){
            var results = json.results[i].district;
            var district = json.results[i].district;
            var firstName = json.results[i].first_name;
            var lastName = json.results[i].last_name;
            var state = json.results[i].state;
            var party = json.results[i].party;
            Session.setPersistent('district', district);
            Session.setPersistent('firstName', firstName);
            Session.setPersistent('lastName', lastName);
            Session.setPersistent('state', state);
            Session.setPersistent('party', party);
            Session.setPersistent('firstSearchName', true);
            Session.setPersistent('firstTime', false)
            $('.name').append("<button class =theseCards id = "+district+"> <div class=card blue-grey darken-1 id = "+district+"><div class=card-content id = "+district+"><div id = "+district+"><h4  id = "+district+">"+firstName+" "+lastName+ " ("+party+")</h4> </div></div></div> </button>");
          }
        }
        console.log(results);
      });
      event.target.test.value = '';
    },
    "click .newSearch": function(){
      Session.setPersistent('firstTime', true);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
