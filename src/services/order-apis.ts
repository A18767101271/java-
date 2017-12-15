import request from './api-request';

export interface DirectPayPreviewData {
    storeId: number;
    storeName: string;
    storePic: string;
    tableId: number;
    tableName: string;
    isStoreNewUser: boolean;
    isPlatformNewUser: boolean;
    isBindMobile: boolean;
    activitys: Array<any>;
    merchantCoupons: Array<any>;
    platformCoupons: Array<any>;
    balance: number;
    point: number;
}

export interface DirectPayPreviewRequest {
    storeId: number;
    tableId?: number;
}

export interface OrderCreateCoupon {
    couponId: number;
    discountAmount: number;
}
export interface OrderCreateActivity {
    activityId: number;
    discountAmount: number;
}

export interface OrderCreateRequest {
    storeId: number;
    tableId?: number;
    totalAmount: number;
    noDiscountAmount: number;
    realTotalAmount: number;
    point: number;
    balance: number;
    payChannel: number;
    orderType: number;
    coupons: OrderCreateCoupon[];
    activitys: OrderCreateActivity[];
}

export interface GetOrderListData {
    currentPage: number;
    totalElements: number;
    totalPages: number;
    content: {
        id: number;
        title?: string;
        totalAmount: number;
        realTotalAmount: number;
        payTime: number;
        closeTime: number;
        payStatus: number;
        createTime: number;
        orderPicUrl?: string;
    }[]
}

export const OrderApis = {
    getOrderList(req: { page: number, pageSize: number }) {
        return request(
            "kk.h5.account.simpleinfo.getorderlist",
            "1.0",
            {
                page: req.page,
                page_size: req.pageSize
            },
            true
        ).then(data => {
            return data as GetOrderListData;
        });
    },
    directPayPreview(req: DirectPayPreviewRequest) {
        return request(
            "kk.h5.order.directpay.preview",
            "1.0",
            {
                store_id: req.storeId,
                table_id: req.tableId
            },
            true
        ).then(data => {
            return data as DirectPayPreviewData;
        });
    },
    orderCreate(req: OrderCreateRequest) {
        return request(
            "kk.h5.order.create",
            "1.0",
            {
                store_id: req.storeId,
                table_id: req.tableId,
                total_amount: req.totalAmount,
                real_total_amount: req.realTotalAmount,
                no_discount_amount: req.noDiscountAmount,
                point: req.point,
                balance: req.balance,
                pay_channel: req.payChannel,
                order_type: req.orderType,
                coupons: JSON.stringify(req.coupons || []),
                activitys: JSON.stringify(req.activitys || [])
            },
            true
        ).then(data => {
            return data;
        });
    }

}

export default OrderApis


