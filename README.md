# Odoo SEO

## Small modules to fix SEO problems

Odoo modules to enhance SEO according to Olivier Andrieu's books (see www.abondance.com). Following an audit by Olivier andrieu om my Odoo website, I've started to create small modules to fix SEO problems with Odoo 10. All of this is GPL and should be easily ported to other Odoo versions.


SEO Footer modules remove headings in footer because they confused search engines on page purpose, 
they also obfuscate links in footer to search engines because those links are bad for distributed page rank. Search engines can still found those links from Sitemap, which is automaticaly provided by Odoo.


## Available addons

addons | version | summary
------ | ------- | -------
website_editor_default      | 10.0.1.0.0 | Extend web editor default tags (not yet ready)
website_editor_text_tags    | 10.0.1.0.0 | Text tags editor plugin
website_seo_semantic_tags   | 10.0.1.0.0 | Replace bold, italic, etc. with semantic tags (page rank)
website_seo_no_dust         | 10.0.1.0.0 | Remove URLs parameters (dublicate content)
website_seo_meta            | 10.0.1.0.0 | Increase size of meta fields (Google update, nov. 2017) (SERP)
website_seo_footer          | 10.0.1.0.0 | Remove headings and obfuscate links in footer (page rank)
website_seo_footer_forum    | 10.0.1.0.0 | Obfuscate forum links (page rank)
website_seo_footer_more     | 10.0.1.0.0 | Obfuscate additional links (page rank)
website_seo_footer_payment  | 10.0.1.0.0 | Remode heading (page rank)
website_seo_obfuscate_link  | 10.0.1.0.0 | Provide CSS and add obfuscate tool in web-editor (not yet)
website_seo_breadcrumb      | 10.0.1.0.0 | Add microdatas datas and H6 tags in breadcrumb (SERP & page rank)
website_seo_blog            | 10.0.1.0.0 | Footer, breadcrumb and improved title for blog

## One should also install

- Canonical URLs from OCA
- Sitemap

## TODO

* SEO menu : obfuscate some menu links
* Configurable size of meta description field 
* How to Use XML Sitemaps to Boost SEO https://www.searchenginejournal.com/xml-sitemaps-seo/266907/
* SEO guide

## Other informations

* For SEO advices see https://www.abondance.com (french) or https://moz.com (english)
* For more informations see http://zeroheure.info 
