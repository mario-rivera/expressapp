/*
|--------------------------------------------------------------------------
| Application Main Controller
|--------------------------------------------------------------------------
|
*/
(function ( $, CONTROLLERS ) {
    
var Controller = {};

Controller.handle = function(){
    $('.sidebar-toggle').toggleSidebar({target: "#appsidebar"});
    
    return this.ready.resolve();
};

// register and  extend the base controller
CONTROLLERS['APP'] = CONTROLLERS.Factory(Controller);

}( jQuery, CONTROLLERS ));