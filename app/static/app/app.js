var tahun = 2017;

var view = new ol.View({
    center: [0, 0],
    zoom: 2
});

var map1 = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: 'map1',
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: true
        })
    }),
    view: view
});

var geolocation = new ol.Geolocation({
    projection: view.getProjection()
});

function el(id) {
    return document.getElementById(id);
}

//      el('track').addEventListener('change', function() {
//        geolocation.setTracking(this.checked);
//      });

// update the HTML page when the position changes.
geolocation.on('change', function() {
    el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
    el('altitude').innerText = geolocation.getAltitude() + ' [m]';
    el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
    el('heading').innerText = geolocation.getHeading() + ' [rad]';
    el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
});

// handle geolocation error.
geolocation.on('error', function(error) {
    var info = document.getElementById('info');
    info.innerHTML = error.message;
    info.style.display = '';
});

var accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function() {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
            color: '#3399CC'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2
        })
    })
}));

geolocation.on('change:position', function() {
    var coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ?
        new ol.geom.Point(coordinates) : null);
});

new ol.layer.Vector({
    map: map1,
    source: new ol.source.Vector({
        features: [accuracyFeature, positionFeature]
    })
});


var MTcheck = function() {
    var check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
}
console.log('READY');
console.log('Is Mobile Device? ' + SmartPhone.isAny());
if (SmartPhone.isAny()) {
    $('.exploremap').css('left', '0px');
}

Url = {
    get get() {
        var vars = {};
        if (window.location.search.length !== 0)
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
                key = decodeURIComponent(key);
                if (typeof vars[key] === "undefined") { vars[key] = decodeURIComponent(value); } else { vars[key] = [].concat(vars[key], decodeURIComponent(value)); }
            });
        return vars;
    }
};

$(document).ready(function() {
        $('#navsamping').hide();
    })
    // $(function() {
    //     $.widget("custom.combobox", {
    //         _create: function() {
    //             this.wrapper = $("<span>")
    //                 .addClass("custom-combobox")
    //                 .insertAfter(this.element);

//             this.element.hide();
//             this._createAutocomplete();
//             this._createShowAllButton();
//         },

//         _createAutocomplete: function() {
//             var selected = this.element.children(":selected"),
//                 value = selected.val() ? selected.text() : "";

//             this.input = $("<input>")
//                 .appendTo(this.wrapper)
//                 .val(value)
//                 .attr("title", "")
//                 .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
//                 .autocomplete({
//                     delay: 0,
//                     minLength: 0,
//                     source: $.proxy(this, "_source")
//                 })
//                 .tooltip({
//                     classes: {
//                         "ui-tooltip": "ui-state-highlight"
//                     }
//                 });

//             this._on(this.input, {
//                 autocompleteselect: function(event, ui) {
//                     ui.item.option.selected = true;
//                     this._trigger("select", event, {
//                         item: ui.item.option
//                     });
//                 },

//                 autocompletechange: "_removeIfInvalid"
//             });
//         },

//         _createShowAllButton: function() {
//             var input = this.input,
//                 wasOpen = false;

//             $("<a>")
//                 .attr("tabIndex", -1)
//                 .attr("title", "Show All Items")
//                 .tooltip()
//                 .appendTo(this.wrapper)
//                 .button({
//                     icons: {
//                         primary: "ui-icon-triangle-1-s"
//                     },
//                     text: false
//                 })
//                 .removeClass("ui-corner-all")
//                 .addClass("custom-combobox-toggle ui-corner-right")
//                 .on("mousedown", function() {
//                     wasOpen = input.autocomplete("widget").is(":visible");
//                 })
//                 .on("click", function() {
//                     input.trigger("focus");

//                     // Close if already visible
//                     if (wasOpen) {
//                         return;
//                     }

//                     // Pass empty string as value to search for, displaying all results
//                     input.autocomplete("search", "");
//                 });
//         },

//         _source: function(request, response) {
//             var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
//             response(this.element.children("option").map(function() {
//                 var text = $(this).text();
//                 if (this.value && (!request.term || matcher.test(text)))
//                     return {
//                         label: text,
//                         value: text,
//                         option: this
//                     };
//             }));
//         },

//         _removeIfInvalid: function(event, ui) {

//             // Selected an item, nothing to do
//             if (ui.item) {
//                 return;
//             }

//             // Search for a match (case-insensitive)
//             var value = this.input.val(),
//                 valueLowerCase = value.toLowerCase(),
//                 valid = false;
//             this.element.children("option").each(function() {
//                 if ($(this).text().toLowerCase() === valueLowerCase) {
//                     this.selected = valid = true;
//                     return false;
//                 }
//             });

//             // Found a match, nothing to do
//             if (valid) {
//                 return;
//             }

//             // Remove invalid value
//             this.input
//                 .val("")
//                 .attr("title", value + " didn't match any item")
//                 .tooltip("open");
//             this.element.val("");
//             this._delay(function() {
//                 this.input.tooltip("close").attr("title", "");
//             }, 2500);
//             this.input.autocomplete("instance").term = "";
//         },

//         _destroy: function() {
//             this.wrapper.remove();
//             this.element.show();
//         }
//     });

//     $("#combobox").combobox();
//     $("#toggle").on("click", function() {
//         $("#combobox").toggle();
//     });
// });