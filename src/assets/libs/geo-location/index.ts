import Container from '../sardine-bridge/container';
import JWeixinBoot from '../jweixi-boot';
import AMapBoot from '../amap-boot';
import CitysData from '../geo-data/data-citys';
import GeoNode from '../geo-data/GeoNode';

interface LocationInfo {
    city: GeoNode,
    address: string,
    latitude: number,
    longitude: number
}

function getCityByCode(cityCode: string): GeoNode | null {

    for (let p of CitysData) {
        if (p.districts) {
            for (let c of p.districts) {
                if (c.citycode == cityCode) {
                    return c;
                }
            }
        }
    }
    return null;
}

function getCityById(cityId: number): GeoNode | null {

    for (let p of CitysData) {
        if (p.districts) {
            for (let c of p.districts) {
                if (c.adcode == cityId) {
                    return c;
                }
            }
        }
    }
    return null;
}

export default {

    getCityByCode: getCityByCode,

    getCityById: getCityById,

    getLocation(): Promise<LocationInfo> {

        return new Promise((resolve, reject) => {
            if (Container.isWechat) {

                JWeixinBoot.ready((wx) => {
                    wx.getLocation({
                        type: 'gcj02',
                        success: function (res) {
                            let latitude = res.latitude;
                            let longitude = res.longitude;
                            AMapBoot.ready((AMap) => { 
                                AMap.plugin('AMap.Geocoder', function () {
                                    const geocoder = new AMap.Geocoder();  
                                    geocoder.getAddress([longitude, latitude], (status, result) => {
                                        if (status == 'complete' && result.info == "OK") { 
                                            let city = getCityByCode(result.regeocode.addressComponent.citycode);  
                                            if (city) { 
                                                resolve({
                                                    city: city,
                                                    address: result.regeocode.formattedAddress,
                                                    latitude: latitude,
                                                    longitude: longitude
                                                });
                                            } else { 
                                                reject();
                                            }
                                        } else { 
                                            reject();
                                        }
                                    })
                                });
                            });
                        }
                    });
                });

            } else {


                AMapBoot.ready((AMap) => {
                    //let AMap = (window as any).AMap;

                    let geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    });

                    geolocation.getCurrentPosition(function (status, result) {

                        if (status === 'complete' && result.info === 'SUCCESS') {

                            //let city = getCityByCode(result.addressComponent.citycode);

                            let city = getCityByCode(result.addressComponent.citycode);
                            if (city) {
                                resolve({
                                    city: city,
                                    address: result.formattedAddress,
                                    latitude: result.position.lat,
                                    longitude: result.position.lng
                                });
                            } else {
                                reject();
                            }

                        } else {

                            reject();

                        }
                    })


                });

            }

        });

    }

}