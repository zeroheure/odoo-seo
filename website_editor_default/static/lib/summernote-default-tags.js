/**
*    Copyright 2018 zeroheure.info - Xavier Brochard
*    MIT License
**/

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
     } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    var tmpl = $.summernote.renderer.getTemplate();

    /**
    * @class plugin.default
    */
    $.summernote.addPlugin({

        name: 'default',
        buttons: {
 
        more: function (lang, options) {
                var tplDropdown = $.summernote.renderer.getTemplate().dropdown;
                var tplButton   = $.summernote.renderer.getTemplate().button;
                var dropdown    = [
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
    }});

}));

 
