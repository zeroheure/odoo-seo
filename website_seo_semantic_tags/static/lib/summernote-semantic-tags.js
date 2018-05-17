/**
*    Copyright 2018 zeroheure.info - Xavier Brochard (backport to summernote 0.6.16)
*    Copyright 2017 tylerecouture https://github.com/tylerecouture/summernote-add-text-tags
*    * MIT License
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
    // put it here to generate each tag icon individually
    generateBtn = function(tag, tooltip) {
        var char = tag.slice(0,1).toUpperCase();
        return tmpl.button('<'+tag+'>'+char+'</'+tag+'>', {
            event: 'semantic_tags',
            value: tag,
            title: tooltip + ' <' + tag + '>',
            // hide: true,
//             className: 'note-add-text-tags-btn'
        });
    };
    /**
    * @class plugin.semantic-tags
    */
    $.summernote.addPlugin({

        name: 'semanticTags',
        buttons: {
            semanticTags: function (lang, options) { // no hyphens in Object's name (not add-text-tags)

                generateBtn = function(tag, tooltip) {
                    var char = tag.slice(0,1).toUpperCase();
                    return tmpl.button('<'+tag+'>'+char+'</'+tag+'>', {
                        event: 'semantic_tags',
                        value: tag,
                        title: tooltip + ' <' + tag + '>',
                        // hide: true,
                        className: 'note-add-text-tags-btn'
                    });
                };

                var strong = generateBtn('strong', 'Important');
                var em = generateBtn('em', 'Accentuate');
                var mark = generateBtn('mark', 'Highlight');
                var del = generateBtn('del', 'Deleted text');
                var ins = generateBtn('ins', 'Inserted text');
                var abbr = generateBtn('abbr', 'Acronym or abbreviation');
                var q = generateBtn('q', 'Short quotation');
                var cite = generateBtn('cite', 'Title of a work or inside a quoted text');
                var figure = generateBtn('figure', 'A visual media');
                var figcaption = generateBtn('figcaption', 'Media title');

                var dropdown = '<div class="dropdown-menu">';
                dropdown    += '<div class="btn-group">';
                dropdown    += strong + em + mark + abbr + '</div>';
                dropdown    += '<div class="btn-group">';
                dropdown    += cite + q + '</div>';
                dropdown    += '<div class="btn-group">';
                dropdown    += del + ins + '</div>';
                dropdown    += '<div class="btn-group">';
                dropdown    += figure + figcaption + '</div>';
                dropdown    += '</div>';

                // tplDropdown is not exported through renderer.getTemplate()
                // return tmpl.dropdown(dropdown, '', 'div');
                return tmpl.button('SEO', {
                    title: 'Semantic tags',
                    hide: true,
                    dropdown: dropdown
                });

            },
            
            strong: function (lang, options) { return generateBtn('strong',     'Important'); },
            em:     function (lang, options) { return generateBtn('em',        'Accentuate'); },
            mark:   function (lang, options) { return generateBtn('mark',       'Highlight'); },
            q:      function (lang, options) { return generateBtn('q',    'Short quotation'); },
            cite:   function (lang, options) { return generateBtn('cite', 'Title of a work'); },
            abbr:   function (lang, options) { return generateBtn('abbr', 'Acronym, abbrev'); },
            del:    function (lang, options) { return generateBtn('del',     'Deleted text'); },
            ins:    function (lang, options) { return generateBtn('ins',    'Inserted text'); },
            figure: function (lang, options) { return generateBtn('figure', 'A visual media');},
            figcaption:  function (lang, options) { return generateBtn('figcaption', 'Media title');  },
            

        },

        // unfortunatly, JS execCommand works only with a few pre-defined tags
        events: {
            semantic_tags: function (event, editor, layoutInfo, value) {
                // insertion
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
                    // if they're not different block elements, then we need to check 
                    // if they share a common block ancestor
                    // could do this recursively, if we want to back farther up the node chain...
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
                    // from: https://github.com/summernote/summernote/pull/1919#issuecomment-304545919
                    // https://github.com/summernote/summernote/pull/1919#issuecomment-304707418

                    if (window.getSelection) {
                        var selection = window.getSelection(),
                            selected = (selection.rangeCount > 0) && selection.getRangeAt(0);

                        // Only wrap tag around selected text
                        if (selected.startOffset !== selected.endOffset) {

                            var range = selected.cloneRange();

                            var startParentElement = range.startContainer.parentElement;
                            var endParentElement = range.endContainer.parentElement;

                            // if the selection starts and ends different elements, we could be in trouble
                            if( ! startParentElement.isSameNode(endParentElement)) {
                                if ( ! self.isSelectionParsable(startParentElement, endParentElement)) {
                                    return;
                                }
                            }

                            var newNode = document.createElement(tag);
                            // https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents
                            // Parses inline nodes, but not block based nodes...blocks are handled above.
                            newNode.appendChild(range.extractContents());
                            range.insertNode(newNode)

                            // Restore the selections
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
