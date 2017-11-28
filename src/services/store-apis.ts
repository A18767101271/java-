import request from './api-request';

interface GetDetailRequest {
    storeId: number,
}

interface GetGroupsWithProductsRequest {
    storeId: number,
    pageNumber: number,
    pageSize: number,
    state?: number,
    isSoldOut?: boolean,
    isRecommend?: boolean,
    customGroupId?: number,
    isDiscount?: boolean,
}

interface GetDetailWithProducts {
    storeId: number,
    tableId?: number
}

export interface GetDetailWithProductsData {
    storeId: number,
    merchantName: string,
    merchantDescription: string,
    logoPicUrl: string,
    productGroups?: Array<{
        id: number,
        name: string,
        isDeleted?: boolean
    }>,
    products?: Array<{
        name: string,
        id: number,
        customGroupId: number,
        isDiscount: boolean,
        isRecommend: boolean,
        isSetMeal: boolean,
        isSoldOut: boolean,
        unit: string,
        realPrice: number,
        price?: number,
        isDeleted?: boolean,
        state?: number,
        description?: string,
        logoPicUrl?: string
    }>,
}

export const StoreApis = {

    getDetail(req: GetDetailRequest) {
        return request(
            "kk.h5.merchant.store.detail.get",
            "1.0",
            {
                store_id: req.storeId
            },
            false
        ).then(data => {
            return data;
        });
    },

    getGroupsWithProducts(req: GetGroupsWithProductsRequest) {

        return request(
            "kk.h5.merchant.store.groupswithproducts",
            "1.0",
            {
                store_id: req.storeId,
                page_number: req.pageNumber,
                page_size: req.pageSize,
                state: req.state,
                is_sold_out: req.isSoldOut,
                is_recommend: req.isRecommend,
                custom_group_id: req.customGroupId,
                is_discount: req.isDiscount,
            },
            true
        ).then(data => {
            return data;
        });

    },

    getDetailWithProducts(req: GetDetailWithProducts) {

        return request(
            "kk.h5.merchant.store.detailwithproducts.get",
            "1.0",
            {
                store_id: req.storeId
            },
            true
        ).then(data => {
            return data as GetDetailWithProductsData;
        });

    }


}

export default StoreApis;
