/*
|--------------------------------------------------------------------------
| SplashScreen Controller
|--------------------------------------------------------------------------
|
*/
(function ( $, CONTROLLERS ) {
    
var Controller = {};

Controller.handle = function(){
    
    // EXPRESS.LOCALSTORAGE.save( {access_token: 'somevalue'} );
    // EXPRESS.LOCALSTORAGE.save( {access_token: '116ccdd6c205601b4910fca7a7b42709'} );
    // EXPRESS.LOCALSTORAGE.save( {access_token: null} );
    // EXPRESS.LOCALSTORAGE.empty();
    // console.log( EXPRESS.LOCALSTORAGE.get() );
    
    EXPRESS.AUTH.check()
    .done(function(data, textStatus, jqXHR){
        // console.log(data);
        EXPRESS.FUNCTIONS.redirect('dashboard');
    });
    
    return this.ready.promise();
};

// register and  extend the base controller
CONTROLLERS['SPLASH'] = CONTROLLERS.Factory(Controller);

}( jQuery, CONTROLLERS ));