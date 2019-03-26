Website SEO no DUST
===================

This module removes queries in products URLs, keeping only categories if
needed.

Odoo add queries in URLs (like page number, price sorting, etc.),
creating several URLs for the same product page. This is to avoid in SEO
because the same content can be accessed by different URLs. As a result,
search engines index quickly grows uselessly and your page rank goes
down. This bad practice is called DUST : Duplicate URL Same Text.

The same happen with sorting features that creates new starting URLs for Google. One can either disable sorting or activate the "SEO Show Sort by" which use javascript to be hidden from Google. Instead of disabling the sort, experienced webmasters may prefer to set URL parameters in search engines console. Beware that you should do that for every search engine (whereever possible).

It is highly recommended to install also the OCA module `Website
Canonical URL`_. It will add the canonical URL in the header of each
page as `recommended by Google`_.

Contributors
------------

-  Xavier Brochard zeroheure@zeroheure.info

Maintainer
----------

ZeroHeure https://zeroheure.info

Please, report bugs at https://github.com/zeroheure/odoo-seo/issues

.. _Website Canonical URL: https://github.com/OCA/website/tree/11.0/website_canonical_url
.. _recommended by Google: https://support.google.com/webmasters/answer/139066
