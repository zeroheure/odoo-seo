# -*- coding: utf-8 -*-
# Copyright 2018 Xavier Brochard
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).

from odoo import models, fields, api

class SummernoteConfig(models.Model):
    _name = 'website_extend_web_editor.summernote_config'
    _inherit = 'website.config.settings'

    summernote_settings = fields.Boolean(
        string='Summernote web editor', 
        help="Show / hide Summernote additional parameters."
    )
    summernote_strikethrough = fields.Boolean(string="Strike")
    summernote_superscript = fields.Boolean(string="Sup")
    summernote_subscript = fields.Boolean(string="Sub")
    summernote_hr = fields.Boolean(string="Line (hr)")
    summernote_height = fields.Boolean(string="Line height")
    summernote_codeview = fields.Boolean(string="Show html")
