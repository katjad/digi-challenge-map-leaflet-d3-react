var rides = require('./routes'), longrides = rides.longrides;

var toggleLayer = function toggleLayer(id, plotted){
            var number = parseInt(id) + 1;
            var url = "geojson/longrides/route" + number + ".geojson";
            var colour = longrides[id][1];

            var svg = d3.select(map.getPanes().overlayPane).append("svg"), g = svg.append("g").attr("class", "leaflet-zoom-hide");

            d3.json(url, function(error, geoShape){

            if (error) {  //If error is not null, something went wrong.
                  console.log(error);  //Log the error.
                } else {      //If no error, the file loaded correctly. Yay!
                  console.log(geoShape.features);   //Log the data.
                }

            var filterLineString = function(feature){
              return feature.geometry.type === "LineString"
            }

            var featureObj = geoShape.features.filter(filterLineString);

            // create a d3.geo.path to con2ert GeoJSON to SVG
            var transform = d3.geo.transform({point: projectPoint}),
              path = d3.geo.path().projection(transform);

            // create path elements for each of the features
            d3_features = g.selectAll("path")
            .data(featureObj)
            .enter().append("path").style({"stroke": colour, "stroke-width": "2", "fill": "none"});

            map.on("viewreset", reset);

            reset();

            // fit the SVG element to leaflet's map layer

            function reset() {

            bounds = path.bounds(geoShape);

            var topLeft = bounds[0],
            bottomRight = bounds[1];

            svg.attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");


            g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

             // initialize the path data
            d3_features.attr("d", path)
            //.style("fill-opacity", 0.7)
             //.attr('fill', 'blue');
      }

      // Use Leaflet to implement a D3 geometric transformation
      function projectPoint(x, y){
        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
      }

      })   




     } 

module.exports = toggleLayer; 