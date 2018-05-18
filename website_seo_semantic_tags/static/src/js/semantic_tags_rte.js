odoo.define('website_seo_semantic_tags.semantic_tags_rte', function (require) {
    'use strict';
    var ajax = require("web.ajax");
    var core = require("web.core");
    var rte  = require('web_editor.rte');
    ajax.loadJS('/website_seo_semantic_tags/static/lib/summernote-semantic-tags.js');

    rte.Class.include({

        config: function ($editable) {
            var config = this._super.apply(this, arguments);
            config.airPopover.splice(1, 1, 
                ['font', ['strong', 'em', 'mark']],
                ['sem', ['q', 'cite', 'abbr']],
                ['change', ['del', 'ins']],
            );
            config.airPopover.splice(7, 1, 
                ['history', ['undo', 'redo']],
                ['help', ['clear', 'codeview', 'help']],
            );
            return config;
        }
    });


    /* Backend
    * FieldTextHtml Widget 
    * see module 
    * web_editor/static/src/js/backend.js 
    */
});


 
