import request from './api-request';

interface GetDishesAndItemsRequest {
    storeId: number,
    repastId: number,
}

export interface GetDishesAndItemsData {
    id: number,
    state: number,
    items: Array<{
        id: number,
        num: number,
        price: number,
        produtName: string,
        totalItemAmount: number,
        productId: number
    }>
}

interface GetDishesItemsRequest {
    storeId: number,
    repastId: number,
    dishesId: number
}

interface GetDishesRequest {
    storeId: number,
    repastId?: number,
    tableId: number,
}

export interface GetDishesData {
    repastId: number,
    seatName: string,
    orderDishesId: number
}

export const RepastApis = {
    getDishesItems(req: GetDishesItemsRequest) {
        return request(
            "kk.h5.repast.orderdishes.items.get",
            "1.0",
            {
                order_dishes_id: req.dishesId,
                store_id: req.storeId,
                repast_id: req.repastId
            },
            true
        ).then(data => {
            return data;
        });
    },
    getDishesAndItems(req: GetDishesAndItemsRequest) {
        return request(
            "kk.h5.repast.orderdishes.and.item.get",
            "1.0",
            {
                store_id: req.storeId,
                repast_id: req.repastId
            },
            true
        ).then(data => {
            return data as GetDishesAndItemsData[];
        });
    },

    getDishes(req: GetDishesRequest) {
        return request(
            "kk.h5.repast.orderdishes.get",
            "1.0",
            {
                store_id: req.storeId,
                repast_id: req.repastId,
                table_id: req.tableId
            },
            true
        ).then(data => {
            return data as GetDishesData;
        });
    }

}

export default RepastApis;