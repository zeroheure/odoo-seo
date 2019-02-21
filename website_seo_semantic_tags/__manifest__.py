# -*- coding: utf-8 -*-
# Copyright 2018 Xavier Brochard
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).
{
    'name': 'SEO Semantic Tags',
    'summary': 'Extend the website editor with semantic tags for SEO.',
    'version': '10.0.0.0.1',
    'category': 'Website',
    'website': 'https://zeroheure.info/',
    'support' : 'support@zeroheure.info',
    'author': 'Xavier Brochard, zeroheure.info',
    'license': 'LGPL-3',
    'price':'100',
    'currency':'EUR',
    'application': False,
    'installable': True,
    'depends': [
        'website',
        'web_editor',
    ],
    'data': [
        'views/assets.xml',
    ],
    'images': [
        'static/description/module_image.png',
    ],
}
