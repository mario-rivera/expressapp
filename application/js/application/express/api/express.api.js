/*
|--------------------------------------------------------------------------
| EXPRESS API
|--------------------------------------------------------------------------
|
*/
(function ( $, EXPRESS, LOCALSTORAGE ) {
// define library
var API = Namespace( 'API', EXPRESS );
var AJAX = Namespace( 'API.AJAX', EXPRESS );
var UTILITY = Namespace( 'API.UTILITY', EXPRESS );


API.url = "http://express.dev/api";
// API.url = "http://express-mariortdev.rhcloud.com/api";

API.call = function( settings ){
	var xhrsettings = UTILITY.prepareSettings( settings );
	
	return AJAX.ajax( xhrsettings );
	// internal settings
	// var deferred = $.Deferred();
    // settings.apipromise = deferred;
    // 
	// AJAX.stack.calls.push( settings );
	// AJAX.processStack();
	// 
	// return deferred.promise();
};

API.get = function( settings ){
	settings.method = 'GET';
	return this.call( settings );
};

API.post = function( settings ){
	settings.method = 'POST';
	return this.call( settings );
};

API.Login = function(settings){
	var _settings = {
		url: '/auth/login',
		token: null
	};
	
	// method's own settings overwrite the ones passed down to the function
	settings = $.extend(settings, _settings);
	return this.post(settings);
};

API.validateAccessToken = function( token ){
	return this.get({
		url: '/token/validate',
		token: token,
		beforeSend: function(jqXHR, settings){
			if( !token ){ jqXHR.abort() }
		}
	});
};

}( jQuery, EXPRESS, EXPRESS.LOCALSTORAGE ));