/*
|--------------------------------------------------------------------------
| EXPRESS Messages
|--------------------------------------------------------------------------
|
*/
(function ( $, EXPRESS ) {

var MESSAGES = Namespace( 'MESSAGES', EXPRESS );
var FUNCTIONS = EXPRESS.FUNCTIONS;

MESSAGES.notify = function(settings){
    if( typeof settings === 'string'){
        return noty( {text: settings} );
    }
    
    return noty( settings );
};

MESSAGES.notifyErrors = function(errors){
    
    var settings = {
        layout: 'center',
        type: 'error',
        theme: 'relax'
    };
    
    var text = 'Error: <br/>';
    
    function iterateError(error, stack){
        
        $.each(error, function(key, description){
            // if( isNaN( parseInt(key) ) ){ }
            
            if(typeof description !== 'object'){
                stack += description + "<br/>";
            } else {
                stack = iterateError(description, stack);
            }
        });
        
        return stack;
    };
    
    if( typeof errors !== 'string' ){
        text = iterateError(errors, text);
    } else {
        text += errors;
    }
    
    settings.text = text;
    
    return this.notify(settings);
};

}( jQuery, EXPRESS ));