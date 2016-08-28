(function ( $ ) {

    $.fn.toggleSidebar = function(options) {

        var settings = $.extend({
            target: ""
        }, options );

        var sidebar = new Sidebar( $(settings.target) );

        return this.each(function( index, el ){
            if( sidebar.$el.length ){
                $(el).on("click", function(e){ sidebar.toggle() });
            }
        });
    };


    // Sidebar
    function Sidebar( $el ){
        this.$el = $el;

        if( $el.length ){
            this.$el.data( "instance", this );
            this.start();
        }
    };

    Sidebar.prototype = {
        constructor: Sidebar,
        start: function(){
            var _this = this;

            this.$el.touchwipe({
                 wipeLeft: function(){ _this.toggle() },
                 min_move_x: 10,
                 min_move_y: 10,
                 preventDefaultEvents: true
            });

        },
        toggle: function(){
            var left = this.$el.position().left;

            if(left == 0){ // hide
                this.$el.css( "left", -Math.abs( this.$el.width() ) );
            } else { // show
                this.$el.css( "left", 0 );
            }
        }
    };

}( jQuery ));
