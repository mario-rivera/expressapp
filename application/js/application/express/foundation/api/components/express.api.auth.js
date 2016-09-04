/*
|--------------------------------------------------------------------------
| EXPRESS API AUTH
|--------------------------------------------------------------------------
|
*/
(function ( $, API ) {
    
var AUTH = Namespace( 'AUTH', API );

AUTH.validateAccessToken = function( token ){
	return API.get({
		url: '/token/validate',
		token: token,
		beforeSend: function(jqXHR, settings){
			if( !token ){ jqXHR.abort() }
		}
	});
};

AUTH.Login = function(settings){
	var _settings = {
		url: '/auth/login',
		token: null
	};
	
	// method's own settings overwrite the ones passed down to the function
	settings = $.extend(settings, _settings);
	return API.post(settings);
};

AUTH.Register = function(settings){
	var _settings = {
		url: '/auth/register',
		token: null
	};
	
	// method's own settings overwrite the ones passed down to the function
	settings = $.extend(settings, _settings);
	return API.post(settings);
};

}( jQuery, EXPRESS.API ));