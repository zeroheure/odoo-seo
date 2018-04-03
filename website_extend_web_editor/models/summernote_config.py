# -*- coding: utf-8 -*-
# Copyright 2018 Xavier Brochard
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).

from odoo import models, fields, api

class SummernoteConfig(models.Model):
    _name = 'summernote.config'
    _inherit = 'website.config.settings'

    settings = fields.Boolean(
        string='Summernote web editor', 
        help="Show / hide Summernote additional parameters."
    )
    strikethrough = fields.Boolean(string="Strike")
    superscript = fields.Boolean(string="Sup")
    subscript = fields.Boolean(string="Sub")
    hr = fields.Boolean(string="Line (hr)")
    height = fields.Boolean(string="Line height")
    codeview = fields.Boolean(string="Show html")
