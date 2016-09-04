/*
|--------------------------------------------------------------------------
| Register User Controller
|--------------------------------------------------------------------------
|
*/
(function ( $, CONTROLLERS ) {
    
var Controller = {};

Controller.handle = function(){
    this.startRegister();
    
    return this.ready.resolve();
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
        // console.log(data);
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

// register and  extend the base controller
CONTROLLERS['REGISTER'] = CONTROLLERS.Factory(Controller);
    
}( jQuery, CONTROLLERS ));