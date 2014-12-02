/* Chèch Lajan
 *
 * /routes/api/terminals.js - express routes for terminal api calls
 *
 * started @ 17/11/14
 */

"use strict";

var root = __dirname + "/../..";

var api = require( root + "/core/middlewares/api.js" ),
    db = require( root + "/core/db.js" );

var Terminal = db.get( "Terminal" );

var iMaxSearchRadius = 20,
    iArcKilometer = 0.009259;

// [GET] /api/terminals

var list = function( oRequest, oResponse ) {
    var fLatitude = parseFloat( oRequest.query.latitude ),
        fLongitude = parseFloat( oRequest.query.longitude ),
        iRadius = 5,
        iGivenRadius = +oRequest.query.radius,
        iSearchRadiusSize,
        oPosition = {
            "latitude": fLatitude,
            "longitude": fLongitude
        };

    if( !fLatitude || !fLongitude ) {
        return api.error( oRequest, oResponse, "TERMINAL_LIST_NO_POSITION",oRequest.query )
    }
    if( isNaN( iGivenRadius ) || iGivenRadius > iMaxSearchRadius ) {
        iGivenRadius = 5;
    }
    iSearchRadiusSize = iArcKilometer * iGivenRadius;
    Terminal
        .find( {
            "latitude": {
                "$gt": fLatitude - iSearchRadiusSize,
                "$lt": fLatitude + iSearchRadiusSize
            },
            "longitude": {
                "$gt": fLongitude - iSearchRadiusSize,
                "$lt": fLongitude + iSearchRadiusSize
            }
        } )
        .populate( "bank" )
        .exec( function( oError, aTerminals ) {
            var aCleanedTerminals = [],
                aSplicedTerminals;
            if( oError ) {
                return api.error( oRequest, oResponse, oError.type, oError );
            }
            if( !aTerminals ) {
                aTerminals = [];
            }
            aTerminals.forEach( function( oTerminal ) {
                aCleanedTerminals.push( oTerminal.clean( oPosition ) );
            } );
            aCleanedTerminals.sort( function( oOne, oTwo ) {
                return oOne.distance - oTwo.distance;
            } );
            console.log( "J'ai trouvé " + aCleanedTerminals.length + " terminaux" )
            aSplicedTerminals = aCleanedTerminals.splice( 0, 10 );
            console.log( "Et je vais afficher seulement " + aSplicedTerminals.length + " terminaux" )
            api.send( oRequest, oResponse, aSplicedTerminals );
        } );
};

var empty = function( oRequest, oResponse ) {
    Terminal
        .findById( oRequest.params.id )
        .exec( function( oError, oTerminal ) {
            if( oError ) {
                return api.error( oRequest. oResponse, oError.type, oError );
            }
            if( !oTerminal ) {
                return api.error( oRequest. oResponse, "TERMINAL_UNKNOWS" );
            }
            oTerminal.empty = true;
            oTerminal.save( function( oError, oSavedTerminal ) {
                if( oError ) {
                    return api.error( oRequest. oResponse, oError.type, oError );
                }
                api.send( oRequest, oResponse, true );
            } );
        } )
};

// Declare routes
exports.init = function( oApp ) {
    oApp.get( "/api/terminals", list );
    oApp.put( "/api/terminals/:id/empty", detail );
};
