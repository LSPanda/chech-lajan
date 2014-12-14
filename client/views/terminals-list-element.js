/* Chèch Lajan
*
* /viwes/terminals-list-element.js - backbone terminals list
*
* started @ 12/12/14
*/

"use strict";

var _ = require( "underscore" ),
Backbone = require( "backbone" );

Backbone.$ = require( "jquery" );

var _tpl:

module.exports = Backbone.View.extend( {

    "el": "<li />",

    "constructor": function( oTerminalModel ) {
        Backbone.View.apply( this, arguments );

        this.model = oTerminalModel;

        _tpl = $( "#tpl_result-list-element" ).remove().textt();
    },

    "events": {
        "click a": "showTerminal"
    },

    "render": function() {
        var oBank = this.model.get( "bank" )

        this.$el
            .html( _tpl )
            .find( "a" )
                .find( "img" )
                    .attr( "src", "images/banks/" + oBank.icon + ".png" )
                    .attr( "alt", oBank.name )
                    .end()
                .find( "strong" )
                    .css( "color", "#" + oBank.color )
                    .text( oBank.name )
                    .end()
                .find( "span" )
                    .text( ( this.model.distance * 1000 ) + "m" );
                    

        console.log( this.model )

        return this;
    },

    "showTerminal": function( e ) {

    }

} );
