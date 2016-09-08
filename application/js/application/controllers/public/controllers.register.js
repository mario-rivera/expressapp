/*
|--------------------------------------------------------------------------
| Register User Controller
|--------------------------------------------------------------------------
|
*/
(function ( $, CONTROLLERS ) {

var Controller = Namespace( 'REGISTER', CONTROLLERS );

Controller.handle = function(){
    this.startRegister();
    
    return this.handled.resolve();
};

Controller.startRegister = function(){
    // handle form submit
    $('form#register').on('submit', this.onSubmitForm);
};

Controller.onSubmitForm = function(event){
    event.preventDefault();
    // grab the form
    var form = this;
    
    // do register
    EXPRESS.AUTH.Register(form)
    .done(function(data, textStatus, jqXHR){
        EXPRESS.AUTH.SavePostLoginData( data );
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