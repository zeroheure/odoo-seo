# -*- coding: utf-8 -*-
# Copyright 2018 Xavier Brochard
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).

from odoo import models, fields, api

class SummernoteConfig(models.Model):
     _name = 'summernote.config'

     name = fields.Char(string="test")
     strikethrough = fields.Boolean(string="strike")
     superscript = fields.Boolean(string="sup")
     subscript = fields.Boolean(string="sub")
     hr = fields.Boolean(string="hr line")
     height = fields.Boolean(string="line height")
     codeview = fields.Boolean(string="html code")
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         self.value2 = float(self.value) / 100
