odoo.define('website_extend_web_editor.extend_rte', function (require) {
    'use strict';
    //var ajax = require("web.ajax");
    //var core = require("web.core");
    var rte = require('web_editor.rte');
    
    rte.Class.include({

        config: function ($editable) {
            var config = this._super.apply(this, arguments);
            config.airPopover.splice(1, 1, 
                ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']]);
            config.airPopover.splice(4, 1,
                ['para', ['ul', 'ol', 'paragraph', 'height']]);
            config.airPopover.splice(6, 1,
                ['insert', ['link', 'picture', 'hr']]);
            return config;
        }
    });

    // font 'strikethrough', 'superscript', 'subscript', 'fontname'
    // para 'height'
    // insert 'hr'
    // others 'codeview'
    
    /* Backend
    * FieldTextHtml Widget 
    * see module web_editor/static/src/js/backend.js 
    * see PR
    * https://github.com/odoo/odoo/pull/9895/commits/512ae81920727a104355553204482c3feebda6ea
    */
});


 
