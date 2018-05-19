odoo.define('website_editor_default.extend_rte', function (require) {
    'use strict';
    //var ajax = require("web.ajax");
    //var core = require("web.core");
    var rte = require('web_editor.rte');

    rte.Class.include({

        
        more: function (lang, options) {
                var tplDropdown = $.summernote.renderer.getTemplate().dropdown;
                var tplButton = $.summernote.renderer.getTemplate().button;
                var dropdown = [
                    '<div class="note-align btn-group text-tags" style="min-width: 275px;">',
                    strikethrough + superscript + subscript + hr + height,
                    '</div>'
                ];
                return tplButton('+', {
                    title: 'More icons',
                    hide: true,
                    dropdown: tplDropdown(dropdown, 'text-tags', 'ul')
                });
            },

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


 
