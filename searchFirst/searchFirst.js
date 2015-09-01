
if (Meteor.isClient) {
      Session.setDefaultPersistent('firsties', '');
    Session.setDefaultPersistent('lasties', '');
    Session.setDefaultPersistent('id', null);
    Session.setDefaultPersistent('shortTitle', null);
    Session.setDefaultPersistent('billStuff', null);
  // counter starts at 0
  Template.searchFirst.helpers({
    state: function(){
      return Session.get('state');
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
      var id = json.results[0].bioguide_id;
      Session.setPersistent('firsties', firsties);
      Session.setPersistent('lasties', lasties);
      Session.setPersistent('id', id);
      $.getJSON('http://congress.api.sunlightfoundation.com/bills?sponsor_id='+id +'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
              var billStuffs = [];
              var shortTitle = [];
              for(j=0; j<json.results.length; j++){
                if(json.results[j].congress == '114'){ 
                shortTitle.push(json.results[j].short_title);
                var billStuff = json.results[j].last_version.urls.pdf;
                billStuffs.push(billStuff);
                Session.setPersistent('billStuff', billStuffs);
                Session.setPersistent('shortTitle', shortTitle);
                }
              }
            })

    });



  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
