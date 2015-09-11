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


    Template.money.rendered = function(){
      var entityType = Session.get('entityType');
      var percentTotal = Session.get('percentTotal');
      var entityMoney = Session.get('entityMoney');
      var divTotal = Session.get('divTotal');

      for(i = 0; i<entityType.length; i++){
      $('.graph-cont').append('<div class = "bar bar'+i+'">'+entityType[i]+' '+ percentTotal[i]+'% <span class = "rightSide right"> '+entityMoney[i]+'</span> </div>');
      $('body').append('<style> .bar'+i+'::after{max-width:'+divTotal[i]+'%}</style>')
    }

}
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}
