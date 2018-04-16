(function (factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals: jQuery
    factory(window.jQuery);
  }
}(function ($) {
  // template
  var tmpl = $.summernote.renderer.getTemplate();

  /**
   * @class plugin.add-text-tags
   */
  $.summernote.addPlugin({
    /** @property {String} name of plugin */
    name: 'addTextTags',
    /** 
     * @property {Object} buttons 
     * @property {Function} buttons.addTextTags   function to make button
     * @property {Function} buttons.attDropdown   function to make dropdown
     */
    buttons: { // buttons
      addTextTags: function (lang, options) {

        return tmpl.iconButton(options.iconPrefix + 'header', {
          event : 'addTextTags',
          title: 'addTextTags',
          hide: true
        });
      },
      attDropdown: function (lang, options) {
        var list = '<li><a data-event="attDropdown" href="#" data-value="summernote">summernote</a></li>';
        list += '<li><a data-event="attDropdown" href="#" data-value="codemirror">Code Mirror</a></li>';
        var dropdown = '<ul class="dropdown-menu">' + list + '</ul>';

        return tmpl.iconButton(options.iconPrefix + 'header', {
          title: 'addTextTags',
          hide: true,
          dropdown : dropdown
        });
      },

    },

    /**
     * @property {Object} events 
     * @property {Function} events.addTextTags  run function when button that has a 'addTextTags' event name  fires click
     * @property {Function} events.attDropdown run function when button that has a 'attDropdown' event name  fires click
     */
    events: { // events
      addTextTags: function (event, editor, layoutInfo) {
        // Get current editable node
        var $editable = layoutInfo.editable();

        // Call insertText with 'toto '
        editor.insertText($editable, 'toto ');
      },
      attDropdown: function (event, editor, layoutInfo, value) {
        // Get current editable node
        var $editable = layoutInfo.editable();

        // Call insertText with 'addTextTags'
        editor.insertText($editable, 'addTextTags ' + value + '!!!!');
      },

    }

    
  });
}));
