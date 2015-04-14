// var responsiveNav=function(e,t){function y(e,t){g||(g=new m(e,t));return g}var n=!!e.getComputedStyle;e.getComputedStyle||(e.getComputedStyle=function(e){this.el=e;this.getPropertyValue=function(t){var n=/(\-([a-z]){1})/g;t==="float"&&(t="styleFloat");n.test(t)&&(t=t.replace(n,function(){return arguments[2].toUpperCase()}));return e.currentStyle[t]?e.currentStyle[t]:null};return this});var r,i,s,o=t.documentElement,u=t.getElementsByTagName("head")[0],a=t.createElement("style"),f=!1,l=function(e,t,n,r){if("addEventListener"in e)try{e.addEventListener(t,n,r)}catch(i){if(typeof n!="object"||!n.handleEvent)throw i;e.addEventListener(t,function(e){n.handleEvent.call(n,e)},r)}else"attachEvent"in e&&(typeof n=="object"&&n.handleEvent?e.attachEvent("on"+t,function(){n.handleEvent.call(n)}):e.attachEvent("on"+t,n))},c=function(e,t,n,r){if("removeEventListener"in e)try{e.removeEventListener(t,n,r)}catch(i){if(typeof n!="object"||!n.handleEvent)throw i;e.removeEventListener(t,function(e){n.handleEvent.call(n,e)},r)}else"detachEvent"in e&&(typeof n=="object"&&n.handleEvent?e.detachEvent("on"+t,function(){n.handleEvent.call(n)}):e.detachEvent("on"+t,n))},h=function(e){var t=e.firstChild;while(t!==null&&t.nodeType!==1)t=t.nextSibling;return t},p=function(e,t){for(var n in t)e.setAttribute(n,t[n])},d=function(e,t){e.className+=" "+t;e.className=e.className.replace(/(^\s*)|(\s*$)/g,"")},v=function(e,t){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n," ").replace(/(^\s*)|(\s*$)/g,"")},m=function(e,n){var s;this.options={transition:400,label:"Menu",insert:"after",customToggle:"#nav-toggle",jsClass:"js",init:function(){},open:function(){},close:function(){}};for(s in n)this.options[s]=n[s];this.wrapperEl=e.replace("#","");if(!t.getElementById(this.wrapperEl))throw new Error("The nav element you are trying to select doesn't exist");this.wrapper=t.getElementById(this.wrapperEl);this.wrapper.inner=h(this.wrapper);i=this.options;r=this.wrapper;this._init(this)};m.prototype={destroy:function(){this._removeStyles();v(o,"nav-is-closed");v(o,"nav-is-open");r.removeAttribute("style");r.removeAttribute("aria-hidden");r=null;g=null;c(e,"load",this,!1);c(e,"resize",this,!1);c(s,"mousedown",this,!1);c(s,"touchstart",this,!1);c(s,"touchend",this,!1);c(s,"keyup",this,!1);c(s,"click",this,!1);i.customToggle?s.removeAttribute("aria-hidden"):s.parentNode.removeChild(s)},toggle:function(){if(!f){v(o,"nav-is-closed");d(o,"nav-is-open");p(r,{"aria-hidden":"false"});f=!0;i.open()}else{v(o,"nav-is-open");d(o,"nav-is-closed");p(r,{"aria-hidden":"true"});f=!1;i.close()}},handleEvent:function(t){var n=t||e.event;switch(n.type){case"mousedown":this._onmousedown(n);break;case"touchstart":this._ontouchstart(n);break;case"touchend":this._ontouchend(n);break;case"keyup":this._onkeyup(n);break;case"click":this._onclick(n);break;case"load":this._resize(n);break;case"resize":this._resize(n)}},_init:function(){d(o,"nav-is-closed");this._createToggle();l(e,"load",this,!1);l(e,"resize",this,!1);l(s,"mousedown",this,!1);l(s,"touchstart",this,!1);l(s,"touchend",this,!1);l(s,"keyup",this,!1);l(s,"click",this,!1)},_createStyles:function(){a.parentNode||u.appendChild(a)},_removeStyles:function(){a.parentNode&&a.parentNode.removeChild(a)},_createToggle:function(){var e=i.customToggle.replace("#","");if(!t.getElementById(e))throw new Error("The custom nav toggle you are trying to select doesn't exist");s=t.getElementById(e)},_preventDefault:function(e){if(e.preventDefault){e.preventDefault();e.stopPropagation()}else e.returnValue=!1},_onmousedown:function(t){var n=t||e.event;if(n.which!==3&&n.button!==2){this._preventDefault(t);this.toggle(t)}},_ontouchstart:function(e){s.onmousedown=null;this._preventDefault(e);this.toggle(e)},_ontouchend:function(){var e=this;r.addEventListener("click",e._preventDefault,!0);setTimeout(function(){r.removeEventListener("click",e._preventDefault,!0)},i.transition)},_onkeyup:function(t){var n=t||e.event;n.keyCode===13&&this.toggle(t)},_onclick:function(e){this._preventDefault(e)},_calcHeight:function(){var e=r.inner.offsetHeight,t="."+this.options.jsClass+" ."+this.wrapperEl+"";if(n){a.innerHTML=t;t=""}},_resize:function(){if(e.getComputedStyle(s,null).getPropertyValue("display")!=="none"){p(s,{"aria-hidden":"false"});o.className.match(/(^|\s)nav-is-closed(\s|$)/)&&p(r,{"aria-hidden":"true"});this._createStyles();this._calcHeight()}else{p(s,{"aria-hidden":"true"});p(r,{"aria-hidden":"false"});this._removeStyles()}i.init()}};var g;return y}(window,document);
// responsiveNav("#nav", { animate: false, customToggle: "nav-toggle", closeOnNavClick: false, navClass: "nav", navActiveClass: "nav-is-open", jsClass: "js" });

window.svgeezy=function(){return{init:function(t,i){this.avoid=t||false;this.filetype=i||"png";this.svgSupport=this.supportsSvg();if(!this.svgSupport){this.images=document.getElementsByTagName("img");this.imgL=this.images.length;this.fallbacks()}},fallbacks:function(){while(this.imgL--){if(!this.hasClass(this.images[this.imgL],this.avoid)||!this.avoid){var t=this.images[this.imgL].getAttribute("src");if(t===null){continue}if(this.getFileExt(t)=="svg"){var i=t.replace(".svg","."+this.filetype);this.images[this.imgL].setAttribute("src",i)}}}},getFileExt:function(t){var i=t.split(".").pop();if(i.indexOf("?")!==-1){i=i.split("?")[0]}return i},hasClass:function(t,i){return(" "+t.className+" ").indexOf(" "+i+" ")>-1},supportsSvg:function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")}}}();
svgeezy.init('svg-nocheck', 'png');

var dug=function(opts){function render(tpl,data,delims){function dotData(d,dotKey){var invert="";var filters=dotKey.split("|"),name=filters.shift();if(name.indexOf("!")>-1){name=name.replace(/!/ig,"");invert="!"}try{val=eval(invert+"d['"+name.split(".").join("']['")+"']");if(filters){for(var i=0,max=filters.length;i<max;++i){var chunks=filters[i].split(":"),filter=chunks.shift(),params=chunks;f=eval(filter);if(typeof f=="function"){newval=f.apply(d,[val].concat(params))}val=newval}}}catch(e){val=""}return val}tpl=unescape(tpl);var delims=delims||["{{","}}"];var scopeMatch=new RegExp(delims[0]+"[^"+delims[1]+"]*"+delims[1],"igm");var matches=tpl.match(scopeMatch);if(!matches)return tpl;for(var i=0,matchCount=matches.length,m;m=matches[i],i<matchCount;i++){tagMatch=new RegExp(delims[0]+"|"+delims[1],"ig"),scopeName=m.replace(tagMatch,"");if(scopeName[0]=="#"){name=scopeName.slice(1,scopeName.length);startFrag=tpl.indexOf(m);endFrag=tpl.indexOf(m.replace("#","/"))+m.length;frag=tpl.substring(startFrag+m.length,endFrag-m.length);dataFrag=dotData(data,name);rendered="";if(dataFrag){if(dataFrag.constructor==Array){for(var i=0,max=dataFrag.length;i<max;++i){rendered+=render(frag,dataFrag[i])}}else{rendered=render(frag,dataFrag,delims)}startFrag=tpl.indexOf(m);endFrag=tpl.indexOf(m.replace("#","/"))+m.length;tpl=tpl.slice(0,startFrag)+rendered+tpl.slice(endFrag,tpl.length)}}else{val=dotData(data,scopeName)||"";tpl=tpl.replace(m,val)}}return tpl}if(this.constructor!=dug){dug.instance=(new dug(opts)).show();return dug.instance}var options={target:null,endpoint:"",templateDelimiters:["{{","}}"],callbackParam:"callback",cacheExpire:1e3*60*2,beforeRender:function(){},afterRender:function(){},success:function(){},error:function(){},template:"You need a template, silly :P"},getTemplate=function(e){var e=e||options.template,t;if(e.match(/^(#|\.)\w/)){if("querySelectorAll"in document){t=document.querySelectorAll(e);if(t.length>0){t=t[0]}}else{t=document.getElementById(e.replace(/^#/,""))}if(t&&"tagName"in t){e=t.innerHTML}}return e},ext=function(e,t){for(var n in t){if(n in e){if(e[n]&&e[n].constructor==Object){ext(e[n],t[n])}else{e[n]=t[n]}}}},ago=function(e){var t=new Date(e||""),n=((new Date).getTime()-t.getTime())/1e3,r=Math.floor(n/86400);if(isNaN(r)||r<0)return;return r==0&&(n<60&&"just now"||n<120&&"1 minute ago"||n<3600&&Math.floor(n/60)+" minutes ago"||n<7200&&"1 hour ago"||n<86400&&Math.floor(n/3600)+" hours ago")||r==1&&"Yesterday"||r<7&&r+" days ago"||r<31&&Math.ceil(r/7)+" week"+(Math.ceil(r/7)>1?"s":"")+" ago"||r<365&&Math.ceil(r/30)+" months ago"||r>=365&&Math.ceil(r/365)+" year"+(Math.ceil(r/365)>1?"s":"")+" ago"},cache=function(e,t){if(typeof localStorage!==undefined&&typeof JSON!==undefined){var n=(new Date).getTime(),r=null;if(t==undefined){try{r=JSON.parse(unescape(localStorage.getItem(e)))}catch(i){}if(r){if(n-r.time<options.cacheExpire){r=r.data}else{localStorage.removeItem(e);r=null}}else{r=null}return r}else{try{localStorage.setItem(e,escape(JSON.stringify({time:n,data:t})))}catch(i){console.log(i)}}}else{return null}},get=function(){dug.requests=dug.requests==undefined?1:dug.requests+1;var e=document.createElement("script");var t="callback"+dug.requests,n=document.body.children,r=document.scripts[document.scripts.length-1],i=render(options.endpoint),s=r.parentNode.nodeName!="head";dug[t]=function(e,t){e=e.results?e.results:e;if(t!==true){cache(i,e)}var n=document.createElement("div");options.beforeRender.call(this,e);n.innerHTML=render(getTemplate(),e,options.templateDelimiters);if(options.target==null){r.parentNode.insertBefore(n,r);options.target=n}else{if(options.target.nodeName){options.target.innerHTML=n.innerHTML}else if(typeof options.target=="string"){document.getElementById(options.target).innerHTML=n.innerHTML}}options.afterRender.call(this,options.target);options.success.call(this,e)};e.onerror=options.error;if(cachedData=cache(i)){dug[t](cachedData,true)}else{e.src=i+(i.indexOf("?")>-1?"&":"?")+options.callbackParam+"=dug."+t;document.getElementsByTagName("head")[0].appendChild(e)}},init=function(e){if(e&&e!=undefined){if(e.constructor==Object){ext(options,e)}}};for(var o in options){(function(e){this[e]=function(t){if(arguments.length){options[e]=t}else{return options[e]}}}).call(this,o)}this.show=function(e){init(e);get();return this};dug.render=render;dug.extend=ext;dug.cache=cache;dug.ago=ago;init(opts)};dug._script=document.scripts[document.scripts.length-1]

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

function digMeetups(meetup, epoint) {
dug({
  endpoint: epoint,
  target: 'js-' + meetup + '-stats',
  beforeRender: function(pre){
    if(typeof pre.problem !== 'undefined') {
      console.warn(pre);
    } else {
      pre.data = pre[0];
    }
  },
  error: function(e) {
    console.warn(e);
  },
  template: '<li class="media-stat icon icon--member">{{data.members}} members</li>',
});
}

(function() {

var repos = document.querySelectorAll("[data-repo]");
var ourMeetups = document.querySelectorAll("[data-meetup]");

for (var i = 0; i < repos.length; i++) {
  digRepos(repos[i].dataset.repo);
}

for (var i = 0; i < ourMeetups.length; i++) {
  digMeetups(ourMeetups[i].dataset.meetup, ourMeetups[i].dataset.endpoint);
}

})();

window.smoothScroll=function(){if(document.querySelectorAll===void 0||window.pageYOffset===void 0||history.pushState===void 0){return}var e=function(e){if(e.nodeName==="HTML")return-window.pageYOffset;return e.getBoundingClientRect().top+window.pageYOffset};var t=function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1};var n=function(e,n,r,i){if(r>i)return n;return e+(n-e)*t(r/i)};var r=function(t,r,i){r=r||500;var s=window.pageYOffset;if(typeof t==="number"){var o=parseInt(t)}else{var o=e(t)}var u=Date.now();var a=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){window.setTimeout(e,15)};var f=function(){var e=Date.now()-u;window.scroll(0,n(s,o,e,r));if(e>r){if(typeof i==="function"){i(t)}}else{a(f)}};f()};var i=function(e){e.preventDefault();if(location.hash!==this.hash)window.history.pushState(null,null,this.hash);r(document.getElementById(this.hash.substring(1)),500,function(e){location.replace("#"+e.id)})};document.addEventListener("DOMContentLoaded",function(){var e=document.querySelectorAll('a[href^="#"]'),t;for(var n=e.length;t=e[--n];){t.addEventListener("click",i,false)}});return r}()

Scrollpoints=function(a){var b={},c=[],d={once:!0,reversed:!1,when:"entered",offset:0},e=function(b){b===a&&(b={});var c={};for(var e in d)c[e]=b.hasOwnProperty(e)?b[e]:d[e];return c},f=function(a){return a.offsetTop},g=function(a){return f(a)+a.offsetHeight},h=function(){return window.scrollY||document.documentElement.scrollTop},i=function(){return h()+window.innerHeight},j=function(a){return a.reversed?!a.done&&h()<g(a.element)-a.offset:!a.done&&i()>f(a.element)+a.offset},k=function(b,c){var d=c===a?b.reversed:c;return d?!b.done&&h()<f(b.element)-b.offset:!b.done&&i()>g(b.element)+b.offset},l=function(a){return a.reversed?!a.done&&i()<g(a.element)-a.offset:!a.done&&h()>f(a.element)+a.offset},m=function(b,c){var d=c===a?b.reversed:c;return d?!b.done&&i()<f(b.element)-b.offset:!b.done&&h()>g(b.element)+b.offset};return b.add=function(a,b,d){var f=e(d),g=!0;(("entered"===f.when||"entering"===f.when)&&f.reversed||("left"===f.when||"leaving"===f.when)&&f.reversed)&&(g=!1),c.push({element:a,callback:b,once:f.once,reversed:f.reversed,when:f.when,offset:f.offset,active:g,done:!1})},b.configure=function(a){d=e(a)},window.addEventListener("scroll",function(){c.forEach(function(a){(!a.active&&("leaving"===a.when||"left"===a.when)&&k(a,!1)||!a.active&&("entering"===a.when||"entered"===a.when)&&m(a,!1))&&(a.active=!0);var c="entered"===a.when&&k(a)||"entering"===a.when&&j(a)||"leaving"===a.when&&l(a)||"left"===a.when&&m(a);a.active&&c&&(a.callback.call(window,a.element),a.done=!0,a.once||(("entered"===a.when||"entering"===a.when)&&b.add(a.element,function(){a.done=!1},{when:"left",reversed:!a.reversed}),("left"===a.when||"leaving"===a.when)&&b.add(a.element,function(){a.done=!1},{when:"entered",reversed:!a.reversed})))})}),b}();
var elem = document.querySelector('.js-cta');
if(elem) {
  Scrollpoints.add(elem, function(domElement) {
    elem.className += " is-visible";
  }, {
    when: 'entered',
    once: true
  });
}
