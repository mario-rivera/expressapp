var CONTROLLERS = CONTROLLERS || {};

(function ( $, CONTROLLERS ) {
    
var Controller = function(){
    this.ready = $.Deferred();
};

Controller.prototype.handle = function(){
    return this.ready.resolve();    
};

CONTROLLERS.Factory = function( _prototype ){
    
    var Extended = function(){
        // Call the parent constructor, otherwise the instance will not inherit anything
        // and we need the basic main properties and functions.
        Controller.call(this);
    };
    
    Extended.prototype = $.extend( Object.create(Controller.prototype), _prototype ); // Set prototype to Parent
    Extended.prototype.constructor = Extended;   // Set constructor back to Extended
    
    return new Extended;
};

}( jQuery, CONTROLLERS ));