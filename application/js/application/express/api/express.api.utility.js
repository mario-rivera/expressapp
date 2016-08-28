/*
|--------------------------------------------------------------------------
| EXPRESS API UTILITY
|--------------------------------------------------------------------------
|
*/
(function ( $, API, LOCALSTORAGE ) {
// import dependencies
var UTILITY = API.UTILITY;
var AJAX = API.AJAX;

UTILITY.prepareSettings = function( settings ){
	var options = $.extend( {}, AJAX.Options, settings );
	
	// format the url
	options.url = this.ConstructUrl( options.url );
	
	// use the stored api token by default
	if( typeof(options.token) == 'undefined' ){
		AJAX.setHeader( 'Authorization', 'Bearer ' + LOCALSTORAGE.ApiToken(), options );
	}
	// options.token could be set to false in purpose to not set the authorization header 
	else if(options.token){
		AJAX.setHeader( 'Authorization', 'Bearer ' + options.token, options );
	}
	
	return options;
};

UTILITY.ConstructUrl = function( string ){
	// take out the base url if it has been passed
	var endpoint = string.replace( API.url, '' );
	
	// add the first slash if not present
	if( endpoint.charAt(0) !== '/' ){
		endpoint = '/' + endpoint;
	}
	
	// remove trailing slash if present
	if( endpoint.charAt( endpoint.length - 1 ) === '/' ){
		endpoint = endpoint.slice(0, -1);
	}
	
	// return full url
	return API.url + endpoint;
};

UTILITY.formatError = function(response){
	var e = {
		error: 'unknown',
		error_description: ''
	};
	
	if (typeof response['error_description'] === 'undefined'){
		e['error_description'] = String(response);
	} else {
		e = $.extend( e, response );
	}
	
	return e;
};

}( jQuery, EXPRESS.API, EXPRESS.LOCALSTORAGE ));