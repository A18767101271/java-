
import { ActivityItem, CouponItem } from './base';
import { MarketingCashierHandler, MarketingCashierHandlerInput, MarketingCashierCalculateOutput } from './cashier-handler';
import { ActivityConverts, CouponConverts } from './converts';


export class MarketingEngine {

    static convertToActivity(input: any): ActivityItem | null {
        if (!input || typeof (input) !== 'object')
            return null;

        var activityItem = new ActivityItem();
        activityItem.data = input;

        try {
            ActivityConverts.forEach(convert => {
                activityItem = convert.ConvertToActivity(input, activityItem);
            });
        } catch (error) {
            console.log(error);
            return null;
        }


        return activityItem;
    }

    static convertToCoupon(input: any): CouponItem | null {
        if (!input || typeof (input) !== 'object')
            return null;

        var couponItem = new CouponItem();
        couponItem.data = input;

        try {
            CouponConverts.forEach(convert => {
                couponItem = convert.ConvertToCoupon(input, couponItem);
            });
        } catch (error) {
            console.log(error);
            return null;
        }


        return couponItem;
    }

    static cashierCalculate(input: MarketingCashierHandlerInput): MarketingCashierCalculateOutput {

        const handler = new MarketingCashierHandler(input);

        return handler.calculate();

    }

}


