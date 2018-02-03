import request from './api-request';

export interface CouponDefineList {
    couponDefineDTOList: any
}

export interface CouponCreate {
    merchantId: number,
    id?: number,
    couponType: number,
    logoPicUrl?: string,
    effectiveTime?: number,
    validityTime?: number,
    validityType: number,
    validityStartTime?: number,
    validityEndTime?: number,
    marketingMeta?: string,
    remarks?: string,
    useNotice?: string,
    limitAmount?: number,
    realAmount?: number,
    name: string,
    storeIds?: number[],
    isAllStore?: number,
    couponProducts?: string
}

export const CouponApis = {

    CouponDefineList(req: { store_id: number, page_size: number, page_number: number }) {
        return request(
            "kk.h5.market.coupon.define.list.get",
            "1.0",
            {
                store_id: req.store_id,
                page_size: req.page_size,
                page_number: req.page_number
            },
            true
        ).then(data => {
            return data as CouponDefineList;
        });
    },

    ListUseAble(req: { merchantId: number }) {
        return request(
            "kk.h5.merchant.store.list.useable",
            "1.0",
            {
                merchant_id: req.merchantId
            },
            true
        ).then(data => {
            return data;
        })

    },

    CouponDefineCreate(req: CouponCreate) {
        return request(
            "kk.h5.market.coupon.define.create",
            "1.0",
            {
                merchant_id: req.merchantId,
                id: req.id,
                coupon_type: req.couponType,
                logo_pic_url: req.logoPicUrl,
                effective_time: req.effectiveTime,
                validity_time: req.validityTime,
                validity_type: req.validityType,
                validity_start_time: req.validityStartTime,
                validity_end_time: req.validityEndTime,
                marketing_meta: req.marketingMeta,
                remarks: req.remarks,
                useNotice: req.useNotice,
                limit_amount: req.limitAmount,
                real_amount: req.realAmount,
                name: req.name,
                is_all_store: req.isAllStore,
                store_ids: req.storeIds,
                coupon_products: req.couponProducts
            },
            true
        ).then(data => {
            return data;
        })
    }


}

export default CouponApis;