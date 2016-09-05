/*
|--------------------------------------------------------------------------
| Application Main Controller
|--------------------------------------------------------------------------
|
*/
(function ( $, CONTROLLERS ) {
    
var Controller = Namespace( 'DASHBOARD', CONTROLLERS );
Controller.Filters = ['APP'];

Controller.handle = function(){    
    return this.handled.resolve();
};

}( jQuery, CONTROLLERS ));