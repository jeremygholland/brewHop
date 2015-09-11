if (Meteor.isClient) {
    Session.setDefaultPersistent('firsties', '');
    Session.setDefaultPersistent('lasties', '');
    Session.setDefaultPersistent('id', null);
    Session.setDefaultPersistent('shortTitle', null);
    Session.setDefaultPersistent('billStuff', null);
    Session.setDefaultPersistent('committees', null);
    Session.setDefaultPersistent('entityTotal', null);
    Session.setDefaultPersistent('entityType', null);
    Session.setDefaultPersistent('contribNames', null);
    Session.setDefaultPersistent('contribTotals', null);
    Session.setDefaultPersistent('totalMoney', null);
    Session.setDefaultPersistent('firstSearchName', true);
    Session.setDefaultPersistent('divTotal', null);
    Session.setDefaultPersistent('percentTotal', null);
    Session.setDefaultPersistent('entityMoney', null);
    Session.setDefaultPersistent('website', null);
    Session.setDefaultPersistent('youtube', null);
    Session.setDefaultPersistent('twitterId', null)
    // counter starts at 0
    Template.searchFirst.helpers({
        state: function() {
            return Session.get('state');
        },
        firstSearchName: function(){
          return Session.get('firstSearchName');
        }
    });

    Template.body.helpers({
        searchedFor: function() {
            return Session.get('someStuff');
        },
        results: function() {
            return Session.get('resultsStuff');
        },
        district: function() {
            return Session.get('district');
        },
        firstName: function() {
            return Session.get('firstName');
        },
        state: function() {
            return Session.get('state');
        },
        party: function() {
            return Session.get('party');
        },
        firsties: function() {
            return Session.get('firsties');
        },
        lasties: function() {
            return Session.get('lasties');
        }
    });

    Template.searchFirst.events({
        'click button': function(event) {
          Session.setPersistent('firstSearchName', false);
          Session.setPersistent('firstTime', false);
          console.log(Session.get('firstSearchName'));
            $('html').find('style').remove();
            $('.graph-cont').html('');
            var newSearch = (event.target.id);
            var state = Session.get('state');
            $.getJSON('http://congress.api.sunlightfoundation.com/legislators?state=' + state + '&district=' + newSearch + '&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function(json) {
                var firsties = json.results[0].first_name;
                var twitterId = json.results[0].twitter_id;
                var youtube_id = json.results[0].youtube_id;
                var website = json.results[0].website;
                var lasties = json.results[0].last_name;
                var id = json.results[0].bioguide_id;
                Session.setPersistent('youtube', youtube_id);
                Session.setPersistent('twitterId', twitterId);
                Session.setPersistent('website', website);
                Session.setPersistent('firsties', firsties);
                Session.setPersistent('lasties', lasties);
                Session.setPersistent('id', id);
                $.getJSON('http://congress.api.sunlightfoundation.com/bills?sponsor_id=' + id + '&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function(json) {
                    var billStuffs = [];
                    var shortTitle = [];
                    for (j = 0; j < json.results.length; j++) {
                        if (json.results[j].congress == '114') {
                            shortTitle.push(json.results[j].short_title);
                            var billStuff = json.results[j].last_version.urls.pdf;
                            billStuffs.push(billStuff);
                            Session.setPersistent('billStuff', billStuffs);
                            Session.setPersistent('shortTitle', shortTitle);
                        }
                    }
                })
                $.getJSON('http://congress.api.sunlightfoundation.com/committees?member_ids=' + id + '&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function(json) {
                    var committees = [];
                    for (w = 0; w < json.results.length; w++) {
                        committees.push(json.results[w].name);
                    }
                    Session.setPersistent('committees', committees);
                })
                  $.getJSON('http://transparencydata.com/api/1.0/entities.json?search='+firsties+'+'+lasties+'&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
              var newID = json[0].id;
              var totalP = json[0].count_received;
              $('.totalP').html(totalP);
              //allows for angular currency filter to work
            $.getJSON('http://transparencydata.com/api/1.0/aggregates/pol/'+newID+'/contributors.json?cycle=2014&limit=10&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
              var contribNames = [];
              var contribTotals = [];
              for(y = 0; y<json.length; y++){
                var contribName = json[y].name;
                var contribTotal = json[y].total_amount;
                contribNames.push(contribName);
                contribTotals.push(contribTotal)
                }
                Session.setPersistent('contribNames', contribNames);
                Session.setPersistent('contribTotals', contribTotals);
            });

            $.getJSON('http://transparencydata.com/api/1.0/aggregates/pol/'+newID+'/contributors/industries.json?cycle=2014&limit=10&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
              var entityTotal = [];
              var entityMoney = [];
              var entityType = [];
              for(u = 0; u<json.length; u++){
                entityTotal.push(json[u].amount);
                 entityType.push(json[u].name);
                 entityMoney.push(accounting.formatMoney(json[u].amount));
              }
              var eTotal = eval(entityTotal.join('+'));
              var totalMoney = accounting.formatMoney(eTotal);
              var divTotal = [];
              var percentTotal = [];
              for(n = 0; n <entityTotal.length; n++){
                var hmmTotal = entityTotal[n]/eTotal;
                if(hmmTotal.length>3){
                hmmTotal.substring(0,3);
                }
                var percentStuff = hmmTotal*100
                percentTotal.push(percentStuff.toFixed(2));
                var hmmWoo = (hmmTotal*250);
                divTotal.push(hmmWoo);
              }
              Session.setPersistent('divTotal', divTotal);
              Session.setPersistent('percentTotal', percentTotal);
              Session.setPersistent('totalMoney', totalMoney);
              Session.setPersistent('entityTotal', entityTotal);
              Session.setPersistent('entityMoney', entityMoney);
              Session.setPersistent('entityType', entityType);
                Session.setPersistent('firstSearchName', false);
            })
            $.getJSON('http://transparencydata.com/api/1.0/entities/'+newID+'.json?cycle=2014&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
                var hmm =json.totals['2014'].recipient_amount;
                var hmmP = json.totals['2014'].recipient_count;
              });
          })
            });
          }

         });

}
if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}
