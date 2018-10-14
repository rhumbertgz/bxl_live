var IconFactory = function() {    
    this.rightHead = "<svg viewBox='0 0 451.847 451.847'><path d='M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z'/></svg>"
    this.leftHead = "<svg viewBox='0 0 451.847 451.847'><path d='M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z'/></svg>"
    this.upHead = "<svg viewBox='0 0 451.847 451.846'><path d='M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z'/></svg>"
    this.downHead = "<svg viewBox='0 0 451.847 451.846'><path d='M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z'/></svg>"
                
};

IconFactory.prototype.getColor =  function(capacity) {
    switch (capacity) {
        case 1: // 30%
            return '#5cd65c';
        case 2: // 60%
            return '#ffc266';
        default: // 90%
            return '#ff1a1a';
    }
} 


IconFactory.prototype.upLeftArrow = function (color) {
    return `<div class="arrow" style="color:${color}">
                <span class="up-left-head first"> ${this.upHead} </span>
                <span class="up-left-head second"> ${this.upHead} </span>
                <span class="up-left-head third"> ${this.upHead} </span>
            </div` ; 
};

IconFactory.prototype.downLeftArrow = function (color) {
    return `<div class="arrow" style="color:${color}">
                <span class="down-left-head first"> ${this.downHead} </span>
                <span class="down-left-head second"> ${this.downHead} </span>
                <span class="down-left-head third"> ${this.downHead} </span>
            </div` ; 
};

IconFactory.prototype.upRightArrow = function (color) {
    return `<div class="arrow" style="color:${color}">
                <span class="up-right-head first"> ${this.upHead} </span>
                <span class="up-right-head second"> ${this.upHead} </span>
                <span class="up-right-head third"> ${this.upHead} </span>
            </div` ; 
};

IconFactory.prototype.downRightArrow = function (color) {
    return `<div class="arrow" style="color:${color}">
                <span class="down-right-head first"> ${this.downHead} </span>
                <span class="down-right-head second"> ${this.downHead} </span>
                <span class="down-right-head third"> ${this.downHead} </span>
            </div` ; 
};

IconFactory.prototype.rightArrow = function (color) {
    return `<div class="arrow" style="color:${color}">
                <span class="right-head first"> ${this.rightHead} </span>
                <span class="right-head second"> ${this.rightHead} </span>
                <span class="right-head third"> ${this.rightHead} </span>
            </div` ; 
};

IconFactory.prototype.leftArrow = function (color) {
    return `<div class="arrow" style="color:${color}">
                        <span class="left-head first"> ${this.leftHead} </span>
                        <span class="left-head second"> ${this.leftHead} </span>
                        <span class="left-head third"> ${this.leftHead} </span>
                     </div` ;
};

IconFactory.prototype.downArrow = function (color) {
    return `<div class="arrow" style="color:${color}">
    <span class="down-head first"> ${this.downHead} </span>
    <span class="down-head second"> ${this.downHead} </span>
    <span class="down-head third"> ${this.downHead} </span>
  </div`;
};

IconFactory.prototype.upArrow = function (color) {
    return `<div class="arrow" style="color:${color}">
    <span class="up-head first"> ${this.upHead} </span>
    <span class="up-head second"> ${this.upHead} </span>
    <span class="up-head third"> ${this.upHead} </span>
    </div` ;
};

IconFactory.prototype.buildIcon = function (vehicle) {
    // var color = this.getColor(vehicle.capacity);
    var color = '#ffc266'
    switch (vehicle.type) {
        case 1: // stationary
            return L.icon.pulse({iconSize:[12,12], fillColor: color, color: color});
        case 2: // moving right
            return  L.divIcon({
                className: 'moving-vehicle',
                iconSize: [12,12],
                html: this.rightArrow(color)
            });
        case 3: // moving left
            return  L.divIcon({
                className: 'moving-vehicle',
                iconSize: [12,12],
                html: this.leftArrow(color)
            });
        case 4: // moving up
            return L.divIcon({
                className: 'moving-vehicle',
                iconSize: [12,12],
                fillColor: color, 
                color: color,
                html: this.upArrow(color)
            });
        case 5: // moving down
            return L.divIcon({
                className: 'moving-vehicle',
                iconSize: [12,12],
                fillColor: color, 
                color: color,
                html: this.downArrow(color    )
            });
        case 6: // moving up-right
            return  L.divIcon({
                className: 'moving-vehicle',
                iconSize: [12,12],
                html: this.upRightArrow(color)
            });
        case 7: // moving down-right
            return  L.divIcon({
                className: 'moving-vehicle',
                iconSize: [12,12],
                html: this.downRightArrow(color)
            }); 
        case 8: // moving up-left
            return  L.divIcon({
                className: 'moving-vehicle',
                iconSize: [12,12],
                html: this.upLeftArrow(color)
            }); 
        default: // moving down-left
            return  L.divIcon({
                className: 'moving-vehicle',
                iconSize: [12,12],
                html: this.downLeftArrow(color)
            });           
    }    
};

export function getIconFactory() {
    return new IconFactory();
};