import json
from odoo import http
from odoo.http import request

from odoo.addons.website_sale.controllers.main import WebsiteSale


class SnipperGoogleMap(http.Controller):
    @http.route('/website/google_maps_api_key', type='json', auth='public', website=True)
    def google_maps_api_key(self, **post):
        google_maps_api_key = request.env['ir.config_parameter'].sudo().get_param('google_maps_api_key')
        data = {
            'google_maps_api_key': google_maps_api_key or ''
        }
        return json.dumps(data)



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

    @http.route(['/shop/delivery/get_status_mondial_relay'], type='json', auth="public", website=True)
    def get_status(self):

        cr, uid, context, registry = request.cr, request.uid, request.context, request.registry
        user =http.request.env["res.users"].browse(uid)
        company_id = user.company_id.id
        mondial=http.request.env['website.config.settings'].browse([company_id])
        if len(mondial.carrier_mondialrelay_id)>0:
            if mondial.carrier_mondialrelay_id[0].active==True:
                return http.request.website._render('website_mondial_relay.options',{})
        return ""

    @http.route(['/shop/mondial_relay'], type='http', auth="public", website=True)
    def mondial_relay(self, **post):
        order = request.website.sale_get_order()
        if not order:
            return request.redirect("/shop")
        return http.request.render('website_mondial_relay.mondial',{})


    @http.route(['/shop/add_address_mondial'], type='http', methods=['GET', 'POST'], auth="public", website=True)
    def address_mondial(self, **kw):
        Partner = request.env['res.partner'].with_context(show_address=1).sudo()
        order = request.website.sale_get_order()
        redirection = self.checkout_redirection(order)
        if redirection:
            return redirection
        if 'submitted' in kw:
            country = request.env['res.country'].search([('code', "=", kw.get('country'))])
            mode=('new', 'shipping')
            kw["country_id"] = country.id
            pre_values = self.values_preprocess(order, mode, kw)
            errors, error_msg = self.checkout_form_validate(mode, kw, pre_values)
            post, errors, error_msg = self.values_postprocess(order, mode, pre_values, errors, error_msg)

            #Forcing
            post["x_shortid_mondialrelay"]=kw.get("x_shortid_mondialrelay")
            if errors:
                errors['error_message'] = error_msg
                values = kw
            else:
                partner=Partner.search([('parent_id','=',order.partner_id.id),('x_shortid_mondialrelay','=',kw.get("x_shortid_mondialrelay"))])
                if not partner :
                    partner_id = self._checkout_form_save(mode, post, kw)
                else:
                    partner_id=partner.id
                order.partner_shipping_id = partner_id
                order.message_partner_ids = [(4, partner_id), (3, request.website.partner_id.id)]
            if not errors:
                return request.redirect('/shop/checkout')


        return request.redirect('/shop/')
