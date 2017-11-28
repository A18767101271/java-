import {
    ActivityItem,
    CouponItem,
    MarketingUnit,
    MarketingModule,
    CheckAvailabilityContext,
    CheckAvailabilityResult,
    OrderItem,
    CalculateMarketingResult
} from './base';
import { MarketingUnitAdapter } from './unit-adapter';

export class ActivitiesOptionItem {
    calculateMarketingResult: CalculateMarketingResult;
    constructor(public activity: ActivityItem) { }
}

export class ActivitiesOption {
    items: ActivitiesOptionItem[];
    calculateMarketingResult: CalculateMarketingResult;
}

export class CouponOption {
    constructor(public coupon: CouponItem) { }
    calculateMarketingResult: CalculateMarketingResult;
}

export class MarketingCashierCalculateOutput {

    beforeAmount: number;

    availableActivities: ActivityItem[];

    unavailableActivities: ActivityItem[];

    availablePlatformCoupons: CouponItem[];

    unavailablePlatformCoupons: CouponItem[];

    availableShopCoupons: CouponItem[];

    unavailableShopCoupons: CouponItem[];

    availableActivitiesOptions: ActivitiesOption[];

    availablePlatformCouponOptions: CouponOption[];
    availableShopCouponOptions: CouponOption[];

    constructor(public input: MarketingCashierHandlerInput) { }
}

export interface MarketingCashierHandlerInput {
    originalAmount: number;
    noDiscountAmount: number;
    activities: ActivityItem[];
    platformCoupons: CouponItem[];
    shopCoupons: CouponItem[];
    shopId: number;
    isNewUser: boolean;
    isNewShopUser: boolean;
    isBindMobile: boolean;
    orderItems: OrderItem[];
}


function checkUnitAvailability(item: MarketingUnit, context: CheckAvailabilityContext): boolean {

    var unavailableStatus = new Array<CheckAvailabilityResult>();

    for (var i in item.checkers) {
        const ret = item.checkers[i].checkAvailability(item.item, context);
        if (!ret.success) {
            unavailableStatus.push(ret);
        }
    }

    if (unavailableStatus.length > 0) {
        (item.item as any).unavailableStatus = unavailableStatus;
        item.isAvailable = false;
        item.unavailableStatus = unavailableStatus;

    }
    else {

        delete (item.item as any).unavailableStatus;

        item.isAvailable = true;
        item.unavailableStatus = [];

    }

    return item.isAvailable;
}

export class MarketingCashierHandler {

    modules: MarketingModule[];
    activities: MarketingUnit[];
    coupons: MarketingUnit[];

    input: MarketingCashierHandlerInput;
    calculateOutput: MarketingCashierCalculateOutput;

    constructor(input: MarketingCashierHandlerInput) {
        if (!input) {
            throw Error("input is null");
        }
        this.input = input;

        this.modules = [];
        this.activities = [];
        this.coupons = [];

        if (input.activities) {
            this.activities = input.activities.map(p => { return new MarketingUnit(p); });
        }

        const coupons = ([] as Array<CouponItem>).concat(input.platformCoupons, input.shopCoupons);

        if (coupons) {
            this.coupons = coupons.map(p => { return new MarketingUnit(p); });
        }

        var adapter = new MarketingUnitAdapter();

        this.activities.concat(this.coupons).forEach(item => {
            adapter.fill(item);
        });

    }

    setAmount(originalAmount: number, noDiscountAmount?: number) {
        var amount = originalAmount - (noDiscountAmount || 0);
        if (originalAmount < 0 || amount > originalAmount) {
            throw Error("invalid amount");
        }
        this.input.noDiscountAmount = (noDiscountAmount || 0);
        this.input.originalAmount = originalAmount;
    }

    calculate(): MarketingCashierCalculateOutput {

        const result = new MarketingCashierCalculateOutput(this.input);

        this.input.originalAmount || (this.input.originalAmount = 0);
        this.input.noDiscountAmount || (this.input.noDiscountAmount = 0);

        var amount = this.input.originalAmount - (this.input.noDiscountAmount || 0);
        if (this.input.originalAmount < 0 || amount > this.input.originalAmount || amount < 0) {
            throw Error("invalid amount");
        }
        if (this.input.shopId < 1) {
            throw Error("invalid shopid");
        }

        result.beforeAmount = amount;

        var context = new CheckAvailabilityContext();
        context.currentShopId = this.input.shopId;
        context.currentAmount = result.beforeAmount;


        result.availableActivities = [];
        result.unavailableActivities = [];


        var availableActivities: MarketingUnit[] = [];

        for (let i in this.activities) {
            let item = this.activities[i];

            if (checkUnitAvailability(item, context)) {
                availableActivities.push(item);
                result.availableActivities.push(item.item as ActivityItem);
            } else {
                result.unavailableActivities.push(item.item as ActivityItem);
            }

        }

        if (result.availableActivities.length > 0) {

            function findMutexIndex(items: ActivityItem[], currIndex: number): number {

                if ((items[currIndex].moduleId || 0) > 0) {
                    for (let i: number = currIndex + 1; i < items.length; i++) {
                        if (items[i].moduleId == items[currIndex].moduleId)
                            return i;
                    }
                }

                return -1;
            }

            let mutexTree = { activities: result.availableActivities };

            function makeMutexTreeNode(node: any) {

                for (let i: number = 0; i < node.activities.length - 1; i++) {

                    let mutexIndex = findMutexIndex(node.activities, i);

                    if (mutexIndex > i) {

                        node.left = { activities: node.activities.slice(i, mutexIndex).concat(mutexIndex < (node.activities.length - 1) ? node.activities.slice(mutexIndex + 1) : []) };

                        if (i < node.activities.length - 1) {
                            node.right = { activities: node.activities.slice(i + 1) };
                        }

                        node.activities = node.activities.slice(0, i);

                        makeMutexTreeNode(node.left);

                        if (node.right) {
                            makeMutexTreeNode(node.right);
                        }

                    }

                }


            }

            makeMutexTreeNode(mutexTree);

            var paths: Array<Array<ActivityItem>> = [[]];

            function dfsTree(node: any, paths: Array<Array<ActivityItem>>, pathItem: Array<ActivityItem>) {

                if (node.activities && node.activities.length > 0) {
                    (node.activities as Array<ActivityItem>).forEach(item => {
                        pathItem.push(item);
                    });
                }

                var newItem = pathItem.slice(0);

                if (node.left) {
                    dfsTree(node.left, paths, pathItem);
                }
                if (node.right) {
                    paths.push(newItem);
                    dfsTree(node.right, paths, newItem);
                }
            }

            dfsTree(mutexTree, paths, paths[0]);

            if (paths.length > 1) {
                for (let i = 0; i < paths.length - 1; i++) {
                    let p1 = paths[i];
                    if (p1.length === 0) {
                        continue;
                    }

                    for (let j = i + 1; j < paths.length; j++) {
                        let p2 = paths[j];

                        if (p1.length !== p2.length) {
                            continue;
                        }

                        let isequal = true;

                        for (let idx1 in p1) {
                            let i1 = p1[idx1];
                            let match = p2.find(i2 => i1.activityInstanceId === i2.activityInstanceId);
                            if (!match) {
                                isequal = false;
                                break;
                            }
                        }

                        if (isequal) {
                            paths.splice(j, 1);
                        }

                    }
                }
            }

            let availableActivitiesOptions = new Array<ActivitiesOption>();

            paths.forEach(item => {
                var option1 = new ActivitiesOption();
                option1.items = item.map(ni => { return new ActivitiesOptionItem(ni); });
                option1.calculateMarketingResult = new CalculateMarketingResult();
                option1.items.forEach(item => {
                    let unit = availableActivities.find(p => (p.item as ActivityItem).activityInstanceId == item.activity.activityInstanceId);
                    if (!unit) return;
                    let ret = unit.module.calculateMarketing(unit.item, context);
                    item.calculateMarketingResult = ret;
                    if (ret.discountAmount > 0) {

                        option1.calculateMarketingResult.discountAmount || (option1.calculateMarketingResult.discountAmount = 0);
                        option1.calculateMarketingResult.discountAmount += ret.discountAmount;

                    }

                });

                availableActivitiesOptions.push(option1);
            });

            result.availableActivitiesOptions = availableActivitiesOptions.sort((a, b) => { return (b.calculateMarketingResult.discountAmount - a.calculateMarketingResult.discountAmount) * 100 + (b.items.length - a.items.length) });
        }

        result.availablePlatformCoupons = [];
        result.unavailablePlatformCoupons = [];
        result.availableShopCouponOptions = [];
        result.availableShopCoupons = [];
        result.unavailableShopCoupons = [];
        result.availablePlatformCouponOptions = [];

        for (var i in this.coupons) {
            var item = this.coupons[i];
            const isShopCoupon = (item.item as CouponItem).isShopCoupon;
            if (checkUnitAvailability(item, context)) {

                var option1 = new CouponOption(item.item as CouponItem);
                let ret = item.module.calculateMarketing(item.item, context);
                option1.calculateMarketingResult = ret;
                if (isShopCoupon) {
                    result.availableShopCouponOptions.push(option1);
                    result.availableShopCoupons.push(item.item as CouponItem);
                } else {
                    result.availablePlatformCouponOptions.push(option1);
                    result.availablePlatformCoupons.push(item.item as CouponItem);
                }


            } else {
                if (isShopCoupon) {
                    result.unavailableShopCoupons.push(item.item as CouponItem);
                } else {
                    result.unavailablePlatformCoupons.push(item.item as CouponItem);
                }
            }
        }

        result.availableShopCouponOptions = result.availableShopCouponOptions.sort((a, b) => { return (b.calculateMarketingResult.discountAmount - a.calculateMarketingResult.discountAmount) });
        result.availablePlatformCouponOptions = result.availablePlatformCouponOptions.sort((a, b) => { return (b.calculateMarketingResult.discountAmount - a.calculateMarketingResult.discountAmount) });


        this.calculateOutput = result;
        return result;
    }
}
