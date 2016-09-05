/*
|--------------------------------------------------------------------------
| Login Controller
|--------------------------------------------------------------------------
|
*/
(function ( $, CONTROLLERS ) {

var Controller = Namespace( 'LOGIN', CONTROLLERS );

Controller.handle = function(){
    this.startLogin();
    
    return this.handled.resolve();
};

Controller.startLogin = function(){
    // handle form submit
    $('form#login').on('submit', this.onSubmitForm);
};

Controller.onSubmitForm = function(event){
    event.preventDefault();
    // grab the form
    var form = this;
    
    // do login
    EXPRESS.AUTH.Login(form)
    .done(function(data, textStatus, jqXHR){
        // console.log(data);
        EXPRESS.LOCALSTORAGE.save( {access_token: data['api_token']} );
        EXPRESS.FUNCTIONS.redirect('dashboard');
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        var e = EXPRESS.API.UTILITY.formatError(jqXHR.responseJSON);
        if( e['error'] == 'validation' ){
            EXPRESS.VALIDATION.renderFormErrors( form, e['error_description'] );
        } else {
            EXPRESS.MESSAGES.notifyErrors( e['error_description'] );    
        }
    });
};

}( jQuery, CONTROLLERS ));