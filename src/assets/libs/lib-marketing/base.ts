

export class OrderItem {
    productId: number;

    originalUnitPrice: number;

    originalFee: number;

    productNum: number;

    productName: string;

    currentFee: number;

    joinActivity: ActivityItem;

    data?: any;
}


export class LimitTimeItem {
    dayOfWeek: number;
    begin: number;
    end: number;
}

export abstract class MarketingItem {
    abstract unitType: string;

    shopIds?: number[];

    name: string;

    onlyNewUser: boolean;
    onlyShopNewUser: boolean;

    startTime: number;
    endTime: number;

    limitTimes: LimitTimeItem[];

    moduleId?: number;
    moduleMeta?: string;

    data?: any;

}



export class ActivityItem extends MarketingItem {

    static readonly UNIT_TYPE = "ACTIVITY";
    readonly unitType: string = "ACTIVITY";

    activityInstanceId: number;
    activityTypeId: number;

    isShopActivity: boolean;
}

export class CouponItem extends MarketingItem {

    static readonly UNIT_TYPE = "COUPON";
    readonly unitType: string = "COUPON";

    couponId: number;
    faceAmount?: number;
    isShopCoupon: boolean;
    isPlatformCoupon: boolean;
    minUseAmount?: number;
    //rules: string[];
}

export class MarketingUnit {

    unavailableStatus: CheckAvailabilityResult[];
    isAvailable: boolean;

    checkers: AvailabilityChecker[];
    module: MarketingModule;

    constructor(public item: MarketingItem) {

    }

}


export class CheckAvailabilityResult {
    constructor(public checker: string, public success: boolean, public message?: string) { }
}

export class CheckAvailabilityContext {
    checkTime: Date;
    currentShopId: number;
    currentAmount: number;
    constructor() {
        this.checkTime = new Date();
    }
}

export interface AvailabilityChecker {
    name: string;
    isMatchChecker(unitItem: MarketingItem): boolean;
    checkAvailability(unitItem: MarketingItem, context: CheckAvailabilityContext): CheckAvailabilityResult;
}

export class CalculateMarketingResult {
    discountAmount: number;
}

export interface MarketingModule {
    id: number;
    checkAvailability(unitItem: MarketingItem, context: CheckAvailabilityContext): CheckAvailabilityResult;
    calculateMarketing(unitItem: MarketingItem, context: CheckAvailabilityContext): CalculateMarketingResult;
}














