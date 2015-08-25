

if (Meteor.isClient) {
  // counter starts at 0
    Session.setDefault('someStuff', 'this is a placeholder');

  Template.test.helpers({
    searchedFor: function () {
      return Session.get('someStuff');
    }
  });

  Template.test.events({
    "submit .test": function (event) {
      event.preventDefault();
      var search = event.target.test.value;
      console.log(search);
      // increment the counter when button is clicked
      Session.set('someStuff', search);
      $.getJSON('http://api.brewerydb.com/v2/locations/'+search+'?key4b50655001c2875f2ef1e4cf9dc31c6c').then(function (json){
        console.log(json.data[0].name);
      });
      event.target.test.value = '';
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
