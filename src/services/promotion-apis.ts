import request from './api-request';

interface GetPromotionListRequest {
    storeId: number;
    status: number;
    type: number;
    pageNumber: number;
    pageSize: number;
}

interface GetPromotionDetailRequest {
    storeId: number;
    activityId: number;
}


interface GetPromotionInstanceRecord {
    storeId: number;
    activityId: number;
}

export interface PromotionInstanceAdd {
    storeId: number;
    name: string;
    startTime: number;
    endTime: number;
    marketingType: number;
    limitUser?: number;
    marketingMeta?: string;
    meta?: string;
}


interface PromotionInstanceClose {
    storeId: number;
    instanceId: number;
}

export interface PromotionListItemData {
    activityId: number,
    endTime: number,
    marketNum: number,
    name: string,
    startTime: number,
    status: number,
    type: number,
    marktingMap: any
}

export interface GetPromotionListData {
    content: PromotionListItemData[],
    currentPage: number,
    totalElements: number,
    totalPages: number
}

export const PromotionApis = {

    getPromotionList(req: GetPromotionListRequest) {
        return request(
            "kk.h5.merchant.promotion.list.get",
            "1.0",
            {
                store_id: req.storeId,
                status: req.status,
                type: req.type,
                page_number: req.pageNumber,
                page_size: req.pageSize
            },
            true
        ).then(data => {
            return data as GetPromotionListData;
        }).catch(err => {
            //
            throw err;
            //}
        });
    },

    getPromotionDetail(req: GetPromotionDetailRequest) {
        return request(
            "kk.h5.merchant.promotion.detail.get",
            "1.0",
            {
                store_id: req.storeId,
                activity_id: req.activityId
            },
            true
        ).then(data => {
            return data;
        });
    },

    getPromotionInstanceRecord(req: GetPromotionInstanceRecord) {
        return request(
            "kk.h5.merchant.promotion.instance.record",
            "1.0",
            {
                store_id: req.storeId,
                instance_id: req.activityId
            },
            true
        ).then(data => {
            return data;
        }).catch(err => {
            if (err.ret === 'fail.27004') {
                return [];
            } else {
                throw err;
            }
        });
    },

    promotionInstanceAdd(req: PromotionInstanceAdd) {
        return request(
            "kk.h5.merchant.promotion.instance.add",
            "1.0",
            {
                store_id: req.storeId,
                name: req.name,
                start_time: req.startTime,
                end_time: req.endTime,
                marketing_type: req.marketingType,
                limit_user: req.limitUser,
                marketing_meta: req.marketingMeta,
                meta: req.meta
            },
            true
        ).then(data => {
            return data;
        });
    },

    promotionInstanceClose(req: PromotionInstanceClose) {
        return request(
            "kk.h5.merchant.promotion.instance.close",
            "1.0",
            {
                store_id: req.storeId,
                instance_id: req.instanceId
            },
            true
        ).then(data => {
            return data;
        });
    }

}

export default PromotionApis;
