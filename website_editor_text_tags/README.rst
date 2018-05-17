Add Text Tags In Editor
=======================

This is a port of the Summernote `Add Text Tags`_ plugin for the editor
used in website. Useful to write technical datas on the website.

It adds a few elements in the font part of the toolbar :

-  `Inline text elements`_

   -  ``<mark>`` highlighted text
   -  ``<small>`` fine print
   -  ``<ins>`` indicate text added to a document
   -  ``<delete>`` indicating text deleted from a document

-  `Inline code elements`_

   -  ``<code>`` for inline code snippets
   -  ``<kbd>`` for indicating user input.
   -  ``<var>`` for indicating variables.

Limitations
-----------

-  This extension doesn’t use summernote’s built in parser, but it can
   handle some basic cross-node insertions.
-  The elements won’t toggle on and off, however they will clear with
   Summernote’s ``Remove Font Style`` button

Contributors
------------

-  Xavier Brochard zeroheure@zeroheure.info

Maintainer
----------

ZeroHeure https://zeroheure.info

Please, report bugs at https://github.com/zeroheure/odoo-seo/issues

.. _Add Text Tags: https://github.com/tylerecouture/summernote-add-text-tags
.. _Inline code elements: https://getbootstrap.com/docs/3.3/css/#code
.. _Inline text elements: https://getbootstrap.com/docs/3.3/css/#type-inline-text

