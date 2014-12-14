/* Chèch Lajan
*
* /views/header.js - backbone header view
*
* started @ 12/12/14
*/

"use strict";

var _ = require( "underscore" ),
    Backbone = require( "backbone" ),
    $ = require( "jquery" );

Backbone.$ = require( "jquery" );

var _tpl;

module.exports = Backbone.View.extend( {

    "el": "<header />",

    "constructor": function() {
        Backbone.View.apply( this, arguments );

        console.log( "HeaderView:init()" );

        _tpl = $( "#tpl_header" ).remove().text();
    },

    "event": {
        "click #reload": "reloadButtonClicked"
    },

    "render": function() {
        this.$el.html( _tpl ).addClass( "header" );


        return this;
    },

    "reloadButtonClicked": function( e ) {
        e.preventDefault()
        console.log( "reloadButtonClicked" )
    }

} );
