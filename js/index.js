// var nav = require('responsive-nav');
// var svg = require('svgeezy');
// var dug = require('dug');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function digRepos(repo) {
dug({
  endpoint: 'https://api.github.com/repos/' + repo,
  target: 'js-' + repo.replace(/\//g, '-') + '-stats',
  beforeRender: function(pre) {
    pre.data.forks = numberWithCommas(pre.data.forks);
    pre.data.stargazers_count = numberWithCommas(pre.data.stargazers_count);
  },
  error: function(){
    console.log('error');
  },
  template: '<li class="media-stat icon icon--star">{{data.stargazers_count}}</li>\
      <li class="media-stat icon icon--fork">{{data.forks}}</li>'
});
}

function digMeetups(meetup, sig) {
dug({
  endpoint: 'http://api.meetup.com/2/groups/?radius=25.0&order=id&group_urlname=' + meetup + '&desc=false&offset=0&format=json&page=20&fields=&sig_id=45905542&sig=' + sig, 
  target: 'js-' + meetup + '-stats',
  beforeRender: function(pre){ 
    pre.data = pre[0];
    console.log(pre);
  },
  error: function() {
    console.log('error');
  },
  template: '<strong>Members</strong> {{data.members}}',
});
}

(function() {

var repos = document.querySelectorAll("[data-repo]");
var ourMeetups = document.querySelectorAll("[data-meetup]");

for (var i = 0; i < repos.length; i++) {
  digRepos(repos[i].dataset.repo);
}

for (var i = 0; i < ourMeetups.length; i++) {
  digMeetups(ourMeetups[i].dataset.meetup, ourMeetups[i].dataset.sig);
}

})();

svgeezy.init('svg-nocheck', 'png');