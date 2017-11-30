import '../../../assets/libs/lib-gateway.js';


var extObj = {
    append: function () {
        var $appElmt = $('#app');
        $appElmt.append.apply($appElmt, arguments);
    },

    getStoreId: function () {
        return 1;
    },
    gwRequest: function (data, optimization) {
        var ds = data;
        if (optimization) {
            var success = data.success || function () {};
            var error = data.error || function () {};
            data.success = function (d, data) {
                if (data.response && typeof data.response == 'object' && typeof data.response.success == 'boolean') {
                    if (data.response.success) {
                        success(data.response.data || {}, data);
                    } else {
                        var res = {
                            ret: 'fail.' + (data.response.code || 'unknow'),
                            msg: data.response.desc || '未知错误',
                            api: ds.api,
                            v: ds.ver
                        };
                        if (data.requestId)
                            res.rid = data.requestId;
                        error(res, data);
                    }

                } else {
                    success(data.response || {}, data);
                }
            };
        }
        lib.gw.request(data);
    },
    API: {

        storeFormSingleGet: function (obj) {
            var success = obj.success;
            var error = obj.error;

            extObj.gwRequest({
                api: 'kk.h5.store.form.single.get',
                data: {},
                ver: '1.0',
                needLogin: true,
                success: function (data, data2) {

                    success && success(data);
                },
                error: function (res, data) {
                    error && error(res, data)
                }
            });
        },

        storeFormListGet: function (obj) {
            var page_number = obj.page_number;
            var page_size = obj.page_size;
            var start = obj.start;
            var end = obj.end;
            var success = obj.success;
            var error = obj.error;

            extObj.gwRequest({
                api: 'kk.h5.store.form.list.get',
                data: {
                    page_number: page_number,
                    page_size: page_size,
                    start: start,
                    end: end
                },
                ver: '1.0',
                needLogin: true,
                success: function (data, data2) {
                    success && success(data);
                },
                error: function (res, data) {
                    error && error(res, data)
                }
            });
        },

        storeFormSettledCreate: function (obj) {
            var shop_name = obj.shop_name;
            var category_id = obj.category_id;
            var category_name = obj.category_name;
            var sub_category_id = obj.sub_category_id;
            var sub_category_name = obj.sub_category_name;
            var province_id = obj.province_id;
            var city_id = obj.city_id;
            var district_id = obj.district_id;
            var client_location = obj.client_location;
            var is_sign_agreement = obj.is_sign_agreement;
            var success = obj.success;
            var error = obj.error;

            extObj.gwRequest({
                api: 'kk.h5.store.form.settled.create',
                data: {
                    shop_name: shop_name,
                    category_id: category_id,
                    category_name: category_name,
                    sub_category_id: sub_category_id,
                    sub_category_name: sub_category_name,
                    province_id: province_id,
                    city_id: city_id,
                    district_id: district_id,
                    client_location: client_location,
                    is_sign_agreement: is_sign_agreement
                },
                ver: '1.0',
                success: function (data, data2) {
                    console.log(data2);
                    success && success(data);
                },
                error: function (res, data) {
                    error && error(res, data)
                }
            });
        },

        storeFormIntroductionSave: function (obj) {
            var form_id = obj.form_id;
            var shop_name = obj.shop_name;
            var category_id = obj.category_id;
            var category_name = obj.category_name;
            var sub_category_id = obj.sub_category_id;
            var sub_category_name = obj.sub_category_name;
            var province_id = obj.province_id;
            var city_id = obj.city_id;
            var district_id = obj.district_id;
            var success = obj.success;
            var error = obj.error;

            extObj.gwRequest({
                api: 'kk.h5.store.form.introduction.save',
                data: {
                    form_id: form_id,
                    shop_name: shop_name,
                    category_id: category_id,
                    category_name: category_name,
                    sub_category_id: sub_category_id,
                    sub_category_name: sub_category_name,
                    province_id: province_id,
                    city_id: city_id,
                    district_id: district_id,
                },
                ver: '1.0',
                success: function (data, data2) {
                    success && success(data);
                },
                error: function (res, data) {
                    error && error(res, data)
                }
            });
        },

        storeFormBaseSave: function (obj) {
            var form_id = obj.form_id;
            var telephone = obj.telephone;
            var address = obj.address;
            var store_location = obj.store_location;
            var first_business_time = obj.first_business_time;
            var second_business_time = obj.second_business_time;
            var is_open_all_hours = obj.is_open_all_hours;
            var business_model = obj.business_model;
            var resource_count = obj.resource_count;
            var resource_uids = obj.resource_uids;

            var success = obj.success;
            var error = obj.error;

            extObj.gwRequest({
                api: 'kk.h5.store.form.base.save',
                data: {
                    form_id: form_id,
                    telephone: telephone,
                    address: address,
                    store_location: store_location,
                    first_business_time: first_business_time,
                    second_business_time: second_business_time,
                    is_open_all_hours: is_open_all_hours,
                    business_model: business_model,
                    resource_count: resource_count,
                    resource_uids: resource_uids,
                },
                ver: '1.0',
                success: function (data, data2) {

                    success && success(data);
                },
                error: function (res, data) {
                    error && error(res, data)
                }
            });
        },
        storeFormCredentialsSave: function (obj) {
            var form_id = obj.form_id;
            var id_card_name = obj.id_card_name;
            var id_card_no = obj.id_card_no;
            var resource_count = obj.resource_count;
            var resource_uids = obj.resource_uids;
            var business_licence_name = obj.business_licence_name;
            var business_licence_no = obj.business_licence_no;
            var id_card_type = obj.id_card_type;
            var id_card_expiry = obj.id_card_expiry;

            var success = obj.success;
            var error = obj.error;

            extObj.gwRequest({
                api: 'kk.h5.store.form.credentials.save',
                data: {
                    form_id: form_id,
                    id_card_name: id_card_name,
                    id_card_no: id_card_no,
                    resource_count: resource_count,
                    resource_uids: resource_uids,
                    business_licence_name: business_licence_name,
                    business_licence_no: business_licence_no,
                    id_card_type: id_card_type,
                    id_card_expiry: id_card_expiry
                },
                ver: '1.0',
                success: function (data, data2) {

                    success && success(data);
                },
                error: function (res, data) {
                    error && error(res, data)
                }
            });
        },

        storeFormApprovalSubmit: function (obj) {
            var form_id = obj.form_id;
            var success = obj.success;
            var error = obj.error;

            extObj.gwRequest({
                api: 'kk.h5.store.form.approval.submit',
                data: {
                    form_id: form_id
                },
                ver: '1.0',
                success: function (data, data2) {

                    success && success(data);
                },
                error: function (res, data) {
                    error && error(res, data)
                }
            });
        }

    },

    loadUserInfo: (function (callback) {

        var userInfo = null;

        return function (callback) {

            if (userInfo) {

                callback(userInfo);
                return;
            }


            lib.gw.getUserInfo(function (data) {

                userInfo = data;
                callback(userInfo);
                return;
            });
        };

    })(),

};

export default extObj;