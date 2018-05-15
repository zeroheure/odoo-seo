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
   * @class plugin.strong 
   * 
   * strong Plugin  
   */
  $.summernote.addPlugin({
    /** @property {String} name name of plugin */
    name: 'strong',
    /** 
     * @property {Object} buttons 
     * @property {Function} buttons.strong   function to make button
     */
    buttons: { // buttons
      strong: function (lang, options) {
        return tmpl.iconButton(options.iconPrefix + 'font', {
          event : 'strong',
          title: 'strong',
          value: 'strong',
          hide: true
        });
      }

    },

    /**
     * @property {Object} events 
     * @property {Function} events.strong  run function when button that has a 'strong' event name  fires click
     */
    events: {
      strong: function (event, editor, layoutInfo, value) {
        var $editable = layoutInfo.editable();
        editor.beforeCommand($editable);
        document.execCommand('strong', false, value);
        editor.afterCommand($editable, true);
      }
    }
  });
}));
