
import { getIconFactory } from "./icon_factory"

var NetworkMap = function() {
    this.map = L.map('map', {
                crs: L.CRS.Simple,
                zoomDelta: 0.50,
                zoomSnap: 0,
                minZoom: 0,
                maxZoom: 4 ,
                touchZoom: true,
                fullscreenControl: true,
            });
    this.lines = new Map() ;  
    this.factory = getIconFactory();   
    this.map.setView([560, 400], 2);
    L.imageOverlay('/images/map.svg', 
                  [[0,0], [1000,1000]],
                  {attribution: '&ensp; Developed by &nbsp; <a href="mailto:rhumbert@vub.be?Subject=Live%20Artifact" target="_top"><img id="email" src="/images/mail.svg"></img></a> &nbsp;<a href="https://soft.vub.ac.be">Software Languages Lab</a> &nbsp;  ',}
                  ).addTo(this.map); 
          
    var map = this.map;
  
    map.on('zoomend', function() {
        var currentZoom = map.getZoom(),
            ratio = (currentZoom/0.5) * 2.75,
            newSize = (currentZoom >= 3.5) ? ratio : ratio-6,
            marker = undefined;
          
        map.eachLayer(function(layer){
          marker = layer.options.icon
          if(marker){
            marker.options.iconSize = [newSize, newSize];
            layer.setIcon(marker);
         }
        });     
    });
                   
};

NetworkMap.prototype.initialize = function (vehicles) {   
    var lineLayers = this.lines;
    vehicles.forEach(function(x){
        lineLayers.set(x.line, new L.FeatureGroup());
    });
    this.update(vehicles);   
};

NetworkMap.prototype.update = function (lines) {
    var lineLayers = this.lines;
    var map = this.map;
    var currentZoom = map.getZoom(),
    ratio = (currentZoom/0.5) * 2.75,
    size = (currentZoom >= 3.5) ? ratio : ratio-6;

    var factory = this.factory;
    lines.forEach(function(item){
        var layer = lineLayers.get(item.line);
        map.removeLayer(layer);
        layer = new L.FeatureGroup();
        lineLayers.set(item.line, layer);
        item.vehicles.forEach(function(v){
            var icon = factory.buildIcon(v,size);
            L.marker(v.coordinates,{icon: icon}).addTo(layer);
        });
        map.addLayer(layer);
    });
};

export function getNetworkMap() {
    return new NetworkMap();
};


