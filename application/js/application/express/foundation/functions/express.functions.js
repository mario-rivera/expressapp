/*
|--------------------------------------------------------------------------
| EXPRESS FUNCTIONS
|--------------------------------------------------------------------------
|
*/
(function ( $, EXPRESS ) {

var FUNCTIONS = Namespace( 'FUNCTIONS', EXPRESS );

FUNCTIONS.redirect = function( location ){
    // check if the location is absolute or relative
    var is_absolute = new RegExp('^(?:[a-z]+:)?//', 'i');
    if( is_absolute.test(location) ){
        return window.location.assign(location);
    }
    
    // since this is a phonegap application, relative redirects need an extension
    if( location.lastIndexOf('.') === -1 ){
        // var extension = location.substr( location.lastIndexOf('.')+1 );
        location += '.html'    
    }
    return window.location.assign( location );
};

FUNCTIONS.hideAppLoader = function(){
    $("#app-loader").fadeOut('slow');    
};

}( jQuery, EXPRESS ));