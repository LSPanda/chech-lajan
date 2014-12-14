/* Chèch Lajan
*
* /views/main.js - backbone vews for terminal
*
* started @ 12/12/14
*/

"use strict";

var _ = require( "underscore" ),
    Backbone = require( "backbone" ),
    $ = require( "jquery" );

Backbone.$ = require( "jquery" );

module.exports = Backbone.View.extend( {

    "el": "body",
    "$el": $( "body" ),

    "constructor": function() {
        Backbone.View.apply( this, arguments );

        console.log( "MainView:init()" );

        //TODO : define private accessors to subviews
    },

    "loading": function( bLoadingState ) {
        // TODO visual feedback
        if( bLoadingState ) {
            console.log( "something is loading..." );
        } else {
            console.log( "... not anymore." );
        }

    },

    "initHeader": function( HeaderView ) {
        this.$el.find( ".wrapper" ).append( HeaderView.$el );
    },

    "clearContent": function() {
        console.log( "TODO: clearContent" );
    },

    "initList": function( TerminalsListView ) {
        this.$el.find()
    },

} )
