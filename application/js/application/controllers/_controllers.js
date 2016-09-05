var CONTROLLERS = CONTROLLERS || {};

(function ( $, CONTROLLERS ) {
    
var Controller = function(){
    this.handled = $.Deferred();
    $.when( this.ready() ).done( this.handle );
};

Controller.prototype.ready = function(){
    var $ready = $.Deferred();
    var _this = this;
    
    if( typeof this.Filters === 'undefined' || !this.Filters.length ){
        $ready.resolveWith( _this ); 
    } else {
        var handled = [];
        for( var i=0; i < this.Filters.length; i++ ){
            var controller = CONTROLLERS.Factory( CONTROLLERS[ this.Filters[i] ] );
            handled.push( controller.handled );
        }
        
        $.when.apply( $, handled ).done(function(){
            $ready.resolveWith( _this );
        });
    }
    
    return $ready.promise();
};

Controller.prototype.handle = function(){
    return this.handled.resolve();    
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