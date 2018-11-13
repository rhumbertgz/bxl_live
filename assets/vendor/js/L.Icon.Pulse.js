(function(window) {

    L.Icon.Pulse = L.DivIcon.extend({

        options: {
            className: '',
            iconSize: [12,12],
            fillColor: 'red',
            color: 'red',
            animate: true,
            heartbeat: 1,
            shape: 0,
        },

        initialize: function (options) {
            L.setOptions(this,options);

            // css
            var shapeStyle = '',
                animation = '';
            if (this.options.shape === 0) {
              shapeStyle = ' leaflet-pulsing-icon ';
              animation = ' pulsate ' + this.options.heartbeat + 's ease-out';
            } else {
             shapeStyle = ' leaflet-rect-fade-icon ';
             animation = ' fadeIn 0s ease '
            }
            // var uniqueClassName = 'lpi-'+ new Date().getTime()+'-'+Math.round(Math.random()*100000);
            var uniqueClassName = 'lpi';
            var before = ['background-color: '+this.options.fillColor,];
            var after = [
                'box-shadow: 0 0 4px 2px '+this.options.color,
                'animation:'+ animation,
                'animation-iteration-count: infinite',
            ];

            if (!this.options.animate){
                after.push('animation: none');
                after.push('box-shadow:none');
            }

            var css = [
                '.'+uniqueClassName+'{'+before.join(';')+';}',
                '.'+uniqueClassName+':after{'+after.join(';')+';}',
            ].join('');
 
            var el = document.createElement('style');
            if (el.styleSheet){
                el.styleSheet.cssText = css;
            } else {
                el.appendChild(document.createTextNode(css));
            }

            document.getElementsByTagName('head')[0].appendChild(el);

            // apply css class

            this.options.className = this.options.className + shapeStyle + uniqueClassName;

            // initialize icon
            
            L.DivIcon.prototype.initialize.call(this, options);
        
        }
    });

    L.icon.pulse = function (options) {
        return new L.Icon.Pulse(options);
    };


    L.Marker.Pulse = L.Marker.extend({
        initialize: function (latlng,options) {
            options.icon = L.icon.pulse(options);
            L.Marker.prototype.initialize.call(this, latlng, options);
        }
    });

    L.marker.pulse = function (latlng,options) {
        return new L.Marker.Pulse(latlng,options);
    };

})(window);