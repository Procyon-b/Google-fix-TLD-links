# Google: fix TLD links
This fixes regional TLDs in google links (to other services).

On its homepage (www.google.com, www.google.co.uk, www.google.be, or whichever TLD is used), and on the search result pages, google directs some of its internal links to the google domain associated with the TLD used for the geographic position of your IP address. This means that if you want to use a google TLD of another country (or the .com from outside the US), or if you're travelling and still want to use your home TLD, you'll end with links to the local TLD.

This userscript rewrites every link that doesn't use the .com TLD or the TLD of the current page, and replaces every non-matching TLD with the current TLD. In the screenshots, all the tagged links are modified to use the page TLD.

**It is completely useless if you're in a location where .com is the default google tld**: all regional links have the .com domain and are not differentiable from the normal .com links - the script can't undo like with other regional TLDs.

In the screenshots below, links with TLDs other than .com and (if different) the current location tld, are tagged with a label displaying the different TLD.

This first screenshot shows google.com with regional .be tld.
When fixed, .be is replaced by .com
![](https://raw.githubusercontent.com/Procyon-b/Google-fix-TLD-links/master/screenshots/google%20tld%201.png)


This one is for google.co.uk also with regional .be tld.
When fixed, .be is replaced by .co.uk
![](https://raw.githubusercontent.com/Procyon-b/Google-fix-TLD-links/master/screenshots/google%20tld%202.png)

And finally this one is for google.fr loaded through a british proxy, and with .co.uk tld.
When fixed, .co.uk is replaced by .fr
![](https://raw.githubusercontent.com/Procyon-b/Google-fix-TLD-links/master/screenshots/google%20tld%203.png)
