import request from './api-request';

export interface CouponDefineList {
    couponDefineDTOList: any
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


}

export default CouponApis;