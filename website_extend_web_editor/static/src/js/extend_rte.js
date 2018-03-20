odoo.define('website_extend_web_editor.rte', function (require) {
    'use strict';
    //var ajax = require("web.ajax");
    //var core = require("web.core");
    var rte = require('web_editor.rte');

    rte.Class.include({

        config: function ($editable) {
            var config = this._super.apply(this, arguments);
            config.airPopover.splice(1, 1, 
                ['font', ['bold', 'italic', 'strikethrough', 'superscript', 'subscript', 'hr', 'clear']]);
            return config;
        }
    });


    /* Backend
    * FieldTextHtml Widget 
    * see module 
    * web_editor/static/src/js/backend.js 
    */
});


 
