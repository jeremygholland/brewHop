if (Meteor.isClient) {
    // counter starts at 0
    Template.money.helpers({
      entityType: function(){
        return Session.get('entityType');
      },
      totalMoney: function(){
        return Session.get('totalMoney');
      }

    });


    Template.money.rendered = function(){
      var entityType = Session.get('entityType');
      var percentTotal = Session.get('percentTotal');
      var entityMoney = Session.get('entityMoney');
      var divTotal = Session.get('divTotal');
      Session.setPersistent('showTwit', false);

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
