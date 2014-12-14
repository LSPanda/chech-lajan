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
