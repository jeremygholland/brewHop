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
      }

    });


    Template.contact.rendered = function(){
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'"http"':'"https"';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

}
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}
