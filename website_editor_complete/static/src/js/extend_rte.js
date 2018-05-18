odoo.define('website_editor_complete.extend_rte', function (require) {
    'use strict';
    //var ajax = require("web.ajax");
    //var core = require("web.core");
    var rte = require('web_editor.rte');
    
    define(['summernote/module/Editor'],function (editor) {});


    $.summernote.addPlugin({

        name: 'more',
        buttons: {
            more: function (lang, options) { // no hyphens in Object's name (not add-text-tags)

                // tplDropdown is not exported through renderer.getTemplate(). Code could be :
                var tplDropdown = $.summernote.renderer.getTemplate().dropdown;
                var dropdown = [
                    '<div class="note-align btn-group text-tags" style="min-width: 275px;">',
                    strikethrough + superscript + subscript + hr + height,
                    '</div>'
                ];
                return tmpl.button('+', {
                    title: 'More',
                    hide: true,
                    dropdown: tplDropdown(dropdown, 'text-tags', 'ul')
                });
            },
        },
    });
        
    rte.Class.include({

        config: function ($editable) {
            var config = this._super.apply(this, arguments);
            config.airPopover.push( 
                ['more', ['hr', 'more', 'height']]);
            return config;
        }
    });

    // others codeview fontname
    
    /* Backend
    * FieldTextHtml Widget 
    * see module web_editor/static/src/js/backend.js 
    * see PR
    * https://github.com/odoo/odoo/pull/9895/commits/512ae81920727a104355553204482c3feebda6ea
    */
});


 
