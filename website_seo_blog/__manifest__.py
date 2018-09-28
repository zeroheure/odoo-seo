# -*- coding: utf-8 -*-
# Copyright 2018 Xavier Brochard
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).
{
    "name": "SEO Blog",
    "summary": "Add structured datas and better heading tags to blog",
    "version": "10.0.1.0.0",
    "category": "Website",
    "website": "https://zeroheure.info/",
    "author": "Xavier Brochard, zeroheure.info",
    "license": "LGPL-3",
    "application": False,
    "installable": True,
    "depends": [
        "website_blog",
        "website_seo_footer",
    ],
    "data": [
        "views/templates.xml",
    ],
}
