import request from './api-request';


export interface GetSimpleinfoDetailsData {
    birthdaystamp?: number,

    score: number,
    balance: number,


    nickName: string,

    sex?: number,
    mobile?: string,

    iconUrl: string,

    phoneConfirmed: boolean,
    username: string
}

export interface GetSimpleInfoData {
    accountId: number;
    nickName: string;
    phoneConfirmed: boolean;
}

export const AccountApis = {

    newBindMobile(req: { mobile: string, code: string }) {
        return request(
            "kk.h5.account.mobile.bind",
            "1.0",
            {
                mobile: req.mobile,
                vercode: req.code
            },
            true
        ).then(data => {
            return data;
        });
    },

    sendNewMobileVercode(req: { mobile: string }) {
        return request(
            "kk.h5.account.mobile.bind.vercode.send",
            "1.0",
            {
                mobile: req.mobile
            },
            true
        ).then(data => {
            return data;
        });
    },

    getSimpleInfo() {
        return request(
            "kk.h5.account.simpleinfo.get",
            "1.0",
            {},
            true
        ).then(data => {
            return data as GetSimpleInfoData;
        });
    },

    getSimpleinfoDetails() {
        return request(
            "kk.h5.account.simpleinfodetails.get",
            "1.0",
            {},
            true
        ).then(data => {
            return data as GetSimpleinfoDetailsData;
        });
    }
}

export default AccountApis;