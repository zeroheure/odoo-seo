odoo.define('website_extend_web_editor.extend_rte', function (require) {
    'use strict';
    //var ajax = require("web.ajax");
    //var core = require("web.core");
    var rte = require('web_editor.rte');

    
//     context.memo('button.extend-rte', function () {
//         return ui.buttonGroup([
//             ui.button({
//                 className: 'dropdown-toggle',
//                 contents: '<b>+</b> ' + ui.icon(options.icons.caret, 'span'),
//                 tooltip: 'Additional text styles',
//                 data: {
//                     toggle: 'dropdown'
//                 }
//             }),
//             ui.dropdown([
//                 ui.buttonGroup({
//                     className: 'note-add-text-tags-code',
//                     children: [strikethrough, superscript, subscript, hr, height, codeview]
//                 }),
//             ])
//         ]).render();
//     });
    
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


 
