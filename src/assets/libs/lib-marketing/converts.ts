import {
    ActivityItem,
    CouponItem,
    MarketingItem
} from './base';

export interface ActivityItemConverter {
    ConvertToActivity(input: any, originalItem: ActivityItem): ActivityItem;
}

export interface CouponItemConverter {
    ConvertToCoupon(input: any, originalItem: CouponItem): CouponItem;
}

export class CouponDefaultConverter implements CouponItemConverter {
    ConvertToCoupon(item: any, item1: CouponItem): CouponItem {

        item1.data = item;
        item1.couponId = item.couponInstanceId;
        item1.isShopCoupon = item.owner == 2;
        item1.isPlatformCoupon = item.owner == 1;
        item1.moduleId = item.marketingType;
        item1.moduleMeta = item.marketingMeta;
        item1.startTime = item.startDate;
        item1.endTime = item.endDate;
        item1.name = item.name;

 
        if (item.marketingType == 1) {
            try {
                const meta = JSON.parse(item.marketingMeta);
                item1.faceAmount = meta.discountAmount;
                item1.minUseAmount = meta.fullAmount;
            } catch   {

            }

        }

        return item1;
    }
}

export class MarketingLimitConverter implements ActivityItemConverter, CouponItemConverter {
    ConvertToCoupon(item: any, item1: CouponItem): CouponItem {
        this.DoConvert(item, item1);
        return item1;
    }
    ConvertToActivity(item: any, item1: ActivityItem): ActivityItem {
        this.DoConvert(item, item1);
        return item1;
    }

    DoConvert(item: any, item1: MarketingItem) {

        if (item.limit) {
            var lmt = JSON.parse(item.limit);

            if (lmt.stores && lmt.stores.length > 0) {
                let shopIds: Array<number> = [];
                (lmt.stores as Array<any>).forEach(stid => {
                    shopIds.push(parseInt(stid));
                });
                item1.shopIds = shopIds;
            }

            item1.onlyShopNewUser = !!lmt.newsuser;
            item1.onlyNewUser = !!lmt.newpuser;

        }
    }
}

export class ActivityDefaultConverter implements ActivityItemConverter {
    ConvertToActivity(item: any, item1: ActivityItem): ActivityItem {

        item1.activityInstanceId = item.activityId;
        item1.activityTypeId = item.activityDefinitionId;
        item1.isShopActivity = item.owner == 2;
        item1.startTime = item.startTime;
        item1.endTime = item.endTime;
        item1.moduleId = item.marketingType;
        item1.moduleMeta = item.marketingMeta;
        item1.name = item.name;

        if (item.meta) {
            var lts = JSON.parse(item.meta);
            item1.limitTimes = [];
            for (var filed in lts) {
                (lts[filed] as Array<any>).forEach(lti => {
                    var lt = {
                        dayOfWeek: parseInt(filed),
                        begin: (lti.minn.h * 10000) + (lti.minn.m * 100) + lti.minn.s,
                        end: (lti.maxx.h * 10000) + (lti.maxx.m * 100) + lti.maxx.s,
                    };
                    item1.limitTimes.push(lt);
                });

            }
        }


        return item1;
    }
}

export const ActivityConverts: ActivityItemConverter[] = [
    new MarketingLimitConverter(),
    new ActivityDefaultConverter()
];

export const CouponConverts: CouponItemConverter[] = [

    new MarketingLimitConverter(),
    new CouponDefaultConverter()

];