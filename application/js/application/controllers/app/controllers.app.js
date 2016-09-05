/*
|--------------------------------------------------------------------------
| Application Main Controller
|--------------------------------------------------------------------------
|
*/
(function ( $, CONTROLLERS ) {
    
var Controller = Namespace( 'APP', CONTROLLERS );

Controller.handle = function(){
    $('.sidebar-toggle').toggleSidebar({target: "#appsidebar"});
    
    return this.handled.resolve();
};

}( jQuery, CONTROLLERS ));