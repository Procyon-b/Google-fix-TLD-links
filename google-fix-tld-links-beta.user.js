// ==UserScript==
// @name         Google - fix TLD links beta
// @namespace    https://github.com/Procyon-b
// @version      0.2.1
// @description  Google pages - Fix regional tld in google links (other services)
// @author       Achernar
// @include      /^https://.*\.google\.(com?\.)?[^\.]*//
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-idle
// ==/UserScript==

(function() {
'use strict';
var DEBUG=false;
var r=document.getElementById('gb');
if (DEBUG) console.info('%c userscript %c','color: white; background:red;', '',location.href,r);

var RE=new RegExp('(.*\.google\.)(.*)'), tld=RE.exec(location.host)[2];

if (/[?&]origin=([^&]+)/.test(location.search) && RE.test(unescape(RegExp.$1)) ) {
  tld=RegExp.$2;
  if (DEBUG) console.info('subframe...', tld);
  r=document.body;
  }

if (!r) return;

var applied=false, locFnd=false, locTLDs={};
try{
locTLDs=GM_getValue('locTLDs', {});
}catch(e){}

var loc=locTLDs[tld] || {}, loc0=Object.assign({},loc);

function getLinks(sv) {
  var a=r.querySelectorAll(':scope a[href^="https://"]'), u, re,e,h;
  if (DEBUG) console.info(a);
  for (let i of a) {
    if (DEBUG) console.info(i.href);
    u=i.href.split('/');
    h=u[2];
    re=RE.exec(h);
    if (!re) continue;
    e=re[2];
    if (DEBUG) console.info(u[2],e,re);
    if (i.dataset.pid && sv<2) {
      if (e!='com') {
        if (!loc[i.dataset.pid]) loc[i.dataset.pid]=-1;
        locFnd=true;
        }
      else delete loc[i.dataset.pid];
      }

    if ( (e!='com' && e!=tld) || ((sv==2) && loc[i.dataset.pid]) ) {
      applied=true;
      if (DEBUG) console.info('%c !!! ','color: white; background:green;',e);
      if (i.dataset.pid) loc[i.dataset.pid]=1;
      u[2]=re[1]+tld;
      i.href=u.join('/');
      }
    }

  if (sv==1 && tld!='com') {
    if (locFnd) {
      locTLDs[tld]=loc;
      try{
      GM_setValue('locTLDs', locTLDs);
      }catch(e){}
      }
    else {
      loc=loc0;
      if (!loc) return;
      getLinks(2);
      }
    }
  }

getLinks();
setTimeout(getLinks,1000,1);

})();
