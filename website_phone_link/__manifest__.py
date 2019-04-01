# -*- coding: utf-8 -*-
# Copyright 2018 Xavier Brochard
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).
{
    'name': 'Click And Call',
    'summary': 'Click and call phone number for mobile usability.',
    'version': '11.0.1.0.0',
    'category': 'Website',
    'website': 'https://zeroheure.info/',
    'support' : 'support@zeroheure.info',
    'author': 'Xavier Brochard, zeroheure.info',
    'license': 'LGPL-3',
    'application': False,
    'installable': True,
    'depends': [
        'website',
    ],
    'data': [
        'views/layout.xml',
        'views/ir_qweb.xml',
    ],
    'images': [
        'static/description/module_image.png',
    ],
}
