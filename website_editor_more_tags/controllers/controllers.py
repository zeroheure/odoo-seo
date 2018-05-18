# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request

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


class  website_sale(WebsiteSale):

    @http.route(['/shop/delivery/get_data_mondial_relay'], type='json', auth="public", website=True)
    def get_data(self):

        mondial=http.request.env['website.config.settings'].browse([request.website.id])
        data={
                "brand":"",
                "country_code":"",
                "allowed_countries":"",
                "zip":"",
                "col_liv_mod":"",
                "weight":"",
                "nb_results":"",
                "search_delay":"",
                "css":"",
                "map_scroll_wheel":"",
                "map_street_view":"",
                "results_map":"",
                "display_info":"",
                "Service":"",
        }
        if request.website.sudo().mondial_carrier_mondialrelay_id:
            if request.website.sudo().mondial_carrier_mondialrelay_id.active==True:
                order = request.website.sale_get_order()
                if not order:
                    return request.redirect("/shop")
                data={
                            "brand":request.website.mondial_brand,
                            "country_code":order.partner_id.country_id.code,
                            "allowed_countries":  ','.join(request.website.mondial_allowed_country_ids.mapped('code')),
                            "zip":order.partner_id.zip,
                            "col_liv_mod":request.website.mondial_col_liv_mod,
                            "weight":"",
                            "nb_results":request.website.mondial_nb_results,
                            "search_delay":request.website.mondial_search_delay,
                            "css":request.website.mondial_css,
                            "map_scroll_wheel":request.website.mondial_map_scroll_wheel,
                            "map_street_view":request.website.mondial_map_street_view,
                            "results_map":request.website.mondial_results_map,
                            "display_info":request.website.mondial_display_info,
                            "Service":request.website.mondial_services,
                        }
        return data
