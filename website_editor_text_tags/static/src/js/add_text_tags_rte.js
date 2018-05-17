odoo.define('website_editor_text_tags.add_text_tags_rte', function (require) {
    'use strict';
    var ajax = require("web.ajax");
    var core = require("web.core");
    var rte = require('web_editor.rte');
    ajax.loadJS('/website_editor_text_tags/static/lib/summernote-add-text-tags.js');

    rte.Class.include({

        config: function ($editable) {
            var config = this._super.apply(this, arguments);
            config.airPopover.splice(1, 1, 
                ['font', ['bold', 'italic', 'underline', 'addTextTags', 'clear']]);
            return config;
        }
    });


    /* Backend
    * FieldTextHtml Widget 
    * see module 
    * web_editor/static/src/js/backend.js 
    */
});


 
