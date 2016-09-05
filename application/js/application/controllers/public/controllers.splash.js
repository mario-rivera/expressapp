/*
|--------------------------------------------------------------------------
| SplashScreen Controller
|--------------------------------------------------------------------------
|
*/
(function ( $, CONTROLLERS ) {

var Controller = Namespace( 'SPLASH', CONTROLLERS );
// Controller.Filters = ['APP'];

Controller.handle = function(){
    var _this = this;
    
    // EXPRESS.LOCALSTORAGE.save( {access_token: 'somevalue'} );
    // EXPRESS.LOCALSTORAGE.save( {access_token: '116ccdd6c205601b4910fca7a7b42709'} );
    // EXPRESS.LOCALSTORAGE.save( {access_token: null} );
    // EXPRESS.LOCALSTORAGE.empty();
    // console.log( EXPRESS.LOCALSTORAGE.get() );
    
    EXPRESS.AUTH.check()
    .done(function(data, textStatus, jqXHR){
        // console.log(data);
        _this.handled.resolve();
        EXPRESS.FUNCTIONS.redirect('dashboard');
    });
    
    return this.handled.promise();
};

}( jQuery, CONTROLLERS ));