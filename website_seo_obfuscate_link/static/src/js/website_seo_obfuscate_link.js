odoo.define('website_seo_obfuscate_link.rte', function (require) {
    'use strict';
    var ajax = require("web.ajax");
    //var core = require("web.core");
    var rte = require('web_editor.rte');

    //ajax.loadJS('/website_seo_obfuscate_link/static/lib/summernote-add-text-tags.js');


    rte.Class.include({
        config: function ($editable) {
            var config = this._super.apply(this, arguments);
            config.plugin : {};
            //config.plugin(require) {('summernote-add-text-tags.js');};
                //{ ajax.loadJS('/website_seo_obfuscate_link/static/lib/summernote-add-text-tags.js'); };
            config.airPopover.splice(1, 1, ['font', ['bold', 'italic', 'clear']]);
            return config;
        }
    });


    /* Backend
    * FieldTextHtml Widget 
    * see module 
    * web_editor/static/src/js/backend.js 
    */
});




