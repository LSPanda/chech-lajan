/* Chèch Lajan
*
* /router.js - backbone router
*
* started @ 12/12/14
*/

"use strict";

var _ = require( "underscore" ),
    Backbone = require( "backbone" ),
    jeolok = require( "jeolok" );

Backbone.$ = require( "jquery" );

var MainView = require( "./views/main" );
var HeaderView = require( "./views/header" );
var TerminalsCollection = require( "./collections/terminals" );
var TerminalsListView = require( "./collections/terminals-list" );

var oPosition;

module.exports = Backbone.Router.extend( {

    "views": {},

    "routes": {
        "terminals/list": "showTerminalsList",
        "terminals/map": "showTerminalsMap",
        "terminals/details/:id": "showTerminalsDetails",
        "": "showTerminalsList"
    },

    "start": function() {
        //1. define & init views
        ( this.views.main = new MainView() ).render();
        this.views.main.initHeader( ( this.views.header = new HeaderView() ).render() );

        //2. get geoposition
        jeolok.getCurrentPosition( { "enableHighAccuracy": true }, function( oError, oGivenPosition ) {
            oPosition = oGivenPosition.coords;
            if( oError ) {
                console.error( "oups" )
                oPosition = {
                    latitude: 50.84275,
                    longitude: 4.35154
                };
            }
        } ) ;

        //3. launch router
        Backbone.history.start( {
            "pushState": true
        } );

    },

    "showTerminalsList": function() {
        console.log( "showTerminalsList" );
        var that = this;
        this.views.main.loading( true );
        // TODO : find visitor position
        var oTerminalsCollection = new TerminalCollection(  );
        ( this.views.list = new TerminalsListView( oTerminalCollection ) )
            .collection
                .fetch( {
                    "data"; {
                        "latitude": oPosition.latitude,
                        "longitude": oPosition.longitude
                    },
                    "success": function() {
                        console.log( "Collection fetch has been done." )
                        that.views.main.clearContent();
                        that.views.main.initList( that.views.list.render() );
                        that.views.main.loading( false );
                    }
                } )
    },

    "showTerminalsMap": function() {
        console.log( "showTerminalsMap" )
    },

    "showTerminalsDetails": function() {
        console.log( "showTerminalsDetails" )
    }

} );
