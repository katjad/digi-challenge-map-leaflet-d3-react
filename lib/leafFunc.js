var rides = require('./routes'), longrides = rides.longrides, cityrides = rides.cities, citywalks = rides.walks;

var toggleLayer = function toggleLayer(id, plotted, mode){
	        var number = parseInt(id) + 1;
            
            if (mode == "longride"){
                var url = "geojson/longrides/route" + number + ".geojson";
                var colour = longrides[id][1];
            } else if (mode == "cityride"){
                var url = "geojson/cityrides/route" + number + ".geojson";
                var colour = cityrides[id][1];

            } else if (mode == "walk"){
                var url = "geojson/walks/route" + number + ".geojson";
                var colour = citywalks[id][1];
            }

            d3.json(url, function(data){   

            if (plotted) {
            	var ride = L.geoJson(data, {
                filter: function(feature, layer){
                    return feature.geometry.type == "LineString"
                },
                color: colour,
                opacity: 1,
                weight: 5
            }).addTo(map);

            window['removeRide'+mode+id] = function(){
            	map.removeLayer(ride);
              }  
            } else {
            	 window['removeRide'+mode+id]()            	
            }
     } )

   } 

module.exports = toggleLayer;