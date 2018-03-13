// Init Variabel
var width = $("#d3map").width() + 17,
    height = $("#d3map").height(),
    scale0 = (width - 1) / 2 / Math.PI,
    kabloaded = false,
    desaloaded = false,
    colored = false,
    centered, kodekab, kabgeom, lastgeom, profile_tab = false,
    prefix = prefixMatch(["webkit", "ms", "Moz", "O"]);

var tabel;
// var tahun;
var warnawarni = {},
    warnawarniagg = {};
var variabeldesc;
var maptipe;
var jawabanparam;
var model = true;
var posx, posy, centered;
var tabeltipe;

// Transform variabel
var x, y, k;

var tile = d3.geo.tile()
    .size([width, height]);


var projection = d3.geo.mercator().scale(1).translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

var zoom = d3.behavior.zoom()
    .scale(1 << 12)
    .scaleExtent([1 << 9, 1 << 23])
    .translate([width / 2, height / 2])
    .on("zoom", zoomed);


var svg = d3.select("#d3map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

var g = svg.append("g")
    .attr("class", "g_main");

svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height);


svg
    .call(zoom)
    .call(zoom.event);

// var zoom = d3.behavior.zoom()
//     .on("zoom", function() {
//         g.attr("transform", "translate(" +
//             d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
//         g.selectAll("path")
//             .attr("d", path.projection(projection));
//     });
// svg.call(zoom)


// svg.append("rect")
//     .attr("class", "background")
//     .attr("width", width)
//     .attr("height", height)
// .on("click", clicked);

var tooltip = d3.select("#d3map")
    .append("div")
    .attr("id", "gentooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");

var cc = clickcancel();

var zoom_state;

// d3.select('#d3map').call(cc);

var raster = svg.append("g");

d3.select(window)
    .on("resize", sizeChange);

function sizeChange() {
    d3.select("g").attr("transform", "scale(" + $("#d3map").width() / 900 + ")");
    $("svg").height($("#d3map").width() * 0.618);
}

function mousemoved() {
    info.text(formatLocation(projection.invert(d3.mouse(this)), zoom.scale()));
}

function matrix3d(scale, translate) {
    var k = scale / 256,
        r = scale % 1 ? Number : Math.round;
    return "matrix3d(" + [k, 0, 0, 0, 0, k, 0, 0, 0, 0, k, 0, r(translate[0] * scale), r(translate[1] * scale), 0, 1] + ")";
}

function prefixMatch(p) {
    var i = -1,
        n = p.length,
        s = document.body.style;
    while (++i < n)
        if (p[i] + "Transform" in s) return "-" + p[i].toLowerCase() + "-";
    return "";
}

function formatLocation(p, k) {
    var format = d3.format("." + Math.floor(Math.log(k) / 2 - 2) + "f");
    return (p[1] < 0 ? format(-p[1]) + "°S" : format(p[1]) + "°N") + " " +
        (p[0] < 0 ? format(-p[0]) + "°W" : format(p[0]) + "°E");
}


function stringify(scale, translate) {
    var k = scale / 256,
        r = scale % 1 ? Number : Math.round;
    return "translate(" + r(translate[0] * scale) + "," + r(translate[1] * scale) + ") scale(" + k + ")";
}

// Init 


$('#masterprofile').hide();
$('#md_judul').hide();
$('#md_grafik').hide();
$('#jawaban').hide();

var listdatadasar;
// $('#profile-tab').hide();

// $('#chart1').hide();
// $('#chart2').hide();
// $('#chart3').hide();
// $('#chart4').hide();
$(document).ready(function() {
    zoom_state = 0;
    $.get('/profildaerah?kode=' + '33', function(data) {
        profilteks = data[0].deskripsi;
        kodepum = data[0].kodepum;
        kodebps = data[0].username;
        namadesa = data[0].namobj;
        namakec = data[0].kecamatan;
        namakab = data[0].kabupaten;
        namaprov = data[0].provinsi;
        $('#deskripsidaerah').empty();
        $('#kodepum').empty();
        $('#kodebps').empty();
        $('#namadesa').empty();
        $('#namakec').empty();
        $('#namakab').empty();
        $('#namaprov').empty();
        $('#deskripsidaerah').append(profilteks);
        $('#kodepum').append(kodepum);
        $('#kodebps').append(kodebps);
        $('#namadesa').append(namadesa);
        $('#namakec').append(namakec);
        $('#namakab').append(namakab);
        $('#namaprov').append(namaprov);
    });
    $.get('/datadasarget', function(data) {
        listdatadasar = data;
        $.each(data, function(i, val) {
                $("#listdatadasar").append("<a tabindex='-1' class='test' id='" + String(i) + "'>" + String(val) + "</a>");
            })
            // co
    });
    getdata();
    // $("#kabupaten").insertAfter("#provinsi");
    // $("#batas-kabupaten").insertAfter("#kabupaten");
    // $("#kabupaten-label").insertAfter("#kabupaten");
});

var tabeldasar;
var kodekabupaten;
var warniwarna = {};
var dasariddata, dasarkolom;

$('#listdatadasar').click(function(e) {
    iddata = $(e.target).attr("id");
    window.dasariddata = iddata;
    tabeldasar = $(e.target).attr("id");
    tabeltipe = 'dasar';
    console.log('Clicked:', dasariddata, iddata);
    $.get("/datadasarvdesc", {
            tabel: iddata
        },
        function(data) {
            $('#listvariabel').empty();
            datadasardesc = data;
            $.each(datadasardesc, function(i, val) {
                    if (i != 'id' && i != 'kdebps') {
                        $("#listvariabel").append("<li><a tabindex='-1' id='" + String(i) + "'>" + String(val) + "</a></li>")
                    }
                })
                // $("#l_listsubvariabel").show();
                // $("#listsubvariabel").show();
                // $("#listsubvariabel").height('auto');
                // console.log(data);
        });
    document.getElementById("listvariabel").style.display = "block";
    e.stopPropagation();
    e.preventDefault();
});

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1 / ++count)
            result = prop;
    return result;
}

var dmin, dmax, dcolordom;

function dasarlegendagg(min, max, colors, color_domain) {
    // console.log(min, max, colors, color_domain)
    var color = d3.scale.quantize()
        .domain([min, max])
        .range(colors);

    var legend = svg.selectAll("g.legend")
        .data(color_domain)
        .enter().append("g")
        .attr("class", "legend");

    var ls_w = 20,
        ls_h = 20;
    for (i = 0; i < colorbrewer['YlGnBu'][8].length; i++) {
        legend.append("rect")
            .attr("x", 20)
            .attr("y", function(d, i) { return (height - (i * ls_h) - 2 * ls_h) - 20; })
            .attr("width", ls_w)
            .attr("height", ls_h)
            .style("stroke", "#DDDDDD")
            .style("stroke-width", "1")
            .style("fill", function(d, i) { return color(d); })
            .style("opacity", 0.8);
        legend.append("text")
            .attr("x", 50)
            .attr("y", function(d, i) { return (height - (i * ls_h) - ls_h - 4) - 20; })
            .style("stroke", "#DDDDDD")
            .style("font-weight", "bold")
            .style("stroke-width", "0.15")
            .text(function(d, i) { return String(Math.round(color_domain[i])); });
    }
    legend.append("rect")
        .attr("x", 20)
        .attr("y", function() { return (height - (0 * ls_h) - 2 * ls_h); })
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("stroke", "#DDDDDD")
        .style("stroke-width", "1")
        .style("fill", function() { return "#82A183"; })
        .style("opacity", 0.8);
    legend.append("text")
        .attr("x", 50)
        .attr("y", function() { return (height - (0 * ls_h) - ls_h - 4); })
        .style("stroke", "#DDDDDD")
        .style("font-weight", "bold")
        .style("stroke-width", "0.15")
        .text(function() { return "Tidak ada Data"; });

}


function dasarmapcoloragg(iddata, kolom) {
    cbw = pickRandomProperty(colorbrewer);
    var colorrange = [];
    // console.log('Clicked:', iddata, kodekabupaten, zoom_state);
    $.get("/dasarmapcoloragg" + '?tabel=' + tabeldasar + '&tahun=' + tahun + '&kolom=' + kolom + '&kode=' + kodekabupaten,
        function(data) {
            var min = d3.min(data, function(d) { return +d['isi'] });
            var max = d3.max(data, function(d) { return +d['isi'] });
            var colors = d3.scale.quantize()
                .domain([min, max])
                // .range(colorbrewer.YlGn[9]);
                .range(colorbrewer['YlGnBu'][8]);
            for (i = 0; i < colors.range().length; i++) {
                colorrange.push(colors.invertExtent(colors.range()[i])[0]);
            }
            // console.log(colorrange);
            svg.selectAll(".kabupaten")
                .style("fill", function(d) {
                    // console.log(d.properties.kdbbps)
                    for (i = 0; i < data.length; i++) {
                        if (data[i].kdbbps == d.properties.kdbbps) {
                            // console.log(colors(Number(data[i].isi)))
                            // warnawarni = {}
                            warnawarni[d.properties.kdbbps] = colors(Number(data[i].isi))
                                // console.log(d.properties.kdbbps, colors(Number(data[i].isi)))
                            return colors(Number(data[i].isi))
                        }
                    }
                })
            $(".legend").remove();
            colorthis();
            dmin = min, dmax = max, dcolordom = colorrange;
            // console.log(min, max, colorbrewer[cbw][8], colorrange)
            dasarlegendagg(min, max, colorbrewer['YlGnBu'][8], colorrange);
            // agglegend(colordomain);
        })
}

function dasarmapcolor(iddata, kolom) {
    cbw = pickRandomProperty(colorbrewer);
    var colorrange = [];
    // console.log('Clicked:', iddata, kodekabupaten, zoom_state);
    $.get("/dasarmapcolor" + '?tabel=' + tabeldasar + '&tahun=' + tahun + '&kolom=' + kolom + '&kode=' + kodekabupaten,
        function(data) {
            var min = d3.min(data, function(d) { return +d['isi'] });
            var max = d3.max(data, function(d) { return +d['isi'] });
            var colors = d3.scale.quantize()
                .domain([min, max])
                // .range(colorbrewer.YlGn[8]);
                .range(colorbrewer['YlGnBu'][8]);
            for (i = 0; i < colors.range().length; i++) {
                colorrange.push(colors.invertExtent(colors.range()[i])[0]);
            }
            // console.log(colorrange);
            svg.selectAll(".kdebps")
                .style("fill", function(d) {
                    // console.log(d.properties.kdebps)
                    for (i = 0; i < data.length; i++) {
                        if (data[i].kdebps == d.properties.kdebps) {
                            // console.log(colors(Number(d.properties.count)))
                            // warnawarni = {}
                            warnawarni[d.properties.kdebps] = colors(Number(data[i].isi))
                                // console.log(d.properties.kdebps, colors(Number(data[i].isi)))
                            return colors(Number(data[i].isi))
                        }
                    }
                })
            $(".legend").remove();
            colorthis();
            dmin = min, dmax = max, dcolordom = colorrange;
            // console.log(min, max, colorbrewer[cbw][8], colorrange)
            dasarlegendagg(min, max, colorbrewer['YlGnBu'][8], colorrange);
            // agglegend(colordomain);
        })
}

$('#listvariabel').click(function(e) {
    kolom = $(e.target).attr("id");
    console.log(kolom);
    // iddata = $(e.target).attr("id");
    dasarkolom = kolom;
    // window.dasariddata = iddata;
    tabeltipe = 'dasar';
    if (zoom_state == 0) {
        dasarmapcoloragg(window.dasariddata, kolom)
    }
    if (zoom_state == 1 || zoom_state == 2) {
        dasarmapcoloragg(window.dasariddata, kolom)
        dasarmapcolor(window.dasariddata, kolom)
    }
    // $('#formulaentry').val($('#formulaentry').val() + " " + $(e.target).attr("id") + " ");
})

load_inital()

function profildesc(kode) {
    $.get('/profildaerah?kode=' + kode, function(data) {
        profilteks = data[0].deskripsi;
        kodepum = data[0].kodepum;
        kodebps = data[0].username;
        namadesa = data[0].namobj;
        namakec = data[0].kecamatan;
        namakab = data[0].kabupaten;
        namaprov = data[0].provinsi;
        $('#deskripsidaerah').empty();
        $('#kodepum').empty();
        $('#kodebps').empty();
        $('#namadesa').empty();
        $('#namakec').empty();
        $('#namakab').empty();
        $('#namaprov').empty();
        $('#deskripsidaerah').append(profilteks);
        $('#kodepum').append(kodepum);
        $('#kodebps').append(kodebps);
        $('#namadesa').append(namadesa);
        $('#namakec').append(namakec);
        $('#namakab').append(namakab);
        $('#namaprov').append(namaprov);
    });
}

function load_prov2() {
    d3.json("static/data/admin_kab.topojson", function(error, admin_kab) {
        if (error) throw error;

        geojson = topojson.feature(admin_kab, admin_kab.objects.admin_kab);
        center = d3.geo.centroid(geojson);
        scale = 1;
        offset = [width / 2, height / 2];
        projection = d3.geo.mercator().scale(1).translate([0, 0]);
        console.log(center);
        path = d3.geo.path().projection(projection);
        bounds = path.bounds(geojson);
        w = width;
        h = height;
        b = path.bounds(geojson), s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h), t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];
        hscale = scale * width / (bounds[1][0] - bounds[0][0]);
        vscale = scale * height / (bounds[1][1] - bounds[0][1]);
        scale2 = (hscale < vscale) ? hscale : vscale;
        offset2 = [width - (bounds[0][0] + bounds[1][0]) / 2, height - (bounds[0][1] + bounds[1][1]) / 2];
        console.log("hscale:", hscale, "vscale:", vscale, "scale2:", scale2, "offset2:", offset2);
        projection.scale(s).translate(t);

        g.append("g")
            .attr("id", "kabupaten")
            .selectAll("path")
            .data(topojson.feature(admin_kab, admin_kab.objects.admin_kab).features)
            .enter().append("path")
            .attr("d", path)
            .attr("kdbbps", function(d) { return d.properties.kdbbps })
            .attr("nwadmkk", function(d) { return d.properties.wadmkk })
            .attr("class", "kabupaten")
            .on("mouseover", function(d) { return tooltip.style("visibility", "visible").text(d.properties.wadmkk); })
            .on("mousemove", function(d) { return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px").text(d.properties.wadmkk); })
            .on("mouseout", function(d) { return tooltip.style("visibility", "hidden"); });

        g.append("g")
            .datum(topojson.mesh(admin_kab, admin_kab.objects.admin_kab, function(a, b) { return a !== b; }))
            .attr("id", "batas-kabupaten")
            .attr("d", path);

        g.append("g")
            .attr("id", "kabupaten-label")
            .selectAll(".kabupaten-label")
            .data(topojson.feature(admin_kab, admin_kab.objects.admin_kab).features)
            .enter().append("text")
            .attr("text-anchor", "middle")
            .attr("d", path)
            .attr("id", function(d) { return "kab_" + d.properties.kdbbps })
            .attr("class", function(d) { return "kabupaten-label" })
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.properties.wadmkk; });

        var pi = Math.PI,
            tau = 2 * pi;

        var rproj = d3.geo.mercator()
            .scale(1 / tau)
            .translate([0, 0]);

        console.log("BOUNDS", bounds)

        var rbounds = [
                [108, -9],
                [112, -6]
            ],
            p0 = rproj([rbounds[0][0], rbounds[1][1]]),
            p1 = rproj([rbounds[1][0], rbounds[0][1]]);

        var k = floor(0.95 / Math.max((p1[0] - p0[0]) / width, (p1[1] - p0[1]) / height)),
            tx = (width - k * (p1[0] + p0[0])) / 2,
            ty = (height - k * (p1[1] + p0[1])) / 2;

        rproj
            .scale(k / tau)
            .translate([tx, ty]);

        var raster = svg.append("g");

        var tile = d3.tile()
            .size([width, height]);

        var tiles = tile
            .scale(k)
            .translate([tx, ty])
            ();

        var image = raster
            .attr("transform", stringify(tiles.scale, tiles.translate))
            .attr("id", "backraster")
            .selectAll("image")
            .data(tiles, function(d) { return d; });

        image.exit().remove();

        image.enter().append("image")
            .attr("xlink:href", function(d) { return "http://a.basemaps.cartocdn.com/light_all/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
            .attr("x", function(d) { return (d[0]) * tiles.scale; })
            .attr("y", function(d) { return (d[1]) * tiles.scale; })
            .attr("width", tiles.scale)
            .attr("height", tiles.scale);
        $("#backraster").insertBefore("#kabupaten");

    });
}


var pi = Math.PI,
    tau = 2 * pi;

var pbounds, center, projection, path, image, tile, tiles, provgeom;

function load_prov() {
    d3.json("static/data/admin_kab.topojson", function(error, admin_kab) {
        if (error) throw error;

        geojson = topojson.feature(admin_kab, admin_kab.objects.admin_kab);
        provgeom = geojson;
        center = d3.geo.centroid(geojson);

        projection = d3.geo.mercator()
            .scale((1 << 17) / tau)
            .translate([width / 2, height / 2])
            .center(center);

        pbounds = d3.geo.bounds(geojson)
        path = d3.geo.path()
            .projection(projection);

        // tile = d3.tile()
        //     .size([width, height]);
        scale = 1;
        // offset = [width / 2, height / 2];
        // projection = d3.geo.mercator().scale(1).translate([0, 0]);
        console.log(center);
        // path = d3.geo.path().projection(projection);
        // bounds = path.bounds(geojson);
        // w = width;
        // h = height;
        // b = path.bounds(geojson), s = ((1 << 17) / tau) / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h), t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];
        // hscale = scale * width / (bounds[1][0] - bounds[0][0]);
        // vscale = scale * height / (bounds[1][1] - bounds[0][1]);
        // scale2 = (hscale < vscale) ? hscale : vscale;
        // offset2 = [width - (bounds[0][0] + bounds[1][0]) / 2, height - (bounds[0][1] + bounds[1][1]) / 2];
        // console.log("hscale:", hscale, "vscale:", vscale, "scale2:", scale2, "offset2:", offset2);
        // projection.scale(s).translate(t);

        g.append("g")
            .attr("id", "kabupaten")
            .selectAll("path")
            .data(topojson.feature(admin_kab, admin_kab.objects.admin_kab).features)
            .enter().append("path")
            .attr("d", path)
            .attr("id", function(d) { return "id_" + d.properties.kdbbps })
            .attr("kdbbps", function(d) { return d.properties.kdbbps })
            .attr("nwadmkk", function(d) { return d.properties.wadmkk })
            .attr("class", "kabupaten")
            .on("mouseover", function(d) { return tooltip.style("visibility", "visible").text(d.properties.wadmkk); })
            .on("mousemove", function(d) { return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px").text(d.properties.wadmkk); })
            .on("mouseout", function(d) { return tooltip.style("visibility", "hidden"); });

        g.append("g")
            .datum(topojson.mesh(admin_kab, admin_kab.objects.admin_kab, function(a, b) { return a !== b; }))
            .attr("id", "batas-kabupaten")
            .attr("d", path);

        g.append("g")
            .attr("id", "kabupaten-label")
            .selectAll(".kabupaten-label")
            .data(topojson.feature(admin_kab, admin_kab.objects.admin_kab).features)
            .enter().append("text")
            .attr("text-anchor", "middle")
            .attr("d", path)
            .attr("id", function(d) { return "kab_" + d.properties.kdbbps })
            .attr("class", function(d) { return "kabupaten-label" })
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.properties.wadmkk; });

        tile = d3.tile()
            .size([width, height]);

        tiles = tile
            .scale(projection.scale() * tau)
            .translate(projection([0, 0]))
            ();

        image = raster
            .attr("transform", stringify(tiles.scale, tiles.translate))
            .attr("id", "backraster")
            .selectAll("image")
            .data(tiles, function(d) { return d; });

        image.exit().remove();

        image.enter().append("image")
            .attr("xlink:href", function(d) { return "http://a.basemaps.cartocdn.com/light_all/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
            .attr("x", function(d) { return (d[0]) * tiles.scale; })
            .attr("y", function(d) { return (d[1]) * tiles.scale; })
            .attr("width", tiles.scale)
            .attr("height", tiles.scale);
        $("#backraster").insertBefore("#kabupaten");
    });
}



function zoomed() {
    projection
        .translate(zoom.translate())
        .scale(zoom.scale());

    g.selectAll("path")
        .attr("d", path);
}

function floor(k) {
    return Math.pow(2, Math.floor(Math.log(k) / Math.LN2));
}

function load_kab(kodekab) {
    d3.json("static/data/" + kodekab + ".topojson", function(error, kab) {
        if (error) throw error;
        kabgeom = kab;
        featurescoll = topojson.feature(kab, kab.objects.units).features
            // kbounds = d3.geo.bounds(featurescoll);
            // var centerX = d3.sum(pbounds, function(d) { return d[0]; }) / 2,
            //     centerY = d3.sum(pbounds, function(d) { return d[1]; }) / 2;
            // var kproj = d3.geo.mercator()
            //     .scale((1 << 17) / tau)
            //     .center(center);       
        projection = d3.geo.mercator()
            .scale((1 << 17) / tau)
            .translate([width / 2, height / 2])
            .center(center);

        path.projection(projection);

        g.append("g")
            .attr("id", "desa")
            .selectAll("path")
            .data(featurescoll)
            .enter().append("path")
            .attr("d", path)
            .attr("id", function(d) { return "id_" + d.properties.kdebps })
            .attr("class", "kdebps")
            .attr("kdebps", function(d) { return d.properties.kdebps })
            .attr("nwadmkk", function(d) { return d.properties.wadmkk })
            .attr("nkec", function(d) { return d.properties.KECAMATAN })
            .attr("ndes", function(d) { return d.properties.namobj })
            .on("mouseover", function(d) { return tooltip.style("visibility", "visible").text(d.properties.namobj); })
            .on("mousemove", function(d) { return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px").text(d.properties.namobj); })
            .on("mouseout", function(d) { return tooltip.style("visibility", "hidden"); });

        if (colored) {
            colorthat();
            $(".legend").remove();
            createlegend();
            kabgraph(kodekab);
            $("#chart1").show();
        }
        if (tabeltipe == 'dasar') {
            console.log("A")
            dasarmapcolor(dasariddata, dasarkolom);
        }
    });
}


function load_inital() {

    load_prov()
        // $("#backraster").insertBefore("#kabupaten");
        // setTimeout(function() {
        //     // d3.json("static/data/kitaranjateng_prov2_s.topojson", function(error, sekitaran) {
        //     d3.json("static/data/id_land.topojson", function(error, sekitaran) {
        //         if (error) throw error;

    //         g.append("g")
    //             .attr("id", "provinsi")
    //             .selectAll("path")
    //             .data(topojson.feature(sekitaran, sekitaran.objects.id_land).features)
    //             .enter().append("path")
    //             .attr("d", path)
    //             .attr("class", "sekitaran")
    //             .attr("provinsi", function(d) { return d.properties.PROVINSI })
    //     }, 1000);

    //     $('#masterprofile').hide();
    //     $("#kabupaten").insertAfter("#provinsi");
    //     $("#batas-kabupaten").insertAfter("#kabupaten");
    //     $("#kabupaten-label").insertAfter("#kabupaten");
    // })
}

function layer_transform() {
    g.selectAll("path")
        .classed("active", centered && function(d) { return d === centered; });
    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width /
            2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
}

function floor(k) {
    return Math.pow(2, Math.floor(Math.log(k) / Math.LN2));
}


function layer_zoomin(d) {
    var centroid = path.centroid(d);
    w1 = width;
    h1 = height;
    b1 = path.bounds(d), s1 = .95 / Math.max((b1[1][0] - b1[0][0]) / w1, (b1[1][1] - b1[0][1]) / h1), t1 = [(w1 - s1 * (b1[1][0] + b1[0][0])) / 2, (h1 - s1 *
        (b1[1][1] + b1[0][1])) / 2];
    hscale1 = scale * w1 / (b1[1][0] - b1[0][0]);
    vscale1 = scale * h1 / (b1[1][1] - b1[0][1]);
    scale3 = (hscale1 < vscale1) ? hscale1 : vscale1;
    offset3 = [w1 - (b1[0][0] + b1[1][0]) / 2, h1 - (b1[0][1] +
        b1[1][1]) / 2];
    x = centroid[0];
    y = centroid[1];
    k = scale3 / 1.4;
    centered = d;
    console.log("hscale1:", hscale1, "vscale1:", vscale1, "scale3:", scale3, "offset3:", offset3, "x:", x, "y", y, "centered:", centered);

    tile = d3.tile()
        .size([width, height]);

    tile = d3.tile()
        .size([width, height]);

    tiles = tile
        .scale(projection.scale() * tau)
        .translate(projection([0, 0]))
        ();

    image = raster
        .attr("transform", stringify(tiles.scale, tiles.translate))
        .selectAll("image")
        .data(tiles, function(d) { return d; });

    image.exit().remove();

    image.enter().append("image")
        .attr("xlink:href", function(d) { return "http://a.basemaps.cartocdn.com/light_all/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
        .attr("x", function(d) { return (d[0]) * tiles.scale; })
        .attr("y", function(d) { return (d[1]) * tiles.scale; })
        .attr("width", tiles.scale)
        .attr("height", tiles.scale);
    $("#backraster").insertBefore("#kabupaten");

}

function layer_zoomout(d) {
    var centroid = path.centroid(d);
    w1 = width;
    h1 = height;
    b1 = path.bounds(d), s1 = .95 / Math.max((b1[1][0] - b1[0][0]) / w1, (b1[1][1] - b1[0][1]) / h1), t1 = [(w1 - s1 * (b1[1][0] + b1[0][0])) / 2, (h1 - s1 *
        (b1[1][1] + b1[0][1])) / 2];
    hscale1 = scale * w1 / (b1[1][0] - b1[0][0]);
    vscale1 = scale * h1 / (b1[1][1] - b1[0][1]);
    scale3 = (hscale1 < vscale1) ? hscale1 : vscale1;
    offset3 = [w1 - (b1[0][0] + b1[1][0]) / 2, h1 - (b1[0][1] +
        b1[1][1]) / 2];
    x = centroid[0];
    y = centroid[1];
    k = scale3 / 1.4;
    centered = d;
    console.log("hscale1:", hscale1, "vscale1:", vscale1, "scale3:", scale3, "offset3:", offset3, "x:", x, "y", y, "centered:", centered);
}

function layer_zoomoutall() {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
}

function load_label_desa() {
    kab = kabgeom;
    g.append("g")
        .attr("id", "desa-label")
        .selectAll(".namobj-label")
        .data(topojson.feature(kab, kab.objects.units).features)
        .enter().append("text")
        .attr("text-anchor", "middle")
        .attr("class", function(d) { return "desa-label" })
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.properties.namobj; });
    $("#desa-label").insertAfter("#desa");
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
}

function clickcancel() {
    var event = d3.dispatch('sclick', 'dblclick');

    function cc(selection) {
        var down, tolerance = 5,
            last, wait = null; // euclidean distance 
        function dist(a, b) { return Math.sqrt(Math.pow(a[0] - b[0], 2), Math.pow(a[1] - b[1], 2)); }
        selection.on('mousedown', function() {
            down = d3.mouse(document.body);
            last = +new Date();
        });
        selection.on('mouseup', function() {
            if (dist(down,
                    d3.mouse(document.body)) & tolerance) { return; } else {
                if (wait) {
                    window.clearTimeout(wait);
                    wait = null;
                    event.dblclick(d3.event);
                } else {
                    wait = window.setTimeout((function(e) {
                        return function() {
                            event.sclick(e);
                            wait = null;
                        };
                    })(d3.event), 300);
                }
            }
        });
    };
    return d3.rebind(cc, event, 'on');
}

// Zoom State
var zoom_state = 0;
var dzoomed = false;
// Intercept mouse click(s)

cc.on('sclick', function(el) {
    console.log("Zoom", zoom_state, tabeltipe);
    var me = d3.select(el.srcElement)
    var d = me.data()[0];
    console.log('CLICKED', d);
    var switched = false;
    if (d) {
        if (d.properties.kdebps == undefined) {
            dzoomed = false;
        } else {
            dzoomed = true;
        }
        if (kodekab == d.properties.kdbbps) {
            switched = false;
        } else {
            switched = true;
        }
        kodekab = d.properties.kdbbps;
        kodekabupaten = kodekab;

        $("#chart2").empty();
        if (zoom_state == 0) {
            console.log("A")
            layer_zoomin(d);
            layer_transform();
            if (kodekab && switched) {
                $("#desa-label").remove();
                $("#desa").remove();
                $(".legend").remove();
                load_kab(kodekab);
                // kabgraph(kodekab);
                $("#chart1").show();
                $("#chartradar").hide();
            } else {
                load_kab(kodekab);
                // kabgraph(kodekab);
                $("#chart1").show();
                $("#chartradar").hide();
            }
            lastgeom = d;
            kabstrokez1();
            kablabelz1();
            profildesc(kodekab);
            getdata(kodekab);
            zoom_state = 1;
            colorthat();
            $('#kdesatext').text("JAWA TENGAH / " + d.properties.wadmkk);
        } else {
            console.log("B")
            if (kodekab && switched && dzoomed) {
                console.log("C")
                console.log("SWITCHEDA");
                lastgeom = d;
                $("#desa-label").remove();
                $("#desa").remove();
                $(".legend").remove();
                load_kab(kodekab);
                kabgraph(kodekab);
                $("#chart1").show();
                $("#chartradar").hide();
                kablabelz2();
                kabstrokez2();
                profildesc(d.properties.kdebps);
                getdata(kodekab);
                $.get("/getjawaban?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + d.properties.kdebps,
                    function(data) {
                        console.log("JAWABAN:", data);
                        window.jawabanparam = data;
                        // jawabanindikator(d.properties.kdebps);
                        indikator(data);
                    });
            } else if (kodekab && switched && !dzoomed) {
                console.log("D")
                console.log("SWITCHEDB");
                lastgeom = d;
                $("#desa-label").remove();
                $("#desa").remove();
                $(".legend").remove();
                load_kab(kodekab);
                kabgraph(kodekab);
                $("#chart1").show();
                $("#chartradar").hide();
                $('#masterprofile').hide();
                kablabelz1();
                kabstrokez1();
                profildesc(kodekab);
                getdata(kodekab);
                if (tabeltipe == 'dasar') {
                    console.log("DA")
                    dasarmapcolor(dasariddata, dasarkolom);
                }
                $.get("/getjawaban?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + d.properties.kdebps,
                    function(data) {
                        console.log("JAWABAN:", data);
                        window.jawabanparam = data;
                        // jawabanindikator(d.properties.kdebps);
                        indikator(data);
                    });
            } else {
                console.log("E")
                console.log("NOTSWITCHED");
                // load_kab(kodekab);
                $("#desa-label").remove();
                load_label_desa();
                createlegend();
                $("#chart1").hide();
                $("#chartradar").hide();
                profildesc(d.properties.kdebps);
                getdata(d.properties.kdebps);
                loadintervensi(tabel, tahun, d.properties.kdebps);
                if (tabeltipe == 'dasar') {
                    console.log("E")
                    dasarmapcolor(dasariddata, dasarkolom);
                }
                $.get("/getjawaban?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + d.properties.kdebps,
                    function(data) {
                        console.log("JAWABAN:", data);
                        window.jawabanparam = data;
                        // jawabanindikator(d.properties.kdebps);
                        indikator(data);
                        if (maptipe == 5) {;
                            canv = document.getElementById("chartradar");
                            ctx = canv.getContext("2d");
                            ctx.save();

                            // Use the identity matrix while clearing the canvas
                            ctx.setTransform(1, 0, 0, 1, 0, 0);
                            ctx.clearRect(0, 0, canv.width, canv.height);

                            // Restore the transform
                            ctx.restore();
                            load_radar(tabel, d.properties.kdebps, tahun);
                            $('#md_judul').show();
                            $('#md_grafik').show();
                            $('#masterprofile').hide();
                            $("#chartradar").show()
                        }
                    });
                dzoomed = true;
                zoom_state = 2;
            }
            layer_zoomin(d);
            layer_transform();
            if (d.properties.kdebps == undefined) {
                $('#kdesatext').text("JAWA TENGAH / " + d.properties.wadmkk);
            } else {
                $('#kdesatext').text("JAWA TENGAH / " + d.properties.wadmkk + " / " + d.properties.namobj);
            }
            if (maptipe == 4) {
                $('#masterprofile').show();
                $('#md_judul').hide();
                $('#md_grafik').hide();
                $('#jawaban').hide();
                // $('#kdesaptext').text(d.properties.wadmkk + " / " + d.properties.namobj);
            } else if (maptipe == 5) {;
                load_radar(tabel, d.properties.kdebps, tahun);
                $('#md_judul').show();
                $('#md_grafik').show();
                $('#masterprofile').hide();
            } else {
                $('#md_judul').show();
                $('#md_grafik').show();
                $('#masterprofile').hide();
                // $('#kdesatext').text(d.properties.wadmkk + " / " + d.properties.namobj);
            }
            $("#chartradar").hide();
            // if (maptipe == 4) {
            //     $('#masterprofile').show();
            // } else {
            //     $('#masterprofile').hide();
            // }
            // if (profile_tab) {
            //     $("#chartradar").hide();
            //     ispenduduk(d.properties.idbpsdesa);
            //     console.log("PASS")
            // } else {
            //     ispesisir(d.properties.kdebps);
            // }
        }
        // console.log("F")
        // if (tabeltipe == 'dasar') {
        //     console.log("F")
        //     setTimeout(function() { dasarmapcolor(dasariddata, dasarkolom); }, 300);
        // }
        // $('#kdesatext').text(d.properties.wadmkk);
    }
});

cc.on('dblclick', function(el) {
    console.log("Zoom", zoom_state);
    var me = d3.select(el.srcElement)
    var d = me.data()[0];
    console.log('DBLCLICKED', d);

    if (zoom_state == 1) {
        $("#chart2").empty();
        console.log('DZ1', d);
        layer_zoomoutall();
        layer_transform();
        kablabelz0();
        kabstrokez0();
        profildesc('33');
        getdata();
        kodekab = undefined;
        lastgeom = undefined;
        $("#desa").remove();
        $("#desa-label").remove();
        $(".legend").remove();
        // $("#chart1").hide();
        $("#chartradar").hide();
        $("#jawaban").hide();
        $('#masterprofile').hide();
        $("#intervensi").empty();
        zoom_state = 0;
        colordomain = [1, 5, 10, 25, 50, 9999]
        if (maptipe == 4) {
            agglegend(colordomain);
        } else {
            createlegend();
        }
        $('#kdesatext').text("JAWA TENGAH");
        if (tabeltipe == 'dasar') {
            dasarmapcoloragg(iddata, kolom)
        } else {
            kabgraphagg()
        }
    }
    // if (zoom_state == 1 && profile_tab) {
    //     $("#chart2").empty();
    //     console.log('DZ1P', d);
    //     layer_zoomoutall();
    //     layer_transform();
    //     kablabelz0();
    //     kabstrokez0();
    //     profildesc('33');
    //     kodekab = undefined;
    //     lastgeom = undefined;
    //     $("#desa").remove();
    //     $("#desa-label").remove();
    //     $(".legend").remove();
    //     // $("#chart1").hide();
    //     $("#chartradar").hide();
    //     $("#jawaban").hide();
    //     if (maptipe == 4) {
    //         $('#masterprofile').hide();
    //     } else {
    //         $('#masterprofile').hide();
    //     }
    //     $('#kdesatext').text('JAWA TENGAH');
    //     kabgraphagg()
    //     kabstrokez0();
    //     zoom_state = 0;
    // }
    if (kodekab) {
        $("#chart2").empty();
        console.log('DZE', d);
        layer_zoomout(lastgeom);
        layer_transform();
        $("#desa-label").remove();
        $(".legend").remove();
        $("#chart1").show();
        $("#chartradar").hide();
        $('#masterprofile').hide();
        $('#md_judul').show();
        $('#md_grafik').show();
        $("#intervensi").empty();
        $('#kdesatext').text("JAWA TENGAH / " + d.properties.wadmkk);
        kabstrokez1();
        kablabelz1();
        getdata(kodekab);
        dzoomed = false;
        zoom_state = 1;
        profildesc(d.properties.kdbbps);
    }
    if (profile_tab && zoom_state == 1) {
        $("#chart2").empty();
        console.log('DZP', d);
        layer_zoomout(lastgeom);
        layer_transform();
        $("#desa-label").remove();
        $(".legend").remove();
        $("#chart1").show();
        $("#intervensi").empty();
        // $("#chart2").hide();
        // $("#chart3").hide();
        // $("#chart4").hide();
        $("#chartradar").hide();
        if (maptipe == 4) {
            $('#masterprofile').hide();
        } else {
            $('#masterprofile').hide();
        }
        kabstrokez1();
        kablabelz1();
        dzoomed = false;
        zoom_state = 1;
        profildesc('33');
    }
    if (profile_tab && zoom_state == 2) {
        console.log('DZP', d);
        layer_zoomout(lastgeom);
        layer_transform();
        $("#desa-label").remove();
        $(".legend").remove();
        $("#chart1").show();
        $("#intervensi").empty();
        // $("#chart2").hide();
        // $("#chart3").hide();
        // $("#chart4").hide();
        $("#chartradar").hide();
        $('#tr1').hide();
        if (maptipe == 4) {
            $('#masterprofile').hide();
        } else {
            $('#masterprofile').hide();
        }
        kabstrokez1();
        kablabelz1();
        dzoomed = false;
        zoom_state = 1;
        profildesc('33');
    }
});

var getcolor = function(my_key) {
    return warnawarni[my_key];
}

var getcoloragg = function(my_key) {
    return warnawarniagg[my_key];
}

var getcolorprof = function(my_key) {
    return warnawarni[my_key];
}

$('#tahun-selector').click(function(e) {
    tahun = $(e.target).attr("id");
});

var padatcolors = d3.scale.linear()
    .domain([0, 500, 1000, 2500, 5000, 7500, 10000, 12500, 15000])
    .range(colorbrewer.Blues[5]);

function load_penduduk(kodekab) {
    d3.json("/static/data/" + kodekab + '_kependudukan.topojson', function(error, kab) {
        if (error) throw error;
        $("#desa").remove();
        $("#desa-label").remove();
        $(".legend").remove();
        $("#chartradar").hide();
        kabgeom = kab;
        g.append("g")
            .attr("id", "desa")
            .selectAll("path")
            .data(topojson.feature(kab, kab.objects.units).features)
            .enter().append("path")
            .attr("d", path)
            .attr("idbpsdesa", function(d) {
                return d.properties.idbpsdesa
            })
            .attr("desa", function(d) {
                return d.properties.namobj
            })
            .attr("kepadatan", function(d) {
                return d.properties.kepadatan_1
            })
            .style("fill", function(d) {
                return padatcolors(Number(d.properties.kepadatan_1))
            })
            .style("stroke", "#063C31")
            .style("stroke-width", "0.05px")
    });
}

// $('#profile-tab').click(function(e) {
//     // tahun = $("#p_tahun").val()
//     // tabel = $(e.target).attr("id");
//     model = true;
//     console.log(tahun, tabel, zoom_state);
//     load_penduduk(kodekab);
//     profile_tab = true;
// });

// $('#home-tab').click(function(e) {
//     // tahun = $("#p_tahun").val()
//     // tabel = $(e.target).attr("id");
//     model = true;
//     console.log(tahun, tabel, zoom_state);
//     $("#desa").remove();
//     $("#desa-label").remove();
//     $(".legend").remove();
//     load_kab(kodekab);
//     $("#chart1").hide();
//     kabgraph(kodekab);
//     profile_tab = false;
// });

$('#profile-tab').click(function(e) {
    $('#dropup-datadasar').show();
});

$('#home-tab').click(function(e) {
    $('#dropup-datadasar').hide();
});

$(document).ready(function() {
    $('#list-desamandiri').hide();
});

$('#btn-desa-mandiri').click(function(e) {
    $('#list-desamandiri').toggle();
});

$('#list-desamandiri').click(function(e) {
    tabeltipe = 'mandiri';
    // $('#modeltext').text($(e.target).text());
    sel = "li label #" + $(e.target).attr("id");
    console.log($(e.target).attr("id"))
    $('#list-desamandiri').hide();

    if (sel == 'Desa Mandiri') {
        // $('#modeltext').text($(sel).text());
        console.log("A")
    } else if ($(e.target).attr("id") == 'list-desamandiri') {
        // $('#modeltext').text($(sel).text())
        console.log("B")
    } else {
        console.log("C")
        $('#md_judul').show();
        $('#md_grafik').show();
        $("#chart1").empty();
        console.log(e)
        $('#list-desamandiri selected').val($(e.target).attr("id"));
        $('#modeltext').empty();
        $('#masterprofile').hide();
        $("#chart1").show();
        $('#modeltext').text($(sel).text());
        var deskripsimodel = "div #" + $(e.target).attr("id");
        console.log(deskripsimodel)
        $('#deskripsimodel').empty();
        $('#deskripsimodel').append(he.decode($(deskripsimodel).html()));

        $('.nav-tabs a[href="#tab_content1"]').tab('show');
        tabel = $(e.target).attr("id");
        model = true;
        console.log(tahun, tabel, zoom_state);
        if (zoom_state == 1 || zoom_state == 2) {
            $.get("/profileagg" + '?tabel=' + tabel + '&tahun=' + tahun,
                function(data) {
                    maptipe = data[0].tipe;
                    if (data[0].tipe == 4) {
                        var colors = d3.scale.linear()
                            .domain([1, 5, 50, 125, 250, 500])
                            .range(colorbrewer.Blues[6]);
                        colordomain = [1, 5, 50, 125, 250, 500]
                        svg.selectAll(".kabupaten")
                            .style("fill", function(d) {
                                console.log(d.properties.kdbbps)
                                for (i = 0; i < data.length; i++) {
                                    if (data[i].kdbbps == d.properties.kdbbps) {
                                        // console.log(colors(Number(d.properties.count)))
                                        return colors(Number(data[i].count))
                                    }
                                }
                            })
                        $(".legend").remove();
                        agglegend(colordomain);
                    } else {
                        $.get("/profileagg" + '?tabel=' + tabel + '&tahun=' + tahun,
                            function(dataagg) {
                                $.get("/mapcoloragg" + '?tabel=' + tabel + '&tahun=' + tahun,
                                    function(data) {
                                        kab = kabgeom;
                                        warnawarniagg = {}
                                        warnawarniagg = data;
                                        colored = true;
                                        svg.selectAll(".kabupaten")
                                            .style("fill", function(d) {
                                                return getcoloragg(d.properties.kdbbps)
                                            });
                                        $(".legend").remove();
                                        createlegend();
                                        kabgraphagg()
                                    })
                            })
                    }
                })
            $.get("/mapcolor" + '?tabel=' + tabel + '&tahun=' + tahun,
                function(data) {
                    kab = kabgeom;
                    // warnawarni = {}
                    warnawarni = data;
                    colored = true;
                    svg.selectAll(".kdebps")
                        .style("fill", function(d) {
                            console.log(getcolor(d.properties.kdebps))
                            return getcolor(d.properties.kdebps)
                        });
                    $(".legend").remove();
                    createlegend();
                    kabgraph(kodekab);
                    $("#chart1").show();
                    $("#chartradar").hide();
                })
        }
        if (zoom_state == 0) {
            $.get("/profileagg" + '?tabel=' + tabel + '&tahun=' + tahun,
                function(data) {
                    maptipe = data[0].tipe;
                    if (data[0].tipe == 4) {
                        $("#chart1").empty();
                        var colors = d3.scale.linear()
                            .domain([1, 5, 50, 125, 250, 500])
                            .range(colorbrewer.Blues[6]);
                        colordomain = [1, 5, 50, 125, 250, 500]
                        svg.selectAll(".kabupaten")
                            .style("fill", function(d) {
                                console.log(d.properties.kdbbps)
                                for (i = 0; i < data.length; i++) {
                                    if (data[i].kdbbps == d.properties.kdbbps) {
                                        // console.log(colors(Number(d.properties.count)))
                                        return colors(Number(data[i].count))
                                    }
                                }
                            })
                        $(".legend").remove();
                        agglegend(colordomain);
                    } else {
                        $.get("/profileagg" + '?tabel=' + tabel + '&tahun=' + tahun,
                            function(dataagg) {
                                $.get("/mapcoloragg" + '?tabel=' + tabel + '&tahun=' + tahun,
                                    function(data) {
                                        kab = kabgeom;
                                        warnawarniagg = {}
                                        warnawarniagg = data;
                                        colored = true;
                                        svg.selectAll(".kabupaten")
                                            .style("fill", function(d) {
                                                // console.log(getcoloragg(d.properties.kdbbps))
                                                return getcoloragg(d.properties.kdbbps)
                                            });
                                        $(".legend").remove();
                                        createlegend();
                                        kabgraphagg()
                                    })
                            })
                    }
                })
        }
    }

    // tahun = $("#p_tahun").val()

});

function colorthat() {
    $.get("/mapcolor" + '?tabel=' + tabel + '&tahun=' + tahun,
        function(data) {
            // kab = kabgeom;
            // warnawarni = {}
            warnawarni = data;
            colored = true;
            svg.selectAll(".kdebps")
                .style("fill", function(d) {
                    // console.log(getcolor(d.properties.kdebps), d)
                    return getcolor(d.properties.kdebps)
                })
        })
};

function colorthis() {
    // kab = kabgeom;
    // warnawarni = {}
    svg.selectAll(".kdebps")
        .style("fill", function(d) {
            // console.log(d.properties.kdebps, getcolorprof(d.properties.kdebps))
            return getcolorprof(d.properties.kdebps)
        })
};


var graphdata1c3;

function createlegend() {
    $.get("/grafmodel1c3" + '?tabel=' + tabel + '&tahun=' + tahun + '&kode=' + kodekab,
        function(data) {
            var color_domain = [],
                colors = [0],
                legend_labels = []
            window.graphdata1c3 = data;
            console.log(data);
            $.get("/kategoridesc", {
                variabel: String(tabel)
            }, function(data) {
                kategoridesc = data;
                console.log(data);
                // var legend;

                for (i = 0; i < data[0]['v_color'].split(',').length; i++) {
                    color_domain.push(data[0]['v_break'].split(',')[i]);
                    legend_labels.push(data[0]['r_break'].split(',')[i]);
                    colors.push(data[0]['v_color'].split(',')[i]);
                    console.log(color_domain, legend_labels);
                }
                var color = d3.scale.threshold()
                    .domain(color_domain)
                    .range(colors);

                var legend = svg.selectAll("g.legend")
                    .data(color_domain)
                    .enter().append("g")
                    .attr("class", "legend");

                var ls_w = 20,
                    ls_h = 20;

                for (i = 0; i < data[0]['v_color'].split(',').length; i++) {
                    // color_domain.push(data[0]['v_break'].split(',')[i]);
                    // legend_labels.push(data[0]['r_break'].split(',')[i]);
                    // colors.push(data[0]['v_color'].split(',')[i]);
                    // console.log(color_domain, legend_labels);

                    // graphdata1c3color[data[0]['r_break'].split(',')[i]] = data[0]['v_color'].split(',')[i]


                    legend.append("rect")
                        .attr("x", 20)
                        .attr("y", function(d, i) { return (height - (i * ls_h) - 2 * ls_h - 20); })
                        .attr("width", ls_w)
                        .attr("height", ls_h)
                        .style("stroke", "#DDDDDD")
                        .style("stroke-width", "1")
                        .style("fill", function(d, i) { return color(d); })
                        .style("opacity", 0.8);
                    legend.append("text")
                        .attr("x", 50)
                        .attr("y", function(d, i) { return (height - (i * ls_h) - ls_h - 4 - 20); })
                        .style("stroke", "#DDDDDD")
                        .style("font-weight", "bold")
                        .style("stroke-width", "0.15")
                        .text(function(d, i) { return legend_labels[i]; });

                }

                legend.append("rect")
                    .attr("x", 20)
                    .attr("y", function() { return (height - (0 * ls_h) - 2 * ls_h); })
                    .attr("width", ls_w)
                    .attr("height", ls_h)
                    .style("stroke", "#DDDDDD")
                    .style("stroke-width", "1")
                    .style("fill", function() { return "#82A183"; })
                    .style("opacity", 0.8);
                legend.append("text")
                    .attr("x", 50)
                    .attr("y", function() { return (height - (0 * ls_h) - ls_h - 4); })
                    .style("stroke", "#DDDDDD")
                    .style("font-weight", "bold")
                    .style("stroke-width", "0.15")
                    .text(function() { return "Tidak ada Data"; });
            });
        });



}

function agglegend(domain) {
    var color = d3.scale.threshold()
        .domain(domain)
        .range(colorbrewer.Blues[6]);
    var legend = svg.selectAll("g.legend")
        .data(domain)
        .enter().append("g")
        .attr("class", "legend");

    var ls_w = 20,
        ls_h = 20;

    legend.append("rect")
        .attr("x", 20)
        .attr("y", function(d, i) { return (height - (i * ls_h) - 2 * ls_h) - 20; })
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("stroke", "#DDDDDD")
        .style("stroke-width", "1")
        .style("fill", function(d, i) { return color(d); })
        .style("opacity", 0.8);
    legend.append("text")
        .attr("x", 50)
        .attr("y", function(d, i) { return (height - (i * ls_h) - ls_h - 4) - 20; })
        .style("stroke", "#DDDDDD")
        .style("font-weight", "bold")
        .style("stroke-width", "0.15")
        .text(function(d, i) { return domain[i]; });

    legend.append("rect")
        .attr("x", 20)
        .attr("y", function() { return (height - (0 * ls_h) - 2 * ls_h); })
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("stroke", "#DDDDDD")
        .style("stroke-width", "1")
        .style("fill", function() { return "#82A183"; })
        .style("opacity", 0.8);
    legend.append("text")
        .attr("x", 50)
        .attr("y", function() { return (height - (0 * ls_h) - ls_h - 4); })
        .style("stroke", "#DDDDDD")
        .style("font-weight", "bold")
        .style("stroke-width", "0.15")
        .text(function() { return "Tidak ada Data"; });
}

function kabgraph(kdbbps) {
    graphdata1c3color = {}
    $.get("/grafmodel1c3" + '?tabel=' + tabel + '&tahun=' + tahun + '&kode=' + kdbbps,
        function(data) {
            window.graphdata1c3 = data;
            console.log(data);
            $.get("/kategoridesc", {
                variabel: String(tabel)
            }, function(data) {
                kategoridesc = data;
                for (i = 0; i < data[0]['v_color'].split(',').length; i++) {
                    graphdata1c3color[data[0]['r_break'].split(',')[i]] = data[0]['v_color'].split(',')[i]
                }
                // console.log(graphdata1c3color)
                for (i = 0; i < graphdata1c3.length; i++) {
                    // console.log(graphdata1c3[i])
                }
                // console.log(graphdata1c3color)
                var chart = c3.generate({
                    bindto: '#chart1',
                    size: {
                        height: 350,
                    },
                    data: {
                        columns: graphdata1c3,
                        type: 'donut',
                        colors: graphdata1c3color,
                    },
                    axis: {
                        rotated: true
                    },
                    donut: {
                        label: {
                            format: function(value) { return value; }
                        }
                    }
                });
            });
        });
    // console.log(graphdata1c3)
}

var grafmodel1c3agg;

function kabgraphagg() {
    graphdata1c3color = {}
    $.get("/grafmodel1c3agg" + '?tabel=' + tabel + '&tahun=' + tahun,
        function(data) {
            window.grafmodel1c3agg = data;
            console.log(data);
            $.get("/kategoridesc", {
                variabel: String(tabel)
            }, function(data) {
                kategoridesc = data;
                for (i = 0; i < data[0]['v_color'].split(',').length; i++) {
                    graphdata1c3color[data[0]['r_break'].split(',')[i]] = data[0]['v_color'].split(',')[i]
                }
                // console.log(graphdata1c3color)
                for (i = 0; i < graphdata1c3.length; i++) {
                    // console.log(graphdata1c3[i])
                }
                // console.log(graphdata1c3color)
                var chart = c3.generate({
                    bindto: '#chart1',
                    size: {
                        height: 350,
                    },
                    data: {
                        columns: grafmodel1c3agg,
                        type: 'donut',
                        colors: graphdata1c3color,
                    },
                    axis: {
                        rotated: true
                    },
                    donut: {
                        label: {
                            format: function(value) { return value; }
                        }
                    }
                });
            });
        });
    // console.log(graphdata1c3)
}

function pesisir(kode) {
    $.get("/pesisir?kode=" + kode + '&tahun=' + tahun,
        function(data) {
            window.pesisirdata = data;
            var marksCanvas = document.getElementById("chartradar");
            var context = marksCanvas.getContext("2d")
            context.clearRect(0, 0, marksCanvas.width, marksCanvas.height);

            var marksData = {
                labels: ["Aspek Manusia", "Aspek Usaha", "Aspek Sumberdaya", "Aspek Lingkungan & Infrastruktur", "Aspek Siaga Bencana & Perubahan Iklim"],
                datasets: [{
                    label: "Desa Pesisir Tangguh",
                    backgroundColor: "rgba(200,0,0,0.2)",
                    data: data
                }]
            };

            var radarChart = new Chart(marksCanvas, {
                type: 'radar',
                data: marksData
            });

        });
}

function ispesisir(kode) {
    if (tabel == 't_pesisir') {
        $("#chart1").hide();
        $("#chartradar").show();
        setTimeout(function() {
            pesisir(kode);
        }, 1000);
    }
}

function ispenduduk(kode) {
    $("#chartradar").hide();
    getdata(kode);
    setTimeout(function() {
        prop1();
        ages1();
        tamatsekolah1();
    }, 1000);
}

// ALPHA

var datapenduduk;
var datapendidikan;
var proporsi_penduduk = [];
var kepadatan_penduduk = [];
var jumlah_kk = [];
var rentang_umur = [];
var pendidikansekolah = [];

function getdata(kode) {
    $.get("/penduduk?kode=" + kode,
        function(data) {
            console.log("PENDUDUK:", data);
            window.proporsi_penduduk = [];
            window.rentang_umur = [];
            window.datapenduduk = data;
            try {
                window.proporsi_penduduk.push(['Laki-laki', data[0].jml_laki])
                window.proporsi_penduduk.push(['Perempuan', data[0].jml_perempuan])
            } catch (error) {
                window.proporsi_penduduk.push(['Laki-laki', data.jml_laki])
                window.proporsi_penduduk.push(['Perempuan', data.jml_perempuan])
            }
            // window.proporsi_penduduk.push(['Jumlah KK', data.jumlah_kk])
            // window.proporsi_penduduk.push(['Kepadatan Penduduk', data.kepadatan_penduduk])
            window.rentang_umur.push(['Umur 0-4 Tahun', data.u0_4])
            window.rentang_umur.push(['Umur 5-9 Tahun', data.u5_9])
            window.rentang_umur.push(['Umur 10-14 Tahun', data.u10_14])
            window.rentang_umur.push(['Umur 15-19 Tahun', data.u15_19])
            window.rentang_umur.push(['Umur 20-24 Tahun', data.u20_24])
            window.rentang_umur.push(['Umur 25-29 Tahun', data.u25_29])
            window.rentang_umur.push(['Umur 30-34 Tahun', data.u30_34])
            window.rentang_umur.push(['Umur 35-39 Tahun', data.u35_39])
            window.rentang_umur.push(['Umur 40-44 Tahun', data.u40_44])
            window.rentang_umur.push(['Umur 45-49 Tahun', data.u45_49])
            window.rentang_umur.push(['Umur 50-54 Tahun', data.u50_54])
            window.rentang_umur.push(['Umur 55-59 Tahun', data.u55_59])
            window.rentang_umur.push(['Umur 60-64 Tahun', data.u60_64])
            window.rentang_umur.push(['Umur 65-69 Tahun', data.u65_69])
            window.rentang_umur.push(['Umur 70-74 Tahun', data.u70_74])
            window.rentang_umur.push(['Umur >75 Tahun', data.u75])
            prop1();
        });
    $.get("/pendidikan?kode=" + kode,
        function(data) {
            console.log("PENDIDIKAN:", data);
            window.pendidikansekolah = [];
            window.datapendidikan = data;
            window.pendidikansekolah.push(['Tidak Sekolah', data.tidak_sekolah])
            window.pendidikansekolah.push(['Tamat SD', data.tamat_sd])
            window.pendidikansekolah.push(['Tamat SMP', data.tamat_smp])
            window.pendidikansekolah.push(['Tamat SMA', data.tamat_slta])
            window.pendidikansekolah.push(['Tamat SMK', data.tamat_smk])
            window.pendidikansekolah.push(['Tamat D1/D2', data.tamat_d1_d2])
            window.pendidikansekolah.push(['Tamat D3', data.tamat_d3])
            window.pendidikansekolah.push(['Tamat D4/S1', data.tamat_d4_s1])
            window.pendidikansekolah.push(['Tamat S2/S3', data.tamat_s2_s3])
        });
}

function prop1() {
    var chart = c3.generate({
        bindto: '#chart2',
        size: {
            height: 250,
        },
        data: {
            columns: proporsi_penduduk,
            type: 'donut',
            onclick: function(d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function(d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function(d, i) {
                console.log("onmouseout", d, i);
            }
        },
        donut: {
            title: "Proporsi Penduduk"
        }
    });
}

function ages1() {
    var chart = c3.generate({
        bindto: '#chart3',
        size: {
            height: 250,
        },
        data: {
            columns: rentang_umur,
            type: 'bar',
            // colors: graphdata1c3color,
        },
        axis: {
            rotated: false
        }
    });
}

function tamatsekolah1() {
    var chart = c3.generate({
        bindto: '#chart4',
        size: {
            height: 250,
        },
        data: {
            columns: pendidikansekolah,
            type: 'bar',
            // colors: graphdata1c3color,
        },
        axis: {
            rotated: false
        }
    });
}

function load_radar(tabel, kode, tahun) {
    $.get("/radar?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + kode,
        function(data) {
            console.log("JAWABAN:", data);
            var marksCanvas = document.getElementById("chartradar");
            var context = marksCanvas.getContext("2d")
            context.clearRect(0, 0, marksCanvas.width, marksCanvas.height);

            var marksData = {
                labels: data['keterangan'],
                datasets: [{
                    // label: "Desa Pesisir Tangguh",
                    backgroundColor: "rgba(200,0,0,0.2)",
                    data: data['nilai']
                }]
            };

            var radarChart = new Chart(marksCanvas, {
                type: 'radar',
                data: marksData
            });

        });
}


var jawabanparam;
var variabeldesc;
var modelhtml;

function jawabanindikator(kode) {
    $.get("/getjawaban?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + kode,
        function(data) {
            console.log("JAWABAN:", data);
            window.jawabanparam = data;
        });
}

function indikator(jawaban) {
    sleep(1000);
    $.get("/variabel/detail/" + String(tabel),
        function(data) {
            console.log(data)
            tipe = data['tipe'];
            maptipe = tipe;
            window.variabeldesc = data;
            $("#jawaban ol").empty();
            if (tipe == 1) {
                $.each(variabeldesc, function(i, val) {
                    if (String(i) != 'tipe') {
                        jawabankolom = jawabanparam[String(i)]
                        result = '';
                        if (jawabankolom) {
                            result = 'YA'
                        } else {
                            result = 'TIDAK'
                        }
                        $("#jawaban ol").append('<li><div id="varparam" class="form-group skoringli">' + val + '<p><strong>' + result + '</strong></div></li>');
                    }
                })
            };
            if (tipe == 2) {
                $.each(variabeldesc, function(i, val) {
                    if (String(i) != 'tipe') {
                        $("#isivariabel ol").append('<li><div id="varparam" class="form-group skoringli"><label class="control-label" for="focusedInput">' + val + '</label><input class="form-control" id="focusedInput" type="text"></div></li>');
                    }
                })
            };
            if (tipe == 3) {
                $("#isivariabel ol").append('Tipe Formula, dihitung otomatis');
            }
            if (tipe == 4) {
                $("#modelprofile").empty();
                modelhtml = window.jawabanparam['htmldata'];
                console.log(modelhtml);
                $("#modelprofile").append(modelhtml);
            }
        });
}

function kablabelz0() {
    d3.selectAll(".kabupaten-label")
        .style("font-size", "7px")
        .style("font-weight", "500")
}

function kablabelz1() {
    d3.selectAll(".kabupaten-label")
        .style("font-size", "3px")
        .style("font-weight", "500")
}

function kablabelz2() {
    d3.selectAll(".kabupaten-label")
        .style("font-size", "1px")
        .style("font-weight", "500")
}

function kabstrokez0() {
    d3.selectAll(".kabupaten")
        .style("stroke-width", "0.5px")
        .style("stroke-dasharray", "2,2");
}

function kabstrokez1() {
    d3.selectAll(".kabupaten")
        .style("stroke-width", "0.2px")
        .style("stroke-dasharray", "0.7,0.7");
}

function kabstrokez2() {
    d3.selectAll(".kabupaten")
        .style("stroke-width", "0.05px")
        .style("stroke-dasharray", "0.05,0.1");
}

$(window).on('resize', function() { location.reload(); });

// $.get('/fdesa', function(data) {
//     $(function() {
//         $.widget("custom.catcomplete", $.ui.autocomplete, {
//             _create: function() {
//                 this._super();
//                 this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
//             },
//             _renderMenu: function(ul, items) {
//                 var that = this,
//                     currentCategory = "";
//                 $.each(items, function(index, item) {
//                     var li;
//                     if (item.category != currentCategory) {
//                         ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
//                         currentCategory = item.kabupaten;
//                     }
//                     li = that._renderItemData(ul, item);
//                     if (item.category) {
//                         li.attr("aria-label", item.kabupaten + " : " + item.desa);
//                     }
//                 });
//             }
//         });
//         $("#search").catcomplete({
//             delay: 0,
//             source: data
//         });
//     });
// });

$(document).ready(function() {
    $('.dropdown-submenu.desa-dropdown a.test').on("click", function(e) {
        $('#listvariabel').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
});

var intervensi;

function loadintervensi(tabel, tahun, kode) {
    $.get("/intervensi?tabel=" + tabel + "&tahun=" + tahun + "&kode=" + kode,
        function(data) {
            window.intervensi = data;
            $("#intervensi").append(data);
        })
}

$(function() {
    $('#search').keyup(function() {
        var current_query = $('#search').val();
        if (current_query !== "") {
            $(".list-group li").hide();
            $(".list-group li").each(function() {
                var current_keyword = $(this).text();
                if (current_keyword.indexOf(current_query) >= 0) {
                    $(this).show();
                };
            });
        } else {
            $(".list-group li").show();
        };
    });
});

var cariteks, hasilcari;
var tipecari = 'carisemua';

$('#btn_cariadm').click(function() {
    window.cariteks = $('#cariteks').val();
    console.log(cariteks);
    $("#hasilcari").empty();
    $.get("/caridaerah?cari=" + cariteks + '&tipecari=' + tipecari,
        function(data) {
            window.hasilcari = data;
            console.log(hasilcari);
            for (i = 0; i < hasilcari.length; i++) {
                $("#hasilcari").append("<li id='id_" + hasilcari[i]['kodebps'] + "' class='list-group-item'>Kode BPS: " + hasilcari[i]['kodebps'] + " / Desa: " + hasilcari[i]['desa'] + " / Kecamatan: " + hasilcari[i]['kecamatan'] + " / Kabupaten: " + hasilcari[i]['kabupaten'] + " / Provinsi: " + hasilcari[i]['provinsi'] + "</li>")
            }
        })
});

$("#hasilcari").click(function(e) {
    console.log($(e.target).attr("id"));
    $('#carimodal').modal('toggle');
    id_kode = $(e.target).attr("id");
    koderesult = $(e.target).attr("id").split('_')[1];
    if (koderesult.length == 4) {
        console.log('KAB');
        var upath = d3.select("#" + id_kode);
        var d = upath.data()[0];
        if (d) {
            if (d.properties.kdebps == undefined) {
                dzoomed = false;
            } else {
                dzoomed = true;
            }
            if (kodekab == d.properties.kdbbps) {
                switched = false;
            } else {
                switched = true;
            }
            kodekab = d.properties.kdbbps;
            kodekabupaten = kodekab;
            if (zoom_state == 0) {
                console.log("A")
                layer_zoomin(d);
                layer_transform();
                if (kodekab && switched) {
                    $("#desa-label").remove();
                    $("#desa").remove();
                    $(".legend").remove();
                    load_kab(kodekab);
                    // kabgraph(kodekab);
                    $("#chart1").show();
                    $("#chartradar").hide();
                } else {
                    load_kab(kodekab);
                    // kabgraph(kodekab);
                    $("#chart1").show();
                    $("#chartradar").hide();
                }
                lastgeom = d;
                kabstrokez1();
                kablabelz1();
                profildesc(kodekab);
                getdata(kodekab);
                zoom_state = 1;
                colorthat();
                $('#kdesatext').text("JAWA TENGAH / " + d.properties.wadmkk);
            } else {
                console.log("B")
                if (kodekab && switched && dzoomed) {
                    console.log("C")
                    console.log("SWITCHEDA");
                    lastgeom = d;
                    $("#desa-label").remove();
                    $("#desa").remove();
                    $(".legend").remove();
                    load_kab(kodekab);
                    kabgraph(kodekab);
                    $("#chart1").show();
                    $("#chartradar").hide();
                    kablabelz2();
                    kabstrokez2();
                    profildesc(d.properties.kdebps);
                    getdata(kodekab);
                    $.get("/getjawaban?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + d.properties.kdebps,
                        function(data) {
                            console.log("JAWABAN:", data);
                            window.jawabanparam = data;
                            // jawabanindikator(d.properties.kdebps);
                            indikator(data);
                        });
                } else if (kodekab && switched && !dzoomed) {
                    console.log("D")
                    console.log("SWITCHEDB");
                    lastgeom = d;
                    $("#desa-label").remove();
                    $("#desa").remove();
                    $(".legend").remove();
                    load_kab(kodekab);
                    kabgraph(kodekab);
                    $("#chart1").show();
                    $("#chartradar").hide();
                    $('#masterprofile').hide();
                    kablabelz1();
                    kabstrokez1();
                    profildesc(kodekab);
                    getdata(kodekab);
                    if (tabeltipe == 'dasar') {
                        console.log("DA")
                        dasarmapcolor(dasariddata, dasarkolom);
                    }
                    $.get("/getjawaban?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + d.properties.kdebps,
                        function(data) {
                            console.log("JAWABAN:", data);
                            window.jawabanparam = data;
                            // jawabanindikator(d.properties.kdebps);
                            indikator(data);
                        });
                } else {
                    console.log("E")
                    console.log("NOTSWITCHED");
                    // load_kab(kodekab);
                    $("#desa-label").remove();
                    load_label_desa();
                    createlegend();
                    $("#chart1").hide();
                    $("#chartradar").hide();
                    profildesc(d.properties.kdebps);
                    getdata(d.properties.kdebps);
                    if (tabeltipe == 'dasar') {
                        console.log("E")
                        dasarmapcolor(dasariddata, dasarkolom);
                    }
                    $.get("/getjawaban?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + d.properties.kdebps,
                        function(data) {
                            console.log("JAWABAN:", data);
                            window.jawabanparam = data;
                            // jawabanindikator(d.properties.kdebps);
                            indikator(data);
                            if (maptipe == 5) {;
                                canv = document.getElementById("chartradar");
                                ctx = canv.getContext("2d");
                                ctx.save();

                                // Use the identity matrix while clearing the canvas
                                ctx.setTransform(1, 0, 0, 1, 0, 0);
                                ctx.clearRect(0, 0, canv.width, canv.height);

                                // Restore the transform
                                ctx.restore();
                                load_radar(tabel, d.properties.kdebps, tahun);
                                $('#md_judul').show();
                                $('#md_grafik').show();
                                $('#masterprofile').hide();
                                $("#chartradar").show()
                            }
                        });
                    dzoomed = true;
                    zoom_state = 2;
                }
                layer_zoomin(d);
                layer_transform();
                if (d.properties.kdebps == undefined) {
                    $('#kdesatext').text("JAWA TENGAH / " + d.properties.wadmkk);
                } else {
                    $('#kdesatext').text("JAWA TENGAH / " + d.properties.wadmkk + " / " + d.properties.namobj);
                }
                if (maptipe == 4) {
                    $('#masterprofile').show();
                    $('#md_judul').hide();
                    $('#md_grafik').hide();
                    $('#jawaban').hide();
                    // $('#kdesaptext').text(d.properties.wadmkk + " / " + d.properties.namobj);
                } else if (maptipe == 5) {;
                    load_radar(tabel, d.properties.kdebps, tahun);
                    $('#md_judul').show();
                    $('#md_grafik').show();
                    $('#masterprofile').hide();
                } else {
                    $('#md_judul').show();
                    $('#md_grafik').show();
                    $('#masterprofile').hide();
                    // $('#kdesatext').text(d.properties.wadmkk + " / " + d.properties.namobj);
                }
                $("#chartradar").hide();
            }
        }
    } else {
        console.log('DESA');
        kkab = id_kode.substr(0, 7);
        kkab2 = kkab.substr(3, 4);
        load_kab(kkab2);
        setTimeout(function() {
            zoom_state = 1;
            var upath = d3.select("#" + id_kode);
            var d = upath.data()[0];
            // lastgeom = d;
            if (d) {
                if (d.properties.kdebps == undefined) {
                    dzoomed = false;
                } else {
                    dzoomed = true;
                }
                if (kodekab == d.properties.kdbbps) {
                    switched = false;
                } else {
                    switched = true;
                }
                kodekab = d.properties.kdbbps;
                kodekabupaten = kodekab;
                if (zoom_state == 0) {
                    console.log("A")
                    layer_zoomin(d);
                    layer_transform();
                    if (kodekab && switched) {
                        $("#desa-label").remove();
                        $("#desa").remove();
                        $(".legend").remove();
                        load_kab(kodekab);
                        // kabgraph(kodekab);
                        $("#chart1").show();
                        $("#chartradar").hide();
                    } else {
                        load_kab(kodekab);
                        // kabgraph(kodekab);
                        $("#chart1").show();
                        $("#chartradar").hide();
                    }
                    lastgeom = d;
                    kabstrokez1();
                    kablabelz1();
                    profildesc(kodekab);
                    getdata(kodekab);
                    zoom_state = 1;
                    colorthat();
                    $('#kdesatext').text("JAWA TENGAH / " + d.properties.wadmkk);
                } else {
                    console.log("B")
                    if (kodekab && switched && dzoomed) {
                        console.log("C")
                        console.log("SWITCHEDA");
                        lastgeom = d;
                        $("#desa-label").remove();
                        $("#desa").remove();
                        $(".legend").remove();
                        load_kab(kodekab);
                        kabgraph(kodekab);
                        $("#chart1").show();
                        $("#chartradar").hide();
                        kablabelz2();
                        kabstrokez2();
                        profildesc(d.properties.kdebps);
                        getdata(kodekab);
                        $.get("/getjawaban?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + d.properties.kdebps,
                            function(data) {
                                console.log("JAWABAN:", data);
                                window.jawabanparam = data;
                                // jawabanindikator(d.properties.kdebps);
                                indikator(data);
                            });
                        $("#desa-label").insertAfter("#desa");
                    } else if (kodekab && switched && !dzoomed) {
                        console.log("D")
                        console.log("SWITCHEDB");
                        lastgeom = d;
                        $("#desa-label").remove();
                        $("#desa").remove();
                        $(".legend").remove();
                        load_kab(kodekab);
                        kabgraph(kodekab);
                        $("#chart1").show();
                        $("#chartradar").hide();
                        $('#masterprofile').hide();
                        kablabelz1();
                        kabstrokez1();
                        profildesc(kodekab);
                        getdata(kodekab);
                        if (tabeltipe == 'dasar') {
                            console.log("DA")
                            dasarmapcolor(dasariddata, dasarkolom);
                        }
                        $.get("/getjawaban?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + d.properties.kdebps,
                            function(data) {
                                console.log("JAWABAN:", data);
                                window.jawabanparam = data;
                                // jawabanindikator(d.properties.kdebps);
                                indikator(data);
                            });
                    } else {
                        console.log("E")
                        console.log("NOTSWITCHED");
                        // load_kab(kodekab);
                        $("#desa-label").remove();
                        load_label_desa();
                        createlegend();
                        $("#chart1").hide();
                        $("#chartradar").hide();
                        profildesc(d.properties.kdebps);
                        getdata(d.properties.kdebps);
                        if (tabeltipe == 'dasar') {
                            console.log("E")
                            dasarmapcolor(dasariddata, dasarkolom);
                        }
                        $.get("/getjawaban?tabel=" + tabel + '&tahun=' + tahun + '&kode=' + d.properties.kdebps,
                            function(data) {
                                console.log("JAWABAN:", data);
                                window.jawabanparam = data;
                                // jawabanindikator(d.properties.kdebps);
                                indikator(data);
                                if (maptipe == 5) {;
                                    canv = document.getElementById("chartradar");
                                    ctx = canv.getContext("2d");
                                    ctx.save();

                                    // Use the identity matrix while clearing the canvas
                                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                                    ctx.clearRect(0, 0, canv.width, canv.height);

                                    // Restore the transform
                                    ctx.restore();
                                    load_radar(tabel, d.properties.kdebps, tahun);
                                    $('#md_judul').show();
                                    $('#md_grafik').show();
                                    $('#masterprofile').hide();
                                    $("#chartradar").show()
                                }
                            });
                        dzoomed = true;
                        zoom_state = 2;
                    }
                    layer_zoomin(d);
                    layer_transform();
                    if (d.properties.kdebps == undefined) {
                        $('#kdesatext').text("JAWA TENGAH / " + d.properties.wadmkk);
                    } else {
                        $('#kdesatext').text("JAWA TENGAH / " + d.properties.wadmkk + " / " + d.properties.namobj);
                    }
                    if (maptipe == 4) {
                        $('#masterprofile').show();
                        $('#md_judul').hide();
                        $('#md_grafik').hide();
                        $('#jawaban').hide();
                        // $('#kdesaptext').text(d.properties.wadmkk + " / " + d.properties.namobj);
                    } else if (maptipe == 5) {;
                        load_radar(tabel, d.properties.kdebps, tahun);
                        $('#md_judul').show();
                        $('#md_grafik').show();
                        $('#masterprofile').hide();
                    } else {
                        $('#md_judul').show();
                        $('#md_grafik').show();
                        $('#masterprofile').hide();
                        // $('#kdesatext').text(d.properties.wadmkk + " / " + d.properties.namobj);
                    }
                    $("#chartradar").hide();
                }
            }
            setTimeout(function() {
                console.log("REARR")
                load_label_desa();
                $("#desa-label").insertAfter("#desa");
            }, 1000);
        }, 1000);
    }
});

$(document).ready(function(e) {
    $('#carigrup .dropdown-menu').find('li').click(function(e) {
        e.preventDefault();
        console.log($(e.target).attr("id"));
        window.tipecari = $(e.target).attr("id");
        // var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('#carigrup span#search_concept').text(concept);
        // $('.input-group #search_param').val(param);
    });
});