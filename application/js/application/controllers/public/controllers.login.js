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
};

Controller.startLogin = function(){
    // handle form submit
    $('form#login').on('submit', this.onSubmitLogin);    
};

Controller.onSubmitLogin = function(event){
    event.preventDefault();
    // grab the form
    var $form = $(this);
    
    // prepare ajax settings
    var xhrsettings = {
        context: $form,
        data: $form.serializeArray(),
        beforeSend: function( jqXHR, settings ){
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
    
    // do login
    EXPRESS.API.Login(xhrsettings)
    .done(function(data, textStatus, jqXHR){
        // console.log(data);
        EXPRESS.LOCALSTORAGE.save( {access_token: data['api_token']} );
        EXPRESS.FUNCTIONS.redirect('dashboard');
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        var e = EXPRESS.API.UTILITY.formatError(jqXHR.responseJSON);
        // if( e['error'] == 'validation' ){}
        EXPRESS.MESSAGES.notifyErrors( e['error_description'] );
    });
};

}( jQuery, CONTROLLERS ));