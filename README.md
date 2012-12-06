dom.to.js
=========

# What #

Creates DOM-generating-code, from DOM

# Why? #

Say you need to create some DOM in JS, and you already have the DOM generated from another source, this writes the code to do the same for you.

The outputted code is formatted in a way that you will likely want to format it in your code.

dom.to.js is a library that converts selected elements to a string.
The string is JavaScript that can be used to create the targeted element again.

The library supports pluginability of other dom creation librarys, as exists in toLaconic.js

Also, if jQuery is available, dom.to.js attaches itself as a plugin.

# usage #

Usage in vanila JS:

    domToJs(element);
    
Usage in jQuery:

    $element.toJs();
    
To use a plugin:

    domToJs(element, 'laconic');
    
# Plugins? #

Yep.

Use toLaconic.js as an example.
    
# Settings #

There is really only one setting at the moment, and that is the ability to force dom.to.js to maintain whitespace.
Usually, if you are going to use the outputted code as a basis for code you want to work with, you don't want a heap of textNodes with whitespace.
However, maintaining whitespace is useful if you want to create exactly the same HTML, say, if you were testing a plugin.

# Tests #

A fairly crude but effective test page, testPage.html, can be loaded to see the plugins in action, and if they are doing what they are supposed to do.
The page will run any plugin you add to it if you want to test your own.

# Future #

Nothin much, maybe add some other dom creation libraries?

# Browser Support #

What's supported:

All browsers, Chrome, firefox.

What's not:

Things that are not browsers, like a cake, and Internet Exploder. Even IE10 doesn't work. Why? Who cares, this is a development tool.