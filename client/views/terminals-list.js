/* Chèch Lajan
*
* /viwes/terminals-list.js - backbone terminals list
*
* started @ 12/12/14
*/

"use strict";

var _ = require( "underscore" ),
Backbone = require( "backbone" );

Backbone.$ = require( "jquery" );

var TerminalElementView = require( "./view/terminals-list" )

var _tpl;

module.exports = Backbone.View.extend( {

    "el": "<div />",

    "constructor": function() {
        Backbone.View.apply( this, arguments );

        this.collection = oTerminalsCollection;

        console.log( "TerminalsView:init()" );

        _tpl = $( "#tpl_result-list" ).remove().text();
    },

    "events": {},

    "render": function() {

        this.$el
            .html( _tpl )
            .addClass( "list" );

        var $list : this.$el.find( "ul" );

        this.collection.each( function( oTerminalModel ) {
            $list.append( ( new TerminalElementView( oTerminalModel ) ).render().$el )
        } );

        return this

    },

} );
