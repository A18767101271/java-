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

export interface GetPagingWithDistance {
    cityId: number,
    districtId?: number,
    lng?: number,
    lat?: number,
    sortType?: "default" | "distance" | "sales" | "consumption",
    page: number,
    pageSize: number,
    categoryId?: number,
    distance?: number,
    minConsumption?: number,
    maxConsumption?: number
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

export interface GetShopDetailData {
    merchantName: string;
    subCategoryName: string;
    consumption?: number;
    latitude: number;
    longitude: number;
    address: string;
    picUrlArray?: string[];
    logoPicUrl?: string;
    is24th: boolean;
    firstCloseTime?: string;
    firstOpenTime?: string;
    secondCloseTime?: string;
    secondOpenTime?: string;
    telephone?: string;
    activityInstanceDTOs?: { id: number; name: string }[];

    advanceBespeakDays?: number;
    advanceBespeakNum?: number;
    bespeakSwitch?: boolean;
}

export interface GetPagingWithDistanceData {
    areaInfo: {
        adcode: string,
        name: string
    }[]
    storeCategoryInfo: {
        id: number,
        name: string,
        subStoreCategory: {
            id: number,
            name: string
        }[]
    }[]
    content: {
        storeId: number,
        subCategoryId: number,
        subCategoryName: string,
        merchantName: string,
        desc: string,
        distance?: number,
        mixConsumption?: number,
        consumption?: number,
        logoPicUrl?: string,
        activityInstanceDTOs?: {
            id: number,
            name: string,
            type: number
        }[]
    }[]
}

export interface GetGroupsWithProductsData {
    productGroups: {
        id: number;
        name: string;
    }[]
    products: {
        id: number;
        logoPicUrl: string;
        name: string;
        customGroupId: number;
        realPrice: number;
    }[]

}


export const StoreApis = {

    getPagingWithDistance(req: GetPagingWithDistance) {
        return request(
            "kk.h5.merchant.store.pagingwithdistance.get",
            "1.0",
            {
                city_code: req.cityId,
                district_code: req.districtId,
                lon: req.lng,
                lat: req.lat,
                sort_type: req.sortType || 'default',
                page: req.page,
                page_size: req.pageSize,
                category_id: req.categoryId,
                distance: req.distance,
                min_consumption: req.minConsumption,
                maxConsumption: req.maxConsumption
            },
            false
        ).then(data => {
            return data as GetPagingWithDistanceData;
        });
    },

    getDetail(req: GetDetailRequest) {
        return request(
            "kk.h5.merchant.store.detail.get",
            "1.0",
            {
                store_id: req.storeId
            },
            false
        ).then(data => {
            return data as GetShopDetailData;
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
            return data as GetGroupsWithProductsData;
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
