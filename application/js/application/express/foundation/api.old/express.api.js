/*
|--------------------------------------------------------------------------
| EXPRESS API
|--------------------------------------------------------------------------
|
*/
(function ( $, EXPRESS, LOCALSTORAGE ) {

var API = Namespace( 'API', EXPRESS );
var AJAX = Namespace( 'API.AJAX', EXPRESS );

API.url = "http://express.dev/";

API.call = function( options ){
	var deferred = $.Deferred();

	var settings = {};
  	settings.xhr = $.extend( {}, AJAX.defaultOptions, options );
    settings.apipromise = deferred;
	settings.tries = 0;
    
	AJAX.stack.calls.push( settings );
	AJAX.processStack();

	return deferred.promise();
};

API.RefreshSession = function(){
    var refreshSettings = $.extend( {}, AJAX.defaultOptions, {url: 'http://express.dev/refresh'} );
    // make a direct ajax call instead of adding it to the call stack
    return AJAX.ajax( refreshSettings );
};

API.Authenticate = function(credentials){
	var authSettings = {
		url: 'http://express.dev/login/ajax',
		method: 'POST',
		data: {
			email: credentials.username,
			password: credentials.password,
			remember: true
		}
	};

	var settings = $.extend( {}, AJAX.defaultOptions, authSettings );
    
    // make a direct ajax call instead of adding it to the call stack
	return AJAX.ajax(settings)
	.done(function(){
		console.log('u are authenticated');
	})
	.fail(function(){
		console.log('auth failed');
	});
};

API.ReAuthenticate = function(){
    var credentials = LOCALSTORAGE.getCredentials();
    // returns a promise
    return API.Authenticate(credentials);
};

}( jQuery, EXPRESS, EXPRESS.LOCALSTORAGE ));