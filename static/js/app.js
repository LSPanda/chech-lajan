(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Chèch Lajan
*
* /app.js - client entry point
*
* started @ 03/12/14
*/
var $ = require( "jquery" ),
    FastClick = require( "fastclick" ),
    Router = require( "./router" );

"use strict";

window.app.now = new Date();

$( function() {
    FastClick( document.body );

    console.log( window.app );
    console.log( "ready." );

    window.app.router = new Router();
    window.app.router.start();
} );

},{"./router":2,"fastclick":"fastclick","jquery":"jquery"}],2:[function(require,module,exports){
/* Chèch Lajan
*
* /router.js - backbone router
*
* started @ 12/12/14
*/

"use strict";

var _ = require( "underscore" ),
    Backbone = require( "backbone" );

Backbone.$ = require( "jquery" );

var MainView = require( "./views/main" );
var HeaderView = require( "./views/header" );

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

        //2. launch router
        Backbone.history.start( {
            "pushState": true
        } );

    },

    "showTerminalsList": function() {
        console.log( "showTerminalsList" )
    },

    "showTerminalsMap": function() {
        console.log( "showTerminalsMap" )
    },

    "showTerminalsDetails": function() {
        console.log( "showTerminalsDetails" )
    }

} );

},{"./views/header":3,"./views/main":4,"backbone":"backbone","jquery":"jquery","underscore":"underscore"}],3:[function(require,module,exports){
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

},{"backbone":"backbone","jquery":"jquery","underscore":"underscore"}],4:[function(require,module,exports){
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
    }

} )

},{"backbone":"backbone","jquery":"jquery","underscore":"underscore"}]},{},[1]);
