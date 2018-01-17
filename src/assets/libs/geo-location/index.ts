import AMapBoot from '../amap-boot';
import CitysData from '../geo-data/data-citys';
import GeoNode from '../geo-data/GeoNode';

interface LocationInfo {
    latitude: number;
    longitude: number;
    provinceName: string;
    districtName: string;
    cityName: string;
}

interface AddressInfo {
    city: GeoNode;
    address: string;
}

interface LocationInfo2 {
    latitude: number;
    longitude: number;
}

interface searchResult {
    result: any;
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

    getAddressByLocation(longitude: number, latitude: number): Promise<AddressInfo> {
        return new Promise((resolve, reject) => {
            AMapBoot.ready((AMap) => {
                AMap.plugin('AMap.Geocoder', function () {
                    const geocoder = new AMap.Geocoder();
                    geocoder.getAddress([longitude, latitude], (status, result) => {
                        if (status == 'complete' && result.info == "OK") {
                            let city = getCityByCode(result.regeocode.addressComponent.citycode);
                            if (city) {
                                resolve({
                                    city: city,
                                    address: result.regeocode.formattedAddress
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
        });
    },

    getLocation(): Promise<LocationInfo> {

        return new Promise((resolve, reject) => {

            // if (!options || options.cache !== false) {
            //     const cookieloc = Cookies.get('_geoloc');
            //     if (cookieloc) {
            //         let arr = cookieloc.split(',');
            //         if (arr.length === 2) {
            //             let lng = parseFloat(arr[0]);
            //             let lat = parseFloat(arr[1]);
            //             if (!isNaN(lng) && !isNaN(lng) && lng && lat) {
            //                 resolve({
            //                     latitude: lat,
            //                     longitude: lng
            //                 });
            //                 return;
            //             }
            //         }
            //     }
            // }


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

                        // let cookieExpire = new Date();
                        // cookieExpire.setMinutes(cookieExpire.getMinutes() + 5);
                        // Cookies.set('_geoloc', result.position.lng + ',' + result.position.lat, { expires: cookieExpire });

                        resolve({
                            latitude: result.position.lat,
                            longitude: result.position.lng,
                            provinceName: result.addressComponent.province,
                            cityName: result.addressComponent.city,
                            districtName: result.addressComponent.district
                        });

                    } else {

                        reject();

                    }
                })

            });

        });

    },

    getLocationByAddress(address: string): Promise<LocationInfo2> {
        return new Promise((resolve, reject) => {
            AMapBoot.ready((AMap) => {
                AMap.plugin('AMap.Geocoder', function () {
                    const geocoder = new AMap.Geocoder();
                    geocoder.getLocation(address, (status, result) => {
                        if (status == 'complete' && result.info == "OK") {
                            resolve({
                                latitude: result.geocodes[0].location.lat,
                                longitude: result.geocodes[0].location.lng,
                            });
                        } else {
                            reject();
                        }
                    })
                });
            });
        });
    },

    placeSearch(cityId: number, address: string): Promise<searchResult> {
        return new Promise((resolve, _reject) => {
            AMapBoot.ready((AMap) => {
                AMap.service('AMap.PlaceSearch', function () {

                    const placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                        pageSize: 5,
                        pageIndex: 1,
                        city: cityId, //城市
                        map: AMap,
                    });

                    placeSearch.search(address, function (status, _result) {
                        resolve({
                            result: status
                        });
                    });

                });
            });
        });
    }

}