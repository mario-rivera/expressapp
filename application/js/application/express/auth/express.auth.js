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
    return API.validateAccessToken(token)
    .fail(function( jqXHR, textStatus, errorThrown ){
        FUNCTIONS.redirect('login');
    });
};

Auth.AccessToken = function(){
    return LOCALSTORAGE.getAccessToken();
};

}( jQuery, EXPRESS ));