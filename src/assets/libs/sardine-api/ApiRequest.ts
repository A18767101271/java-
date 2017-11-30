 
export default interface ApiRequest {
    api: string;
    ver: string;
    data?: any;
    needLogin?: boolean;
}