import ApiRequest from './ApiRequest';

export default interface ApiError {
    ret: string;
    msg: string;
    api: string;
    v: string;
    rid?: string;
    resp?: any;
    req: ApiRequest;
}