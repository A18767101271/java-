import SardineApiClient from '../assets/libs/sardine-api';
import ApiRequestOptions from '../assets/libs/sardine-api/ApiRequestOptions';
import ApiError from '../assets/libs/sardine-api/ApiError';

function checkStatus(request: ApiRequestOptions) {

    return (data: any) => {

        if (typeof data !== 'object') {
            let err: ApiError = {
                ret: 'fail.resp_data_err',
                msg: '返回数据异常',
                resp: data,
                req: request,
                api: request.api,
                v: request.ver
            };
            throw err;
        } else if (data.response && typeof data.response === 'object') {

            if (typeof data.response.success === 'boolean') {

                if (data.response.success) {
                    if (typeof data.response.data === 'object' && !(data.response.data instanceof Array)) {
                        let ret = data.response.data;
                        if (data.requestId)
                            ret._rid = data.requestId;
                        return ret;
                    }
                    else {
                        return data.response.data;
                    }
                } else {
                    let err: ApiError = {
                        ret: 'fail.' + (data.response.code || 'unknow'),
                        msg: data.response.desc || '未知错误',
                        resp: data,
                        req: request,
                        api: request.api,
                        v: request.ver
                    };
                    if (data.requestId)
                        err.rid = data.requestId;

                    throw err;
                }
            } else {
                let ret = data.response;
                if (data.requestId)
                    ret._rid = data.requestId;
                return ret;
            }

        } else {
            let ret = data;
            if (data.requestId)
                ret._rid = data.requestId;
            return ret;
        }

    }

}


export default function request(api: string, ver: string, data?: any, needLogin?: boolean) {

    const req: ApiRequestOptions = {
        api: api,
        ver: ver,
        data: data || {},
        needLogin: needLogin || false
    };

    return new Promise((resolve, reject) => {

        req.success = (_: any, resp: any) => {
            resolve(resp);
        };
        req.error = (error: ApiError, resp?: any) => {
            reject({ error, resp });
        };

        SardineApiClient.request(req);

    }).then(checkStatus(req));

}
