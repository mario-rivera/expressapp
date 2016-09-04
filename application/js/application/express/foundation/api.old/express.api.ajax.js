/*
|--------------------------------------------------------------------------
| EXPRESS API AJAX
|--------------------------------------------------------------------------
|
*/
(function ( $, API, AJAX ) {

AJAX.stack = {
	calls: [],
	active: false
};

AJAX.defaultOptions = {
    crossDomain: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    xhrFields: {
        withCredentials: true
    }
};

AJAX.ajax = function( settings ){
	return $.ajax( settings );
};

AJAX.processStack = function(){
    
	if( !AJAX.stack.active && AJAX.stack.calls.length ){
        // lock the calls this function will keep calling itself
        // as long as there are calls left in the array
		AJAX.stack.active = true;

		var settings = AJAX.stack.calls.shift() || {};
        var apipromise = settings.apipromise;
        
        // send the queued settings
		AJAX.request( settings )
		.done(function(data, textStatus, jqXHR){
			apipromise.resolve( data, textStatus, jqXHR );
		})
		.fail(function(jqXHR, textStatus, errorThrown){
			apipromise.reject( jqXHR, textStatus, errorThrown );
		})
		.always(function(){
			AJAX.stack.active = false;
			AJAX.processStack();
		});
	}
};

AJAX.request = function( settings ){
    // if this is the first try the current promise will be a new one
    var selfpromise = settings.selfpromise || $.Deferred();
    
    // whenever the self promise resolves/rejects, it will notify the stack
    // this may happend after a few retries because this function
    // will automatically try to refresh the csrf token or re authenticate
	settings.selfpromise = selfpromise;
	settings.tries++;

	var tries = settings.tries;

	AJAX.ajax( settings.xhr )
	.done(function(data, textStatus, jqXHR){
		// resolve the ajax call
		selfpromise.resolve( data, textStatus, jqXHR );
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		if( tries < 3 && jqXHR.responseText == 'csrf' ){
			API.RefreshSession().always(function(){
                // retry the original call (settings)
                AJAX.request( settings );
            });
		}
		else if( jqXHR.responseText == 'authenticate' ){
			API.ReAuthenticate().done(function(){
                // retry the original call (settings)
                AJAX.request( settings );
            })
            .fail(function(jqXHR, textStatus, errorThrown){
                selfpromise.reject( jqXHR, textStatus, errorThrown );
            });
		}
		else {
			selfpromise.reject( jqXHR, textStatus, errorThrown );
		}
	});

	return selfpromise.promise();
};

}( jQuery, EXPRESS.API, EXPRESS.API.AJAX ));