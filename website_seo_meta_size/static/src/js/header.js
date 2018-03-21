odoo.define('website_seo_meta_size', function(require) {
    "use strict";
    var ajax = require("web.ajax");
    var base = require("web_editor.base");
    var core = require("web.core");
    var Model = require('web.Model');
    var seo = require("website.seo");

    ajax.loadXML('/website_seo_meta_size/static/src/xml/header.xml', core.qweb);

    //MODIFIER le contenu de la variable avec Splice ? comme pour l'éditeur

//         Configurator = Dialog.extend({
//             maxTitleSize: 90, 
//             maxDescriptionSize: 300,        
//         });
// 
//     return {
//     Configurator: Configurator,
//     };

    var Configurator = Dialog.extend({
        template: 'website.seo_configuration',
        events: {
            'keyup input[name=seo_page_keywords]': 'confirmKeyword',
            'blur input[name=seo_page_title]': 'titleChanged',
            'blur textarea[name=seo_page_description]': 'descriptionChanged',
            'click button[data-action=add]': 'addKeyword',
        },
        canEditTitle: false,
        canEditDescription: false,
        canEditKeywords: false,
        canEditLanguage: false,
        maxTitleSize: 90, // limit for site name SERP is 600 pixel, but Title size is not limited
        maxDescriptionSize: 300,  // Google limit in november 2017

        init: function (parent, options) {
            options = options || {};
            _.defaults(options, {
                title: _t('Promote This Page'),
                subtitle: _t('Get this page efficiently referenced in Google to attract more visitors.'),
                buttons: [
                    {text: _t('Save'), classes: 'btn-primary', click: this.update},
                    {text: _t('Discard'), close: true},
                ],
            });

            this._super(parent, options);
        },
        start: function () {
            var self = this;

            this.$modal.addClass('oe_seo_configuration js_seo_configuration');

            this.htmlPage = new HtmlPage();
            this.$('.js_seo_page_url').text(this.htmlPage.url());
            this.$('input[name=seo_page_title]').val(this.htmlPage.title());
            this.$('textarea[name=seo_page_description]').val(this.htmlPage.description());

            this.keywordList = new KeywordList(self, { page: this.htmlPage });
            this.keywordList.on('list-full', self, function () {
                self.$('input[name=seo_page_keywords]').attr({
                    readonly: "readonly",
                    placeholder: "Remove a keyword first"
                });
                self.$('button[data-action=add]').prop('disabled', true).addClass('disabled');
            });
            this.keywordList.on('list-not-full', self, function () {
                self.$('input[name=seo_page_keywords]').removeAttr('readonly').attr('placeholder', "");
                self.$('button[data-action=add]').prop('disabled', false).removeClass('disabled');
            });
            this.keywordList.on('selected', self, function (word, language) {
                self.keywordList.add(word, language);
            });
            this.keywordList.appendTo(this.$('.js_seo_keywords_list'));
            this.disableUnsavableFields();
            this.renderPreview();
            this.getLanguages();
        },
        getLanguages: function () {
            var self = this;
            ajax.jsonRpc('/web/dataset/call_kw', 'call', {
                model: 'website',
                method: 'get_languages',
                args: [[base.get_context().website_id]],
                kwargs: {context: base.get_context()}
            }).then( function (data) {
                self.$('#language-box').html(core.qweb.render('Configurator.language_promote', {
                    'language': data,
                    'def_lang': base.get_context().lang
                }));
            });
        },
        disableUnsavableFields: function () {
            var self = this;
            this.loadMetaData().then(function (data) {
                self.canEditTitle = data && ('website_meta_title' in data);
                self.canEditDescription = data && ('website_meta_description' in data);
                self.canEditKeywords = data && ('website_meta_keywords' in data);
                if (!self.canEditTitle) {
                    self.$('input[name=seo_page_title]').attr('disabled', true);
                }
                if (!self.canEditDescription) {
                    self.$('textarea[name=seo_page_description]').attr('disabled', true);
                }
                if (!self.canEditTitle && !self.canEditDescription && !self.canEditKeywords) {
                    self.$footer.find('button[data-action=update]').attr('disabled', true);
                }
            });
        },
        suggestImprovements: function () {
            var self = this;
            var tips = [];
            _.each(tips, function (tip) {
                displayTip(tip.message, tip.type);
            });

            function displayTip(message, type) {
                new Tip(self, {
                message: message,
                type: type,
                }).appendTo(self.$('.js_seo_tips'));
            }
        },
        confirmKeyword: function (e) {
            if (e.keyCode == 13) {
                this.addKeyword();
            }
        },
        addKeyword: function (word) {
            var $input = this.$('input[name=seo_page_keywords]');
            var $language = this.$('select[name=seo_page_language]');
            var keyword = _.isString(word) ? word : $input.val();
            var language = $language.val().toLowerCase();
            this.keywordList.add(keyword, language);
            $input.val("");
        },
        update: function () {
            var self = this;
            var data = {};
            if (this.canEditTitle) {
                data.website_meta_title = this.htmlPage.title();
            }
            if (this.canEditDescription) {
                data.website_meta_description = this.htmlPage.description();
            }
            if (this.canEditKeywords) {
                data.website_meta_keywords = this.keywordList.keywords().join(", ");
            }
            this.saveMetaData(data).then(function () {
            self.close();
            });
        },
        getMainObject: function () {
            var repr = $('html').data('main-object');
            var m = repr.match(/(.+)\((\d+),(.*)\)/);
            if (!m) {
                return null;
            } else {
                return {
                    model: m[1],
                    id: m[2]|0
                };
            }
        },
        loadMetaData: function () {
            var obj = this.getMainObject();
            var def = $.Deferred();
            if (!obj) {
                // return $.Deferred().reject(new Error("No main_object was found."));
                def.resolve(null);
            } else {
                var fields = ['website_meta_title', 'website_meta_description', 'website_meta_keywords'];
                var model = new Model(obj.model).call('read', [[obj.id], fields, base.get_context()]).then(function (data) {
                    if (data.length) {
                        var meta = data[0];
                        meta.model = obj.model;
                        def.resolve(meta);
                    } else {
                        def.resolve(null);
                    }
                }).fail(function () {
                    def.reject();
                });
            }
            return def;
        },
        saveMetaData: function (data) {
            var obj = this.getMainObject();
            if (!obj) {
                return $.Deferred().reject();
            } else {
                return new Model(obj.model).call('write', [[obj.id], data, base.get_context()]);
            }
        },
        titleChanged: function () {
            var self = this;
            _.defer(function () {
                var title = self.$('input[name=seo_page_title]').val();
                self.htmlPage.changeTitle(title);
                self.renderPreview();
            });
        },
        descriptionChanged: function () {
            var self = this;
            _.defer(function () {
                var description = self.$('textarea[name=seo_page_description]').val();
                self.htmlPage.changeDescription(description);
                self.renderPreview();
            });
        },
        renderPreview: function () {
            var preview = new Preview(this, {
                title: this.htmlPage.title(),
                description: this.htmlPage.description(),
                url: this.htmlPage.url(),
            });
            var $preview = this.$('.js_seo_preview');
            $preview.empty();
            preview.appendTo($preview);
        },
        destroy: function () {
            this.htmlPage.changeKeywords(this.keywordList.keywords());
            this._super.apply(this, arguments);
        },
    });

    website.TopBar.include({
        start: function () {
            this.$el.on('click', 'a[data-action=promote-current-page]', function () {
                new Configurator(this).open();
            });
            return this._super();
        }
    });

    return {
        Configurator: Configurator,
    };
    

});
