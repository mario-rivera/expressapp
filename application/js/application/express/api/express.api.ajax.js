/*
|--------------------------------------------------------------------------
| EXPRESS API AJAX
|--------------------------------------------------------------------------
|
*/
(function ( $, API ) {
// import dependencies
var AJAX = API.AJAX;

AJAX.stack = {
	calls: [],
	active: false
};

AJAX.Options = {
    crossDomain: true,
	// because it is cross domain add the ajax header manually
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
	dataType: 'json'
};

AJAX.setHeader = function( header, value, xhrsettings ){
	var headers = xhrsettings.headers || {};
	headers[header] = value;
	
	xhrsettings.headers = headers;
	return xhrsettings;
};

AJAX.ajax = function( settings ){
	return $.ajax( settings );
};

// AJAX.processStack = function(){
//     
// 	if( !AJAX.stack.active && AJAX.stack.calls.length ){
//         // lock the calls this function will keep calling itself
//         // as long as there are calls left in the array
// 		AJAX.stack.active = true;
// 
// 		var settings = AJAX.stack.calls.shift() || {};
//         var apipromise = settings.apipromise;
//         
//         // send the queued settings
// 		AJAX.ajax( settings.xhr )
// 		.done(function(data, textStatus, jqXHR){
// 			apipromise.resolve( data, textStatus, jqXHR );
// 		})
// 		.fail(function(jqXHR, textStatus, errorThrown){
// 			apipromise.reject( jqXHR, textStatus, errorThrown );
// 		})
// 		.always(function(){
// 			AJAX.stack.active = false;
// 			AJAX.processStack();
// 		});
// 	}
// };

}( jQuery, EXPRESS.API ));