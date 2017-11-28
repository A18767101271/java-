import '../../../assets/libs/lib-gateway.js';


var extObj = {
    append: function () {
        var $appElmt = $('#app');
        $appElmt.append.apply($appElmt, arguments);
    },

    getStoreId: function () {
        return 1;
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