# -*- coding: utf-8 -*-
# Copyright 2018 Xavier Brochard
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).

from odoo import models, fields, api

class WebsiteTopCategory(models.Model):
    _inherit = "website"
    _name = 'topcategory'
    def seobreadcrumb(self):
        seobreadcrumb.name = seobreadcrumb.ref('website_sale.top00')

class WebsiteSeoBreadcrumb(models.Model):
    _name = 'seobreadcrumb'

    """Breadcrumb top value"""
    name = fields.Char(
         string="Title",
         required=True,
         help="A quite short value",
    )
