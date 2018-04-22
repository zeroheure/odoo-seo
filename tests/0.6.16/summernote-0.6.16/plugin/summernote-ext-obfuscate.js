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
        buttons: { // buttons
            obfuscate: function (lang, options) { // no hyphens in Object's name


            },


        },
            

        events: {
            add_tt: function (event, editor, layoutInfo, value) {
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
            
            attDropdown: function (event, editor, layoutInfo, value) {
                // Get current editable node
                var $editable = layoutInfo.editable();

                // Call insertText with 'bla bla'
                editor.insertText($editable, 'bla bla ' + value + ' !!!!');
            },

        }

    });
}));
