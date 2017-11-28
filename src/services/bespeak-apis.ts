import request from './api-request';

interface BespeakCreateRequest {
    storeId: number;
    //var store_name = obj.store_name;
    dinnerNum: number;
    needRoom: boolean;
    bookerName: string;
    bookerPhone: string;
    dinnerTime: number;
    remarks?: string;

}

interface GetBespeakGetByIdRequest {
    bespeakId: number;
}

interface BespeakCancelRequest {
    bespeakId: number;
}

export const BespeakApis = {

    bespeakCreate(req: BespeakCreateRequest) {
        return request(
            "kk.h5.repast.bespeak.create",
            "1.0",
            {
                store_id: req.storeId,
                store_name: req.bookerName,
                dinner_num: req.dinnerNum,
                need_room: req.needRoom ? 1 : 0,
                booker_name: req.bookerName,
                booker_phone: req.bookerPhone,
                dinner_time: req.dinnerTime,
                remarks: req.remarks
            },
            true
        ).then(data => {
            return data;
        });
    },

    getBespeakRecents() {
        return request(
            "kk.h5.repast.bespeak.recent.get",
            "1.0",
            {
            },
            true
        ).then(data => {
            return data;
        });
    },

    getBespeakGetById(req: GetBespeakGetByIdRequest) {
        return request(
            "kk.h5.repast.bespeak.get.by.id",
            "1.0",
            {
                bespeak_id: req.bespeakId
            },
            true
        ).then(data => {
            return data;
        });
    },

    bespeakCancel(req: BespeakCancelRequest) {
        return request(
            "kk.h5.repast.bespeak.cancel",
            "1.0",
            {
                bespeak_id: req.bespeakId
            },
            true
        ).then(data => {
            return data;
        });
    },

}



export default BespeakApis;
