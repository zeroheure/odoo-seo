/**
*    Copyright 2018 zeroheure.info - Xavier Brochard
*    Copyright 2017 tylerecouture https://github.com/tylerecouture/summernote-add-text-tags
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

    // put it here to generate each tag icon individually
    self.generateBtn = function(tag, tooltip) {
        var char = tag.slice(0,1).toUpperCase();
        return tmpl.button('<'+tag+'>'+char+'</'+tag+'>', {
            event: 'semantic_tags',
            value: tag,
            title: tooltip + ' <' + tag + '>',
        });
    };

    $.summernote.addPlugin({

        name: 'semantic-tags',
        buttons: {

            strong: function (lang, options) { return generateBtn('strong',       'Important'); },
                em: function (lang, options) { return generateBtn('em',          'Accentuate'); },
              mark: function (lang, options) { return generateBtn('mark',         'Highlight'); },
                 q: function (lang, options) { return generateBtn('q',      'Short quotation'); },
//               cite: function (lang, options) { return generateBtn('cite',   'Title of a work'); },
              abbr: function (lang, options) { return generateBtn('abbr',   'Acronym, abbrev'); },
               dfn: function (lang, options) { return generateBtn('dfn',     'Term to define'); },
               del: function (lang, options) { return generateBtn('del',       'Deleted text'); },
               ins: function (lang, options) { return generateBtn('ins',      'Inserted text'); },
            figure: function (lang, options) { return generateBtn('figure',  'A visual media'); },
        figcaption: function (lang, options) { return generateBtn('figcaption', 'Media title'); },

            cite: function (lang, options) { 
                var body =  '<div class="form-group row">' +
                                '<label>Title</label>' +
                                '<input class="note-image-url form-control col-md-12" type="text" />' +
                            '</div>';

                var footer = '<button href="#" class="btn btn-primary note-image-btn"> insert </button>';
                // className, title, body, footer
//                 return tmpl.button('<cite>C</cite>', {
                    event: show tmpl.dialog('', 'Title of a work' , body, footer);
//                     value: 'cite',
//                     title: 'Title of a work',
//                 });
            },
        },

        // code adapted from summernote-add-text-tags plugin
        events: {
            semantic_tags: function (event, editor, layoutInfo, value) {
                var self = this;
                self.areDifferentBlockElements = function(startEl, endEl) {
                    var startElDisplay = getComputedStyle(startEl, null).display;
                    var endElDisplay  = getComputedStyle(endEl, null).display;

                    if(startElDisplay !== 'inline' && endElDisplay !== 'inline') {
                        console.log("Can't insert across two block elements.")
                        return true;
                    }
                    else {
                        return false;
                    }
                };

                self.isSelectionParsable = function(startEl, endEl) {

                    if(startEl.isSameNode(endEl)) {
                        return true;
                    }
                    if( self.areDifferentBlockElements(startEl, endEl)) {
                        return false;
                    }
                    var startElParent = startEl.parentElement;
                    var endElParent = endEl.parentElement;
                    if( startEl.isSameNode(endElParent)
                        || endEl.isSameNode(startElParent)
                        || startElParent.isSameNode(endElParent) )
                    {
                        return true;
                    }
                    else
                        console.log("Unable to parse across so many nodes. Sorry!")
                        return false;
                };

                self.wrapInTag = function (tag) {
                    if (window.getSelection) {
                        var selection = window.getSelection(),
                            selected = (selection.rangeCount > 0) && selection.getRangeAt(0);

                        if (selected.startOffset !== selected.endOffset) {

                            var range = selected.cloneRange();

                            var startParentElement = range.startContainer.parentElement;
                            var endParentElement = range.endContainer.parentElement;

                            if( ! startParentElement.isSameNode(endParentElement)) {
                                if ( ! self.isSelectionParsable(startParentElement, endParentElement)) {
                                    return;
                                }
                            }

                            var newNode = document.createElement(tag);
                            newNode.appendChild(range.extractContents());
                            range.insertNode(newNode)

                            range.selectNodeContents(newNode);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    }
                };

                self.wrapInTag(value);
            },
            
        }

    });

}));
