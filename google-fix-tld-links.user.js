// ==UserScript==
// @name         Google - fix TLD links
// @namespace    https://github.com/Procyon-b
// @version      0.2
// @description  Google pages - Fix regional tld in google links (other services)
// @author       Achernar
// @include      /^https://.*\.google\.(com?\.)?[^\.]*//
// @grant        none
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

function getLinks() {
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
    if ( (e!='com') && (e!=tld) ) {
      if (DEBUG) console.info('%c !!! ','color: white; background:green;',e);
      u[2]=re[1]+tld;
      i.href=u.join('/');
      }
    }
  }

getLinks();
setTimeout(getLinks,1000);

})();
