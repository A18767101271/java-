import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import AMapLoader from '../../../../assets/libs/AMapLoader.js';
import geoData from '../../../../assets/libs/geo-data-areas';

function showHtml() {

    // var proName, cityName, disName;

    // if (PageExtends.province_id && PageExtends.city_id && PageExtends.district_id) {
    //     geoData.forEach(function (province) {
    //         if (province.adcode == PageExtends.province_id) {
    //             proName = province.name;
    //             province.districts.forEach(function (city) {
    //                 if (city.adcode == PageExtends.city_id) {
    //                     cityName = city.fullname;
    //                     city.districts.forEach(function (dis) {
    //                         if (dis.adcode == PageExtends.district_id) {
    //                             disName = dis.name;
    //                         }
    //                     })
    //                 }
    //             });
    //         }
    //     });
    // } else {
    //     var item = PageExtends.Info;
    //     geoData.forEach(function (province) {
    //         if (province.adcode == PageExtends.province_id) {
    //             proName = province.name;
    //             province.districts.forEach(function (city) {
    //                 if (city.adcode == PageExtends.city_id) {
    //                     cityName = city.fullname;
    //                     city.districts.forEach(function (dis) {
    //                         if (dis.adcode == PageExtends.district_id) {
    //                             disName = dis.name;
    //                         }
    //                     })
    //                 }
    //             });
    //         }
    //     });
    // }




    var h = "";
    h += `<div id="container" class="map" tabindex="0"><span class="btn">确定</span></div>`;
    $('.wrap').append(h);

    $('.btn').on('click', function () {
        window.history.go(-1);
    })
}


export default {
    name: 'pickaddress',
    render: function () {
        showHtml();

        AMapLoader.ready(() => {

            AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {

                var map = new AMap.Map('container', {
                    zoom: 16,
                    scrollWheel: false
                })
                var positionPicker = new PositionPicker({
                    mode: 'dragMap',
                    map: map
                });

                positionPicker.on('success', function (positionResult) {
                    PageExtends.store_location = positionResult.position.lng + ',' + positionResult.position.lat;
                    PageExtends.pickAddress = positionResult.address;
                });
                positionPicker.on('fail', function (positionResult) {

                });
                var onModeChange = function (e) {
                    positionPicker.setMode(e.target.value)
                }

                positionPicker.start();
                map.panBy(0, 1);

                map.addControl(new AMap.ToolBar({
                    liteStyle: true
                }))
            });

        });


    }

}