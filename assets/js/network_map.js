
import { getIconFactory } from "./icon_factory"

var NetworkMap = function() {
    this.map = L.map('map', {
                crs: L.CRS.Simple,
                zoomDelta: 0.50,
                zoomSnap: 0,
                minZoom: 0,
                maxZoom: 3.335486326753994 ,
                touchZoom: true,
                fullscreenControl: true,
            });
    this.lines = new Map() ;  
    this.factory = getIconFactory();   
    this.map.setView([560, 400], 1.5);
    L.imageOverlay('/images/map.svg', 
                  [[0,0], [1000,1000]],
                  {attribution: '&ensp; Developed by &nbsp; <a href="mailto:rhumbert@vub.be?Subject=Live%20Artifact" target="_top"><img id="email" src="/images/mail.svg"></img></a> &nbsp;<a href="https://soft.vub.ac.be">Software Languages Lab</a> &nbsp;  ',}
                  ).addTo(this.map); 
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


