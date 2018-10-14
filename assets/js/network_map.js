
import { getIconFactory } from "./icon_factory"

var NetworkMap = function() {
    this.map = L.map('map', {
                crs: L.CRS.Simple,
                zoomDelta: 0.50,
                zoomSnap: 0,
                minZoom: 0,
                maxZoom: 3.388077727750023 ,
                touchZoom: true,
                fullscreenControl: true,
            });
    this.lines = new Map() ;  
    this.factory = getIconFactory();   
    this.map.setView([575.25, 400.5], 4);
    L.imageOverlay('/images/map.svg', [[0,0], [1000,1000]]).addTo(this.map); 
};

NetworkMap.prototype.initialize = function (linesId) {   
    var lineLayers = this.lines;
    linesId.forEach(function(id){
        lineLayers.set(id, new L.FeatureGroup());
    });
};

NetworkMap.prototype.update = function (lines) {
    var lineLayers = this.lines;
    var map = this.map;
    var factory = this.factory;
    lines.forEach(function(item){
        var layer = lineLayers.get(item.line);
        map.removeLayer(layer);
        layer = new L.FeatureGroup();
        lineLayers.set(item.line, layer);
        item.vehicles.forEach(function(v){
            var icon = factory.buildIcon(v);
            L.marker(v.coordinates,{icon: icon}).addTo(layer);
        });
        map.addLayer(layer);
    });
};

export function getNetworkMap() {
    return new NetworkMap();
};


