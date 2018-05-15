/**
*    Copyright 2018 zeroheure.info - Xavier Brochard
*    License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
**/

(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
     } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals: jQuery
        factory(window.jQuery);
    }
}(function ($) {
    // template
    var tmpl = $.summernote.renderer.getTemplate();

    $.summernote.addPlugin({

        name: 'obfuscate',
        //buttons
        buttons: {
            obfuscate: function (lang, options) { 


            },


        },
            
        // actions
        events: {
            
            attDropdown: function (event, editor, layoutInfo, value) {
                // Get current editable node
                var $editable = layoutInfo.editable();

                // Call insertText with 'bla bla'
                editor.insertText($editable, 'bla bla ' + value + ' !!!!');
            },

        }

    });
}));
