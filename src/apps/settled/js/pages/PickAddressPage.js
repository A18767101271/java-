import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import AMapLoader from '../../../../assets/libs/AMapLoader.js';
import geoData from '../../../../assets/libs/geo-data-areas';
import bridge from '../../../../assets/libs/sardine-bridge';



let map = null;


function showHtml(data) {
    console.log(data);

    var item = data.data;
    var proName, disName, cityName, addressName;

    geoData.forEach(function (province) {
        if (province.adcode == item.provinceId) {
            proName = province.name;
            province.districts.forEach(function (city) {
                if (city.adcode == item.cityId) {
                    cityName = city.fullname;
                    city.districts.forEach(function (dis) {
                        if (dis.adcode == item.districtId) {
                            disName = dis.name;
                        }
                    })
                }
            });
        }
    });

    addressName = proName + ' ' + cityName + ' ' + disName;

    var h = "";
    h += `<div id="container" class="map" tabindex="0">
          <div class="flow-input">
          <div class="input-1"><h1>店铺区域</h1><span class="input-area">` + addressName + `</span></div>
          <div class="input-2"><h1>详细地址</h1><input type="text" class="input-address" placeholder="请填写详情地址，如街道名称，门牌号等"></div>
          </div>
          </div>`;

    $('.wrap').append(h);

    $('.btn').on('click', function () {
        window.history.go(-1);
    })

    $('.input-address').blur(function () {
        geocoder($(this).val());
    })

    function geocoder(address) {
        if (!map)
            return;
        var geocoder = new AMap.Geocoder({
            city: data.data.cityId,
            radius: 1000 //范围，默认：500
        });
        //地理编码,返回地理编码结果
        geocoder.getLocation(address, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                var add_lng = result.geocodes[0].location.lng;
                var add_lat = result.geocodes[0].location.lat;
                map.setZoomAndCenter(16, [add_lng, add_lat]);
                PageExtends.location = add_lng + ',' + add_lat;
            }
        });
    }
}

export default {
    name: 'pickaddress',
    render: function () {

        bridge.ready(() => {
            bridge.setOptionMenu({
                buttons: [{
                    text: '确定'
                }]
            });
            bridge.onOptionMenuClick((data) => {
                PageExtends.address = $('.input-area').text() + $('.input-address').val();
                PageExtends.store_location = PageExtends.location;
                window.history.go(-1);
            });
        })

        var obj = {};
        obj.success = function (data) {
            showHtml(data);

            AMapLoader.ready(() => {

                map = new AMap.Map('container', {
                    zoom: 16,
                    scrollWheel: false,
                    resizeEnale: true,
                })

                AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {

                    var positionPicker = new PositionPicker({
                        mode: 'dragMap',
                        map: map
                    });

                    positionPicker.on('success', function (positionResult) {
                        PageExtends.store_location = positionResult.position.lng + ',' + positionResult.position.lat;
                    });

                    positionPicker.on('fail', function (positionResult) {});

                    var onModeChange = function (e) {
                        positionPicker.setMode(e.target.value)
                    }

                    positionPicker.start();

                });

            });
        }
        obj.error = function (data) {};
        PageExtends.API.storeFormSingleGet(obj);




    }

}