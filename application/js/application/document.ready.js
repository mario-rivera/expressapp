/*
|--------------------------------------------------------------------------
| Start Application
|--------------------------------------------------------------------------
|
*/
(function ( $ ) {
    var app = {
        // Application Constructor
        initialize: function() {
            var method = (typeof window.cordova == 'undefined') ? 'onDeviceReady' : 'bindEvents';
            // this.bindEvents();
            this[method].apply();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', app.onDeviceReady, false);
        },
        // deviceready Event Handler
        onDeviceReady: function() {
            $(document).ready( app.onDocumentReady );
        },
        onDocumentReady: function(){
            var controller = $('body').data('controller');
            // if a controller is defined run it's handle method
            if( typeof CONTROLLERS[controller] !== 'undefined' ){
                CONTROLLERS[controller].handle();
            }
        }
    };
    
    // start the application
    app.initialize();
}( jQuery ));