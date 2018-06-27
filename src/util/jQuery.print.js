/* @license 
 * jQuery.print, version 1.3.2
 *  (c) Sathvik Ponangi, Doers' Guild
 * Licence: CC-By (http://creativecommons.org/licenses/by/3.0/)
 *--------------------------------------------------------------------------*/
(function (jQuery) {
    "use strict";
    // A nice closure for our definitions
    function getjQueryObject(string) {
        // Make string a vaild jQuery thing
        var jqObj = jQuery("");
        try {
            jqObj = jQuery(string)
                .clone();
        } catch (e) {
            jqObj = jQuery("<span />")
                .html(string);
        }
        return jqObj;
    }

    function printFrame(frameWindow) {
        // Print the selected window/iframe
        var def = jQuery.Deferred();
        try {
            setTimeout(function () {
                // Fix for IE : Allow it to render the iframe
                frameWindow.focus();
                try {
                    // Fix for IE11 - printng the whole page instead of the iframe content
                    if (!frameWindow.document.execCommand('print', false, null)) {
                        // document.execCommand returns false if it failed -http://stackoverflow.com/a/21336448/937891
                        frameWindow.print();
                    }
                } catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
                def.resolve();
            }, 250);
        } catch (err) {
            def.reject(err);
        }
        return def;
    }

    function printContentInNewWindow(content) {
        // Open a new window and print selected content
        var w = window.open();
        w.document.write(content);
        w.document.close();
        return printFrame(w);
    }

    function isNode(o) {
        /* http://stackoverflow.com/a/384380/937891 */
        return !!(typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
    }
    jQuery.print = jQuery.fn.print = function () {
        // Print a given set of elements
        var options, jQuerythis, self = this;
        // console.log("Printing", this, arguments);
        if (self instanceof jQuery) {
            // Get the node if it is a jQuery object
            self = self.get(0);
        }
        if (isNode(self)) {
            // If `this` is a HTML element, i.e. for
            // jQuery(selector).print()
            jQuerythis = jQuery(self);
            if (arguments.length > 0) {
                options = arguments[0];
            }
        } else {
            if (arguments.length > 0) {
                // jQuery.print(selector,options)
                jQuerythis = jQuery(arguments[0]);
                if (isNode(jQuerythis[0])) {
                    if (arguments.length > 1) {
                        options = arguments[1];
                    }
                } else {
                    // jQuery.print(options)
                    options = arguments[0];
                    jQuerythis = jQuery("html");
                }
            } else {
                // jQuery.print()
                jQuerythis = jQuery("html");
            }
        }
        // Default options
        var defaults = {
            globalStyles: true,
            mediaPrint: false,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: jQuery.Deferred()
        };
        // Merge with user-options
        options = jQuery.extend({}, defaults, (options || {}));
        var jQuerystyles = jQuery("");
        if (options.globalStyles) {
            // Apply the stlyes from the current sheet to the printed page
            jQuerystyles = jQuery("style, link, meta, title");
        } else if (options.mediaPrint) {
            // Apply the media-print stylesheet
            jQuerystyles = jQuery("link[media=print]");
        }
        if (options.stylesheet) {
            // Add a custom stylesheet if given
            jQuerystyles = jQuery.merge(jQuerystyles, jQuery('<link rel="stylesheet" href="' + options.stylesheet + '">'));
        }
        // Create a copy of the element to print
        var copy = jQuerythis.clone();
        // Wrap it in a span to get the HTML markup string
        copy = jQuery("<span/>")
            .append(copy);
        // Remove unwanted elements
        copy.find(options.noPrintSelector)
            .remove();
        // Add in the styles
        copy.append(jQuerystyles.clone());
        // Appedned content
        copy.append(getjQueryObject(options.append));
        // Prepended content
        copy.prepend(getjQueryObject(options.prepend));
        if (options.manuallyCopyFormValues) {
            // Manually copy form values into the HTML for printing user-modified input fields
            // http://stackoverflow.com/a/26707753
            copy.find("input")
                .each(function () {
                    var jQueryfield = jQuery(this);
                    if (jQueryfield.is("[type='radio']") || jQueryfield.is("[type='checkbox']")) {
                        if (jQueryfield.prop("checked")) {
                            jQueryfield.attr("checked", "checked");
                        }
                    } else {
                        jQueryfield.attr("value", jQueryfield.val());
                    }
                });
            copy.find("select").each(function () {
                var jQueryfield = jQuery(this);
                jQueryfield.find(":selected").attr("selected", "selected");
            });
            copy.find("textarea").each(function () {
                // Fix for https://github.com/DoersGuild/jQuery.print/issues/18#issuecomment-96451589
                var jQueryfield = jQuery(this);
                jQueryfield.text(jQueryfield.val());
            });
        }
        // Get the HTML markup string
        var content = copy.html();
        // Notify with generated markup & cloned elements - useful for logging, etc
        try {
            options.deferred.notify('generated_markup', content, copy);
        } catch (err) {
            console.warn('Error notifying deferred', err);
        }
        // Destroy the copy
        copy.remove();
        if (options.iframe) {
            // Use an iframe for printing
            try {
                var jQueryiframe = jQuery(options.iframe + "");
                var iframeCount = jQueryiframe.length;
                if (iframeCount === 0) {
                    // Create a new iFrame if none is given
                    jQueryiframe = jQuery('<iframe height="0" width="0" border="0" wmode="Opaque"/>')
                        .prependTo('body')
                        .css({
                            "position": "absolute",
                            "top": -999,
                            "left": -999
                        });
                }
                var w, wdoc;
                w = jQueryiframe.get(0);
                w = w.contentWindow || w.contentDocument || w;
                wdoc = w.document || w.contentDocument || w;
                wdoc.open();
                wdoc.write(content);
                wdoc.close();
                printFrame(w)
                    .done(function () {
                        // Success
                        setTimeout(function () {
                            // Wait for IE
                            if (iframeCount === 0) {
                                // Destroy the iframe if created here
                                jQueryiframe.remove();
                            }
                        }, 100);
                    })
                    .fail(function (err) {
                        // Use the pop-up method if iframe fails for some reason
                        console.error("Failed to print from iframe", err);
                        printContentInNewWindow(content);
                    })
                    .always(function () {
                        try {
                            options.deferred.resolve();
                        } catch (err) {
                            console.warn('Error notifying deferred', err);
                        }
                    });
            } catch (e) {
                // Use the pop-up method if iframe fails for some reason
                console.error("Failed to print from iframe", e.stack, e.message);
                printContentInNewWindow(content)
                    .always(function () {
                        try {
                            options.deferred.resolve();
                        } catch (err) {
                            console.warn('Error notifying deferred', err);
                        }
                    });
            }
        } else {
            // Use a new window for printing
            printContentInNewWindow(content)
                .always(function () {
                    try {
                        options.deferred.resolve();
                    } catch (err) {
                        console.warn('Error notifying deferred', err);
                    }
                });
        }
        return this;
    };
})(jQuery);
