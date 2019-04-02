# Website SEO Footer

This module change HTML code in footer, it removes Heading tags (Hn) and obfuscate default links. WARNING : The module will re-enable the default Odoo automatic footer with Headings removed and obfuscated links. The module will replace your customized footer, but will not rewrite it by improving it. Once installed, you will have to customize and recreate texts and links manualy.

To keep some links visible to search engines, add them in related pages in a contextual manner : included in a paragraph of text with explanations — it will be better for search engine analyze.

## Why do you need this module ?

- Headings in footer break the page readibility for search engines, which confuse them on page meaning.
- Footer links are not the biggest SEO problem, but they have bad effect on page rank, as you should allways control what pages receive page rank from important pages. Purpose of obfuscated links is to not send "Page Rank Juice" to each page linked in footer. This is called Page Rank Sculpture. Links are not obfuscated to visitors, only to search engines (as long as they ignore links without href attribute). Note : the no-follow link attribute has no effect on page rank since 2016.


Reference : Google’s I/O developer conference, May 2018 : https://www.youtube.com/watch?time_continue=610&v=PFwUbgvpdaQ

## See also

For complete SEO footer, one should install

- SEO Footer More (website_seo_footer_more)
- SEO Footer Forum (website_seo_footer_forum)
- SEO Footer Payments (website_seo_footer_payments)
- Blog Footer is included in SEO Blog module (website_seo_blog).

SEO Obfuscate link (website_seo_obfuscate_link) comes with this module.

## Contributors

- Xavier Brochard zeroheure@zeroheure.info

## Maintainer

ZeroHeure
https://zeroheure.info

Please, report bugs at https://github.com/zeroheure/odoo-seo/issues
