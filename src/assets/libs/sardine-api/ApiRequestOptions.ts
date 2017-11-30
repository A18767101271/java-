import ApiRequest from './ApiRequest';
import ApiError from './ApiError';

export default interface ApiRequestOptions extends ApiRequest {

    success?: (data: any, resp: any) => void;
    error?: (errorData: ApiError, resp?: any) => void;
}