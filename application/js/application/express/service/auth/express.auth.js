/*
|--------------------------------------------------------------------------
| EXPRESS Auth
|--------------------------------------------------------------------------
|
*/
(function ( $, EXPRESS ) {

var Auth = Namespace( 'AUTH', EXPRESS );

var API = EXPRESS.API;
var LOCALSTORAGE = EXPRESS.LOCALSTORAGE;
var FUNCTIONS = EXPRESS.FUNCTIONS;

Auth.check = function(){
    // retrieve api token from local storage
    var token = this.AccessToken();
    
    // validate the token on the API or redirect to login page on fail
    return API.AUTH.validateAccessToken(token)
    .fail(function( jqXHR, textStatus, errorThrown ){
        FUNCTIONS.redirect('login');
    });
};

Auth.AccessToken = function(){
    return LOCALSTORAGE.getAccessToken();
};

Auth.Login = function(form){
    // grab the form
    var $form = $(form);
    
    // prepare ajax settings
    var xhrsettings = {
        context: $form,
        data: $form.serializeArray(),
        beforeSend: function( jqXHR, settings ){
            // remove any previous validation errors
            EXPRESS.VALIDATION.clearFormErrors( this );
            
            var $submit = $('button[type="submit"]', this);
            
            // disable the submit button
            $submit.attr('disabled', true);
            // cache the element's current contents
            $submit.data( 'html.cache', $submit.html() );
            $submit.html( 'Logging in, Please wait...' );
        },
        complete: function(jqXHR, textStatus){
            var $submit = $('button[type="submit"]', this);
            
            // enable the submit button
            $submit.attr('disabled', false);
            // restore original contents
            $submit.html( $submit.data('html.cache') );
            $submit.data( 'html.cache', null );
        }
    };
    
    return API.AUTH.Login(xhrsettings);
};

Auth.Register = function(form){
    // grab the form
    var $form = $(form);
    
    // prepare ajax settings
    var xhrsettings = {
        context: $form,
        data: $form.serializeArray(),
        beforeSend: function( jqXHR, settings ){
            // remove any previous validation errors
            EXPRESS.VALIDATION.clearFormErrors( this );
            
            var $submit = $('button[type="submit"]', this);
            
            // disable the submit button
            $submit.attr('disabled', true);
            // cache the element's current contents
            $submit.data( 'html.cache', $submit.html() );
            $submit.html( 'Registering user, Please wait...' );
        },
        complete: function(jqXHR, textStatus){
            var $submit = $('button[type="submit"]', this);
            
            // enable the submit button
            $submit.attr('disabled', false);
            // restore original contents
            $submit.html( $submit.data('html.cache') );
            $submit.data( 'html.cache', null );
        }
    };
    
    return API.AUTH.Register(xhrsettings);
};

}( jQuery, EXPRESS ));