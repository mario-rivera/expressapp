/*
|--------------------------------------------------------------------------
| EXPRESS LocalStorage
|--------------------------------------------------------------------------
|
*/
(function ( $, EXPRESS ) {

var LocalStorage = Namespace( 'LOCALSTORAGE', EXPRESS );

LocalStorage.Options = {
	appID: 'express',
	aes: true
};

LocalStorage.save = function(data){
	var options = $.extend( {}, this.Options, {data: data} );

	// Saving (encypted data)
    $(window).secStore(options);

	return true;
};

LocalStorage.get = function( key ){
	var _key = key || null;
	var data; var options = $.extend( {}, this.Options );
	options.callback = function(obj){
		data = obj;
	};

	// Retrieving (encypted data aes option)
    $(window).secStore(options);
	
	if(_key){
		// return false if the key doesn't exist (to be consistent with secstore when no data is found)
		return data[_key] || false;
	}

	return data;
};

LocalStorage.empty = function(){
	var options = $.extend( {}, this.Options );
	
	// Deleting all data
    $(window).secStore('empty', options);
	
	return true;
};

LocalStorage.getAccessToken = function(){
	return this.get('access_token');
};

}( jQuery, EXPRESS ));