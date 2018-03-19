odoo.define('website_seo_header', function(require) {
    "use strict";
    var ajax = require("web.ajax");
    var base = require("web_editor.base");
    var core = require("web.core");
    var Model = require('web.Model');
    var seo = require("website.seo");

    ajax.loadXML('/website_seo_header/static/src/xml/header.xml', core.qweb);

    //MODIFIER le contenu de la variable avec Splice ? comme pour l'éditeur
    
    website.seo.Configurator({
        
        Configurator = Dialog.extend({
            Configurator.maxTitleSize: 90, 
            Configurator.maxDescriptionSize: 300,
            return
        
        });
    });
});
