# Website SEO meta

Increase length of meta title and meta description fields, better Google preview, add tips and ...

Odoo limit meta Title to 70 characters, but Google doesn't have such limit. The 2 real limits are 

1. for the home page, the site name must be in the first 600 pixels (nearly 70 characters), for the other pages the site name must end each meta Title ; 
2. on the search results page, Google will display only 70 characters (Bing 40). 

Title length is not otherwise limited. This module allows 120 characters in meta Title (maxTitleSize).

Since november 2017 Google increase the meta description length to nearly 300 characters. This module allows 320 characters in meta Description (maxDescriptionSize). Note that the description is not related to SEO, but to Search Engines Result Page (SERP). Google will not use it for referencing your page but to print its search results. Google will pick your description or not, if it is relevant to search keywords

Additionaly, this module will display preview with Google's color and truncate URLs and title according to Google's rules.

## TODO

- ~~words count in Title : between 10 to 12 words~~
- print product category for use in Title
- ~~check if Title or Description is too short~~
- check if site name (website_name) is in Title (and position)
- configurable length and other variables (need controler file)
- Bing, Yandex, Baidu options

### References

- https://moz.com/learn/seo/meta-description
- may 2018 : https://smartsearchmarketing.com/google-title-tag-serp-preview-tool
- may 2018 : https://www.abondance.com/actualites/20180516-19236-google-reduit-taille-de-snippets-meta-description.html
- jan 2015 : https://www.abondance.com/actualites/20150121-14619-balise-meta-description-size-matters.html

### tools
- https://www.jqueryscript.net/other/jQuery-SEO-Preview-Plugin.html
- https://smartsearchmarketing.com/google-title-tag-serp-preview-tool
- https://smartsearchmarketing.com/wp-content/themes/betterweather/assets/js/modules/jquery.seo-widget.js

## Contributors

- Xavier Brochard zeroheure@zeroheure.info

## Maintainer

ZeroHeure
https://zeroheure.info

Please, report bugs at https://github.com/zeroheure/odoo-seo/issues
