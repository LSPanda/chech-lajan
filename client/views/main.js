/* Chèch Lajan
 *
 * /views/main.js - backbone main application view
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

        // TODO : define private accessors to subviews
    },

    "loading": function( bLoadingState, sNewStatus ) {
        if( bLoadingState ) {
            this._status = window.app.router.views.header.getStatus();
            window.app.router.views.header.loading( true );
            window.app.router.views.header.setStatus( sNewStatus || "chargement..." );
        } else {
            window.app.router.views.header.loading( false );
            window.app.router.views.header.setStatus( sNewStatus );
        }
    },

    "initHeader": function( HeaderView ) {
        this.$el.find( ".wrapper" ).append( HeaderView.$el );
    },

    "clearContent": function() {
        console.log( "TODO:clearContent" );
    },

    "initList": function( TerminalsListView ) {
        this.$el.find( "#main" ).append( TerminalsListView.$el );
    }

} );
