( function( $ ) {

    var generateGoogleMap = function() {
        gMap = new google.maps.Map( document.getElementById("gmap"), {
            center: new google.maps.LatLng( 50.846686, 4.352425 ),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAPx
        } );
    }

    $( function() {
        // call at page loading
        generateGoogleMap();

        $( ".header__menu a" ).click( function() {
            $( ".list" ).attr( "id", "list__show" );
        } );
    } );

} ).call( this, jQuery);
