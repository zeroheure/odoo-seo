# -*- coding: utf-8 -*-
# Copyright 2018 Xavier Brochard
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).
{
    "name": "SEO Footer",
    "summary": "Remove Heading tags (H1, H2, ...) and obfuscate default links from search engines in footer (Page Rank Sculpture).",
    "version": "10.0.1.0.0",
    "category": "Website",
    "website": "https://zeroheure.info/",
    "author": "Xavier Brochard, zeroheure.info",
    "license": "LGPL-3",
    "application": False,
    "installable": True,
    "depends": [
        "website",
        "website_seo_obfuscate_link",
    ],
    "data": [
        "views/seo_footer.xml",
        "views/assets.xml",
    ],
}
