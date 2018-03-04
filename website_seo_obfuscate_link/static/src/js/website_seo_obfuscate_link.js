odoo.define('website_seo_obfuscate_link', function (require) {
/* FieldTextHtml Widget see module web_editor/static/src/js/backend.js */

var FieldTextHtmlSimple = web_editor.backend.widget.extend({
    template: 'web_editor.FieldTextHtmlSimple',
    _config: function () {
        var self = this;
        var config = {
            'focus': false,
            'height': 180,
            'toolbar': [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'add-text-tags', 'clear']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture']],
                ['history', ['undo', 'redo']]
            ],
            'prettifyHtml': false,
            'styleWithSpan': false,
            'inlinemedia': ['p'],
            'lang': "odoo",
            'onChange': function (value) {
                self.internal_set_value(value);
                self.trigger('changed_value');
            }
        };
        if (session.debug) {
            config.toolbar.splice(7, 0, ['view', ['codeview']]);
        }
        return config;
    },
}
