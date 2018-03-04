# -*- coding: utf-8 -*-
# Copyright 2018 Xavier Brochard
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).
{
    "name": "Website SEO Payments Footer",
    "summary": "Remove Heading tag (H4) from payments list in footer.",
    "version": "10.0.1.0.0",
    "category": "Website",
    "website": "https://zeroheure.info/",
    "author": "Xavier Brochard, zeroheure.info",
    "license": "LGPL-3",
    "application": False,
    "installable": True,
    "depends": [
        "website_sale",
        "website_seo_footer",
    ],
    "data": [
        "views/seo_payment.xml",
    ],
}
