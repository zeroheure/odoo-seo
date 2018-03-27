odoo.define('website_extend_web_editor.extend_rte', function (require) {
    'use strict';
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
    * see module 
    * web_editor/static/src/js/backend.js 
    */
});


 
