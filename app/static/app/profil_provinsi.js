        //Width and height
        var w = 500;
        var h = 300;

        //Define path generator
        var path = d3.geo.path();

        //Create SVG element
        var svg = d3.select("profil_prov_map").append("svg").attr({ width: w, height: h });

        //Load in GeoJSON data
        d3.json("static/data/t4.geojson", function(json) {

            //Bind data and create one path per GeoJSON feature
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", "#666666");

        });