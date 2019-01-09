define([
  'summernote/core/agent',
  'summernote/core/func',
  'summernote/core/list',
  'summernote/core/dom',
  'summernote/core/range',
  'summernote/core/async',
  'summernote/editing/Style',
  'summernote/editing/Typing',
  'summernote/editing/Table',
  'summernote/editing/Bullet'
], function (agent, func, list, dom, range, async,
             Style, Typing, Table, Bullet) {

  var KEY_BOGUS = 'bogus';

  /**
   * @class editing.Editor
   *
   * Editor
   *
   */
  var Editor = function (handler) {

    var self = this;
    var style = new Style();
    var table = new Table();
    var typing = new Typing();
    var bullet = new Bullet();

    this.style = style;   // ODOO: allow access for override
    this.table = table;   // ODOO: allow access for override
    this.typing = typing; // ODOO: allow access for override
    this.bullet = bullet; // ODOO: allow access for override

// XAVIER

    /**
     * unlink
     *
     * @type command
     *
     * @param {jQuery} $editable
     */
    this.unlink = function ($editable) {
      var rng = this.createRange($editable);
      if (rng.isOnAnchor()) {
        var anchor = dom.ancestor(rng.sc, dom.isAnchor);
        rng = range.createFromNode(anchor);
        rng.select();

        beforeCommand($editable);
        document.execCommand('unlink');
        afterCommand($editable);
      }
    };

    /**
     * create link (command)
     *
     * @param {jQuery} $editable
     * @param {Object} linkInfo
     * @param {Object} options
     */
    this.createLink = function ($editable, linkInfo, options) {
      var linkUrl = linkInfo.url;
      var linkText = linkInfo.text;
      var isNewWindow = linkInfo.isNewWindow;
      var rng = linkInfo.range || this.createRange($editable);
      var isTextChanged = rng.toString() !== linkText;

      options = options || dom.makeLayoutInfo($editable).editor().data('options');

      beforeCommand($editable);

      if (options.onCreateLink) {
        linkUrl = options.onCreateLink(linkUrl);
      }

      var anchors = [];
      // ODOO: adding this branch to modify existing anchor if it fully contains the range
      var ancestor_anchor = dom.ancestor(rng.sc, dom.isAnchor);
      if(ancestor_anchor && ancestor_anchor === dom.ancestor(rng.ec, dom.isAnchor)) {
          anchors.push($(ancestor_anchor).html(linkText).get(0));
      } else if (isTextChanged) {
        // Create a new link when text changed.
        var anchor = rng.insertNode($('<A>' + linkText + '</A>')[0]);
        anchors.push(anchor);
      } else {
        anchors = style.styleNodes(rng, {
          nodeName: 'A',
          expandClosestSibling: true,
          onlyPartialContains: true
        });
      }

      $.each(anchors, function (idx, anchor) {
        $(anchor).attr('href', linkUrl);
        $(anchor).attr('class', linkInfo.className || null); // ODOO: addition
        $(anchor).css(linkInfo.style || {}); // ODOO: addition
        if (isNewWindow) {
          $(anchor).attr('target', '_blank');
        } else {
          $(anchor).removeAttr('target');
        }
        // XAVIER: obfuscate link
        if (isObfuscate) {
            $(anchor).removeAttr('href');
            $(anchor).attr('onclick', 'window.location=\'linkUrl\';');
        }
      });

      var startRange = range.createFromNodeBefore(list.head(anchors));
      var startPoint = startRange.getStartPoint();
      var endRange = range.createFromNodeAfter(list.last(anchors));
      var endPoint = endRange.getEndPoint();

      range.create(
        startPoint.node,
        startPoint.offset,
        endPoint.node,
        endPoint.offset
      ).select();

      afterCommand($editable);
    };

    /**
     * returns link info
     *
     * @return {Object}
     * @return {WrappedRange} return.range
     * @return {String} return.text
     * @return {Boolean} [return.isNewWindow=true]
     * @return {String} [return.url=""]
     */
    this.getLinkInfo = function ($editable) {
      this.focus($editable);

      var rng = range.create().expand(dom.isAnchor);

      // Get the first anchor on range(for edit).
      var $anchor = $(list.head(rng.nodes(dom.isAnchor)));

      return {
        range: rng,
        text: rng.toString(),
        isNewWindow: $anchor.length ? $anchor.attr('target') === '_blank' : false,
        url: $anchor.length ? $anchor.attr('href') : ''
      };
    };

// XAVIER
  };

  return Editor;
});
 
