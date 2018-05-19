odoo.define('website_editor_specialchars.specialchars_rte', function (require) {
    'use strict';
    var ajax = require("web.ajax");
    var core = require("web.core");
    var rte = require('web_editor.rte');
    ajax.loadJS('/website_editor_specialchars/static/lib/summernote-ext-specialchars.js');

    rte.Class.include({

        config: function ($editable) {
            var config = this._super.apply(this, arguments);
            config.airPopover.push(
                ['specialChar', ['bold']]);
            return config;
        }
    });


    /* Backend
    * FieldTextHtml Widget 
    * see module 
    * web_editor/static/src/js/backend.js 
    */
});


 
