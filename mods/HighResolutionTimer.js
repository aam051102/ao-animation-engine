const HighResolutionTimer = window.HighResolutionTimer = window.HighResolutionTimer || (function() {
    const HighResolutionTimer = function(options) {
        this.timer = false;

        this.duration = (options.duration) ? options.duration : 1000;
        this.callback = (options.callback) ? options.callback : function() {};

        this.run = function() {
            (function(i) {
                i.timer = setTimeout(function() {
                    i.callback(i);
                    i.run();
                }, i.duration);
            }(this));

            return this;
        };

        this.stop = function(){
            clearTimeout(this.timer);
            return this;
        };
        
        return this;
    };

    return HighResolutionTimer;
}());