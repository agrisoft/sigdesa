function randomData() {
    return Math.floor((Math.random() * 100) + 1);
}

var dom = document.getElementById("jateng_map");
var myChart = echarts.init(dom);
var app = {};
option = null;
myChart.showLoading();

$.get('static/data/t4.geojson', function(jatengkecJson) {
    myChart.hideLoading();

    echarts.registerMap('JATENGKEC', jatengkecJson);
    option = {
        backgroundColor: '#EEEEEE',
        title: {
            text: 'DESA MANDIRI',
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
                mapType: 'JATENGKEC',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    { name: 'Banjarnegara', value: randomData() },
                    { name: 'Banyumas', value: randomData() },
                    { name: 'Batang', value: randomData() },
                    { name: 'Blora', value: randomData() },
                    { name: 'Boyolali', value: randomData() },
                    { name: 'Brebes', value: randomData() },
                    { name: 'Cilacap', value: randomData() },
                    { name: 'Demak', value: randomData() },
                    { name: 'Grobogan', value: randomData() },
                    { name: 'Jepara', value: randomData() },
                    { name: 'Karanganyar', value: randomData() },
                    { name: 'Kebumen', value: randomData() },
                    { name: 'Kendal', value: randomData() },
                    { name: 'Klaten', value: randomData() },
                    { name: 'Kota Magelang', value: randomData() },
                    { name: 'Kota Pekalongan', value: randomData() },
                    { name: 'Kota Semarang', value: randomData() },
                    { name: 'Kota Tegal', value: randomData() },
                    { name: 'Kudus', value: randomData() },
                    { name: 'Magelang', value: randomData() },
                    { name: 'Pati', value: randomData() },
                    { name: 'Pekalongan', value: randomData() },
                    { name: 'Pemalang', value: randomData() },
                    { name: 'Purbalingga', value: randomData() },
                    { name: 'Purwokerto', value: randomData() },
                    { name: 'Purworejo', value: randomData() },
                    { name: 'Rembang', value: randomData() },
                    { name: 'Salatiga', value: randomData() },
                    { name: 'Semarang', value: randomData() },
                    { name: 'Sragen', value: randomData() },
                    { name: 'Sukoharjo', value: randomData() },
                    { name: 'Surakarta', value: randomData() },
                    { name: 'Tegal', value: randomData() },
                    { name: 'Temanggung', value: randomData() },
                    { name: 'Wonogiri', value: randomData() },
                    { name: 'Wonosobo', value: randomData() }
                ]
            },
            {
                name: 'B',
                type: 'map',
                roam: true,
                mapType: 'JATENGKEC',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    { name: 'Banjarnegara', value: randomData() },
                    { name: 'Banyumas', value: randomData() },
                    { name: 'Batang', value: randomData() },
                    { name: 'Boyolali', value: randomData() },
                    { name: 'Brebes', value: randomData() },
                    { name: 'Cilacap', value: randomData() },
                    { name: 'Demak', value: randomData() },
                    { name: 'Grobogan', value: randomData() },
                    { name: 'Jepara', value: randomData() },
                    { name: 'Karanganyar', value: randomData() },
                    { name: 'Kendal', value: randomData() },
                    { name: 'Kota Magelang', value: randomData() },
                    { name: 'Kota Semarang', value: randomData() },
                    { name: 'Kudus', value: randomData() },
                    { name: 'Magelang', value: randomData() },
                    { name: 'Pati', value: randomData() },
                    { name: 'Pemalang', value: randomData() },
                    { name: 'Purwokerto', value: randomData() },
                    { name: 'Rembang', value: randomData() },
                    { name: 'Salatiga', value: randomData() },
                    { name: 'Semarang', value: randomData() },
                    { name: 'Sragen', value: randomData() },
                    { name: 'Surakarta', value: randomData() },
                    { name: 'Tegal', value: randomData() },
                    { name: 'Temanggung', value: randomData() },
                    { name: 'Wonogiri', value: randomData() },
                    { name: 'Wonosobo', value: randomData() }
                ]
            },
            {
                name: 'C',
                type: 'map',
                roam: true,
                mapType: 'JATENGKEC',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    { name: 'Banjarnegara', value: randomData() },
                    { name: 'Banyumas', value: randomData() },
                    { name: 'Batang', value: randomData() },
                    { name: 'Brebes', value: randomData() },
                    { name: 'Demak', value: randomData() },
                    { name: 'Jepara', value: randomData() },
                    { name: 'Karanganyar', value: randomData() },
                    { name: 'Kendal', value: randomData() },
                    { name: 'Kota Semarang', value: randomData() },
                    { name: 'Pati', value: randomData() },
                    { name: 'Purwokerto', value: randomData() },
                    { name: 'Salatiga', value: randomData() },
                    { name: 'Sragen', value: randomData() },
                    { name: 'Tegal', value: randomData() },
                    { name: 'Temanggung', value: randomData() },
                    { name: 'Wonogiri', value: randomData() },
                    { name: 'Wonosobo', value: randomData() }
                ]
            }
        ]
    };

    //if MTcheck() {
    myChart.on('click', function(params) {
        window.open("kecamatan", "_self");
    });
    //    };

    myChart.setOption(option);
});
if (option && typeof option === "object") {
    myChart.setOption(option, true);
};