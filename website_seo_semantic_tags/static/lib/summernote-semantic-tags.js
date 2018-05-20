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

    // dialogs for abbr

    // core functions: range, dom
    var range = $.summernote.core.range;
    var dom = $.summernote.core.dom;

    var getTextOnRange = function ($editable) {
        $editable.focus();

        var rng = range.create();

        // if range on anchor, expand range with anchor
        if (rng.isOnAnchor()) {
        var anchor = dom.ancestor(rng.sc, dom.isAnchor);
        rng = range.createFromNode(anchor);
        }

        return rng.toString();
    };

    // same dialog as video plugin
    // css property position must be relative (z-index: 1050 ?)
    var showAbbrDialog = function ($editable, $dialog, text) {
        return $.Deferred(function (deferred) {
            var $abbrDialog = $dialog.find('.note-abbr-dialog');
            
            // title to insert inside abbr tag
            var $abbrAbbr = $abbrDialog.find('.note-abbr-abbr'),
                $abbrTitle = $abbrDialog.find('.note-abbr-title'),
                $abbrBtn = $abbrDialog.find('.note-abbr-btn');
            
            $abbrDialog.one('shown.bs.modal', function () {
                $abbrAbbr.val(text).on('input', function () {

                    toggleBtn($abbrBtn, $abbrTitle.val());
                }).trigger('focus');

                $abbrBtn.click(function (event) {
                    event.preventDefault();

                    deferred.resolve($abbrTitle.val());
                    $abbrDialog.modal('hide');
                });
            }).one('hidden.bs.modal', function () {
                $abbrTitle.off('input');
                $abbrBtn.off('click');

                if (deferred.state() === 'pending') {
                    deferred.reject();
                }
            }).modal('show');
        });
    };
    
    var createAbbrNode = function (title) {
        var $abbr = $('<abbr>')
            .attr('title', title);
        return $abbr;
    }

    // other tags

    // generate each tag icon individually
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
              cite: function (lang, options) { return generateBtn('cite',   'Title of a work'); },
//              abbr: function (lang, options) { return generateBtn('abbr',   'Acronym, abbrev'); },
               dfn: function (lang, options) { return generateBtn('dfn',     'Term to define'); },
               del: function (lang, options) { return generateBtn('del',       'Deleted text'); },
               ins: function (lang, options) { return generateBtn('ins',      'Inserted text'); },
                // will rather  backport existing plugin
//             figure: function (lang, options) { return generateBtn('figure',  'A visual media'); },
//         figcaption: function (lang, options) { return generateBtn('figcaption', 'Media title'); },

              abbr: function (lang, options) {
                    return tmpl.button('<abbr>A</abbr>', {
                        event: 'showAbbrDialog',
                        title: 'Acronym, abbrev',
                        value: 'abbr',
                        hide: true
                    });
              },
        },
        
        dialogs: {
            abbr: function (lang) {
                var body =  '<div class="form-group row">' +
                                '<label>Accronym or abbreviation</label>' +
                                '<input class="note-abbr-abbr form-control col-md-12" type="text" />' +
                            '</div><div class="form-group row">' +
                                '<label>Definition</label>' +
                                '<input class="note-abbr-title form-control col-md-12" type="text" />' +
                            '</div>';
                var footer = '<button href="#" class="btn btn-primary note-abbr-btn"> Insert </button>';
                // className, title, body, footer
                return tmpl.dialog('note-abbr-dialog', 'Acronym definition' , body, footer);
            }
        },


        events: {
            showAbbrDialog: function (event, editor, layoutInfo, value) {
                var $dialog = layoutInfo.dialog(),
                    $editable = layoutInfo.editable(),
                    text = getTextOnRange($editable);
                    
                editor.saveRange($editable);
                // text will be inside input
                showAbbrDialog($editable, $dialog, text).then(function (text) {
                    var $node = createAbbrNode(text);

                    if ($node) {
                        editor.insertNode($editable, $node);
                    }
                }).fail(function () {
                    // when cancel button clicked
                    editor.restoreRange($editable);
                });
            },
            // code adapted from summernote-add-text-tags plugin
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
