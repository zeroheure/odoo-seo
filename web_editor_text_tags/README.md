# Add Text Tags Plugin For Editor

This is a port of the Summernote [Add Text Tags](https://github.com/tylerecouture/summernote-add-text-tags) plugin for the editor used in website. Useful to write technical datas on the website.

It adds a few elements in the font part of the toolbar :

* [Inline text elements](https://getbootstrap.com/docs/3.3/css/#type-inline-text)
  * `<mark>` highlighted text
  * `<small>` fine print
  * `<ins>` indicate text added to a document
  * `<delete>` indicating text deleted from a document

* [Inline code elements](https://getbootstrap.com/docs/3.3/css/#code)
  * `<code>` for inline code snippets
  * `<samp>` for sample output
  * `<kbd>` for indicating user input.
  * `<var>` for indicating variables.

## Limitations

* This extension doesn't use summernote's built in parser, but it can handle some basic cross-node insertions.
* The elements won't toggle on and off, however they will clear with Summernote's `Remove Font Style` button
  
## Contributors

- Tylerecouture, authored the Summernote [Add Text Tags](https://github.com/tylerecouture/summernote-add-text-tags) plugin
- Xavier Brochard zeroheure@zeroheure.info, backported Summernote module, created Odoo module

## Maintainer

ZeroHeure
https://zeroheure.info

Please, report bugs at https://github.com/zeroheure/odoo-seo/issues
