# -*- coding: utf-8 -*-
from odoo import http

# class ExtendWebEditor(http.Controller):
#     @http.route('/extend_web_editor/extend_web_editor/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/extend_web_editor/extend_web_editor/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('extend_web_editor.listing', {
#             'root': '/extend_web_editor/extend_web_editor',
#             'objects': http.request.env['extend_web_editor.extend_web_editor'].search([]),
#         })

#     @http.route('/extend_web_editor/extend_web_editor/objects/<model("extend_web_editor.extend_web_editor"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('extend_web_editor.object', {
#             'object': obj
#         })