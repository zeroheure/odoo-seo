# -*- coding: utf-8 -*-
# Copyright 2018 Xavier Brochard
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).
{
    'name': 'SEO Blog',
    'summary': 'schema.org microdatas and better heading tags in title, about and breadcrumb.',
    'version': '10.0.0.0.1',
    'category': 'Website',
    'website': 'https://zeroheure.info/',
    'support' : 'support@zeroheure.info',
    'author': 'Xavier Brochard, zeroheure.info',
    'license': 'LGPL-3',
    'price':'100',
    'currency':'EUR',
    'images': ['images/main_screenshot.png'],
    'application': False,
    'installable': True,
    'depends': [
        'website_blog',

    ],
    'data': [
        'views/templates.xml',
    ],
}
