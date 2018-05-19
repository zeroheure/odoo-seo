odoo.define('website_editor_default.extend_rte', function (require) {
    'use strict';
    var ajax = require("web.ajax");
    var core = require("web.core");
    var rte = require('web_editor.rte');
    ajax.loadJS('/website_editor_default/static/lib/summernote-default-tags.js');
    
    rte.Class.include({

        config: function ($editable) {
            var config = this._super.apply(this, arguments);
            config.airPopover.push( 
                ['more', ['bold', 'more', 'bold']]);
            return config;
        },
    });

    // others: codeview fontname

    /* Backend
    * FieldTextHtml Widget 
    * see module web_editor/static/src/js/backend.js 
    * see PR
    * https://github.com/odoo/odoo/pull/9895/commits/512ae81920727a104355553204482c3feebda6ea
    */
});


 
