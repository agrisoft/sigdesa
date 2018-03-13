function randomData() {
    return Math.floor((Math.random() * 100) + 1);
}

var dom = document.getElementById("kecamatan_map");
var myChart = echarts.init(dom);
var app = {};
option = null;
myChart.showLoading();

$.get('static/data/d4.geojson', function(jatengkecJson) {
    myChart.hideLoading();

    echarts.registerMap('JATENGDES', jatengkecJson);
    option = {
        backgroundColor: '#EEEEEE',
        title: {
            text: 'DESA MANDIRI KOTA PEKALONGAN',
            subtext: 'Data Random',
            sublink: 'http://www.agrisoft.co.id',
            left: 'right'
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            left: 'right',
            min: 0,
            max: 100,
            inRange: {
                color: ['#22c1c3', '#fdbb2d']
            },
            text: ['High', 'Low'], // 文本，默认为数值文本
            calculable: true
        },
        toolbox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'bottom',
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['A', 'B', 'C']
        },
        series: [{
                name: 'A',
                type: 'map',
                roam: true,
                zoom: 1.5,
                mapType: 'JATENGDES',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    { name: 'KALIPUCANG WETAN', value: randomData() },
                    { name: 'KARANGJOMPO', value: randomData() },
                    { name: 'SIJONO', value: randomData() },
                    { name: 'PANJANG WETAN', value: randomData() },
                    { name: 'CANDIARENG', value: randomData() },
                    { name: 'LEBO', value: randomData() },
                    { name: 'DUKUH', value: randomData() },
                    { name: 'BENDAN', value: randomData() },
                    { name: 'TANJUNG', value: randomData() },
                    { name: 'WARUNGASEM', value: randomData() },
                    { name: 'MEDONO', value: randomData() },
                    { name: 'SOKO', value: randomData() },
                    { name: 'PAKUMBULAN', value: randomData() },
                    { name: 'KASEPUHAN', value: randomData() },
                    { name: 'BANJIRAN', value: randomData() },
                    { name: 'GAPURO', value: randomData() },
                    { name: 'PASIRSARI', value: randomData() },
                    { name: 'GAMER', value: randomData() },
                    { name: 'PROYONANGAN', value: randomData() },
                    { name: 'PAWEDEN', value: randomData() },
                    { name: 'KEPUTRAN', value: randomData() },
                    { name: 'KERTOHARJO', value: randomData() },
                    { name: 'BANYUURIPALIT', value: randomData() },
                    { name: 'DUWET', value: randomData() },
                    { name: 'KARANGANYAR', value: randomData() },
                    { name: 'SUKOREJO', value: randomData() },
                    { name: 'MENGUNENG', value: randomData() },
                    { name: 'MULYOREJO', value: randomData() },
                    { name: 'SUGIHWARAS', value: randomData() },
                    { name: 'WATUSALAM', value: randomData() },
                    { name: 'PONCOL', value: randomData() },
                    { name: 'SIMPANG KULON', value: randomData() },
                    { name: 'SAMPANG', value: randomData() },
                    { name: 'KARANGASEM', value: randomData() },
                    { name: 'SAWAHJOHO', value: randomData() },
                    { name: 'KRAMATSARI', value: randomData() },
                    { name: 'KAUMAN', value: randomData() },
                    { name: 'KRADENAN', value: randomData() },
                    { name: 'BANDENGAN', value: randomData() },
                    { name: 'BUMIREJO', value: randomData() },
                    { name: 'PABEAN', value: randomData() },
                    { name: 'KALIPUCANG KULON', value: randomData() },
                    { name: 'KERTIJAYAN', value: randomData() },
                    { name: 'BAROS', value: randomData() },
                    { name: 'PASEKARAN', value: randomData() },
                    { name: 'DEKORO', value: randomData() },
                    { name: 'BUARAN', value: randomData() },
                    { name: 'WONOYOSO', value: randomData() },
                    { name: 'KALISALAK', value: randomData() },
                    { name: 'PODOSUGIH', value: randomData() },
                    { name: 'DRINGO', value: randomData() },
                    { name: 'KEBULEN', value: randomData() },
                    { name: 'JERUKSARI', value: randomData() },
                    { name: 'DEGAYU', value: randomData() },
                    { name: 'KRATON LOR', value: randomData() },
                    { name: 'DENASRI WETAN', value: randomData() },
                    { name: 'KRAPYAK KIDUL', value: randomData() },
                    { name: 'SARIGLAGAH', value: randomData() },
                    { name: 'LANDUNGSARI', value: randomData() },
                    { name: 'KURIPAN LOR', value: randomData() },
                    { name: 'KRAPYAK LOR', value: randomData() },
                    { name: 'KURIPAN KIDUL', value: randomData() },
                    { name: 'TIRTO', value: randomData() },
                    { name: 'KARANGMALANG', value: randomData() },
                    { name: 'CURUG', value: randomData() },
                    { name: 'KEL NOYONTAAN', value: randomData() },
                    { name: 'PANDANARUM', value: randomData() },
                    { name: 'DENASRI KULON', value: randomData() },
                    { name: 'KAUMAN', value: randomData() },
                    { name: 'PESAREN', value: randomData() },
                    { name: 'TEGALDOWO', value: randomData() },
                    { name: 'PRINGLANGU', value: randomData() },
                    { name: 'PECAKARAN', value: randomData() },
                    { name: 'BANYUURIPAGENG', value: randomData() },
                    { name: 'SAPURO', value: randomData() },
                    { name: 'KANDANGPANJANG', value: randomData() },
                    { name: 'KERGON', value: randomData() },
                    { name: 'JENGGOT', value: randomData() },
                    { name: 'YOSOREJO', value: randomData() },
                    { name: 'TERBAN', value: randomData() },
                    { name: 'COPRAYAN', value: randomData() },
                    { name: 'KRATON KIDUL', value: randomData() },
                    { name: 'SIDOREJO', value: randomData() },
                    { name: 'SIMBANG WETAN', value: randomData() },
                    { name: 'ROWOBELANG', value: randomData() },
                    { name: 'KALIBELUK', value: randomData() },
                    { name: 'SAMBOREJO', value: randomData() },
                    { name: 'WATESALIT', value: randomData() },
                    { name: 'TEGALREJO', value: randomData() },
                    { name: 'SIMPANG WETAN', value: randomData() },
                    { name: 'KLEGO', value: randomData() }
                ]
            },
            {
                name: 'B',
                type: 'map',
                roam: true,
                mapType: 'JATENGDES',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    { name: 'KALIPUCANG WETAN', value: randomData() },
                    { name: 'KARANGJOMPO', value: randomData() },
                    { name: 'SIJONO', value: randomData() },
                    { name: 'PANJANG WETAN', value: randomData() },
                    { name: 'BANYUURIPALIT', value: randomData() },
                    { name: 'DUWET', value: randomData() },
                    { name: 'KARANGANYAR', value: randomData() },
                    { name: 'SUKOREJO', value: randomData() },
                    { name: 'MENGUNENG', value: randomData() },
                    { name: 'MULYOREJO', value: randomData() },
                    { name: 'SUGIHWARAS', value: randomData() },
                    { name: 'WATUSALAM', value: randomData() },
                    { name: 'PONCOL', value: randomData() },
                    { name: 'SIMPANG KULON', value: randomData() },
                    { name: 'SAMPANG', value: randomData() },
                    { name: 'KARANGASEM', value: randomData() },
                    { name: 'SAWAHJOHO', value: randomData() },
                    { name: 'KRAMATSARI', value: randomData() },
                    { name: 'KAUMAN', value: randomData() },
                    { name: 'KRADENAN', value: randomData() },
                    { name: 'BANDENGAN', value: randomData() },
                    { name: 'BUMIREJO', value: randomData() },
                    { name: 'PABEAN', value: randomData() },
                    { name: 'KALIPUCANG KULON', value: randomData() },
                    { name: 'KERTIJAYAN', value: randomData() },
                    { name: 'BAROS', value: randomData() },
                    { name: 'PASEKARAN', value: randomData() },
                    { name: 'DEKORO', value: randomData() },
                    { name: 'SIDOREJO', value: randomData() },
                    { name: 'SIMBANG WETAN', value: randomData() },
                    { name: 'ROWOBELANG', value: randomData() },
                    { name: 'KALIBELUK', value: randomData() },
                    { name: 'SAMBOREJO', value: randomData() },
                    { name: 'WATESALIT', value: randomData() },
                    { name: 'TEGALREJO', value: randomData() },
                    { name: 'SIMPANG WETAN', value: randomData() },
                    { name: 'KLEGO', value: randomData() }

                ]
            },
            {
                name: 'C',
                type: 'map',
                roam: true,
                mapType: 'JATENGDES',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    { name: 'KALIPUCANG WETAN', value: randomData() },
                    { name: 'KARANGJOMPO', value: randomData() },
                    { name: 'SIJONO', value: randomData() },
                    { name: 'PANJANG WETAN', value: randomData() },
                    { name: 'CANDIARENG', value: randomData() },
                    { name: 'LEBO', value: randomData() },
                    { name: 'DUKUH', value: randomData() },
                    { name: 'BENDAN', value: randomData() },
                    { name: 'TANJUNG', value: randomData() },
                    { name: 'WARUNGASEM', value: randomData() },
                    { name: 'MEDONO', value: randomData() },
                    { name: 'SOKO', value: randomData() },
                    { name: 'PAKUMBULAN', value: randomData() },
                    { name: 'KASEPUHAN', value: randomData() },
                    { name: 'BANJIRAN', value: randomData() },
                    { name: 'GAPURO', value: randomData() },
                    { name: 'PASIRSARI', value: randomData() },
                    { name: 'GAMER', value: randomData() },
                    { name: 'PROYONANGAN', value: randomData() },
                    { name: 'PAWEDEN', value: randomData() },
                    { name: 'KEPUTRAN', value: randomData() },
                    { name: 'BANYUURIPALIT', value: randomData() },
                    { name: 'KARANGANYAR', value: randomData() },
                    { name: 'MENGUNENG', value: randomData() },
                    { name: 'SUGIHWARAS', value: randomData() },
                    { name: 'WATUSALAM', value: randomData() },
                    { name: 'SIMPANG KULON', value: randomData() },
                    { name: 'KARANGASEM', value: randomData() },
                    { name: 'KRAMATSARI', value: randomData() },
                    { name: 'KRADENAN', value: randomData() },
                    { name: 'BUMIREJO', value: randomData() },
                    { name: 'KALIPUCANG KULON', value: randomData() },
                    { name: 'BUARAN', value: randomData() },
                    { name: 'KALISALAK', value: randomData() },
                    { name: 'PODOSUGIH', value: randomData() },
                    { name: 'KEBULEN', value: randomData() },
                    { name: 'DEGAYU', value: randomData() },
                    { name: 'DENASRI WETAN', value: randomData() },
                    { name: 'KRAPYAK LOR', value: randomData() },
                    { name: 'TIRTO', value: randomData() },
                    { name: 'KARANGMALANG', value: randomData() },
                    { name: 'KEL NOYONTAAN', value: randomData() },
                    { name: 'DENASRI KULON', value: randomData() },
                    { name: 'PESAREN', value: randomData() },
                    { name: 'PRINGLANGU', value: randomData() },
                    { name: 'BANYUURIPAGENG', value: randomData() },
                    { name: 'YOSOREJO', value: randomData() },
                    { name: 'COPRAYAN', value: randomData() },
                    { name: 'ROWOBELANG', value: randomData() },
                    { name: 'SAMBOREJO', value: randomData() },
                    { name: 'TEGALREJO', value: randomData() },
                    { name: 'SIMPANG WETAN', value: randomData() },
                    { name: 'KLEGO', value: randomData() }

                ]
            }
        ]
    };

    myChart.setOption(option);
});;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}