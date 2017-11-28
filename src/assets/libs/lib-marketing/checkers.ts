
import {
    MarketingItem,
    AvailabilityChecker,
    CheckAvailabilityResult,
    CheckAvailabilityContext
} from './base';
import { Modules } from './modules';

export class ShopIdChecker implements AvailabilityChecker {
    name: string = "SHOP_ID_CHECKER";


    isMatchChecker(unitItem: MarketingItem): boolean {
        if (!unitItem.shopIds || unitItem.shopIds.length < 1) {
            return false;
        }
        return true;
    }
    checkAvailability(unitItem: MarketingItem, context: CheckAvailabilityContext): CheckAvailabilityResult {
        if (!unitItem.shopIds || unitItem.shopIds.length < 1) {
            return new CheckAvailabilityResult(this.name, true);
        }

        if (!context.currentShopId || context.currentShopId < 1) {
            return new CheckAvailabilityResult(this.name, false, "商店编号获取失败");
        }

        if (unitItem.shopIds.find(p => p > 0 && (p + '' == context.currentShopId + ''))) {
            return new CheckAvailabilityResult(this.name, true);

        } else {
            return new CheckAvailabilityResult(this.name, false, "商店编号不匹配");
        }

    }
}

// class TimeCheckExtends {
//     endTime: Date;
//     startTime: Date;
// }

export class TimeChecker implements AvailabilityChecker {
    name: string = "TIME_CHECKER";
    isMatchChecker(unitItem: MarketingItem): boolean {

        if (!unitItem.endTime && !unitItem.startTime && !unitItem.limitTimes) {
            return false;
        } 

        // if (unitItem.limitTimes.length < 1) {
        //     return false;
        // }

        return true;
    }

    checkAvailability(unitItem: MarketingItem, context: CheckAvailabilityContext): CheckAvailabilityResult {
        const now = Math.round(context.checkTime.getTime() / 1000);

        var result = new CheckAvailabilityResult(this.name, true);
        //const ext = new TimeCheckExtends();

        //var startTime: Date;
        //var endTime: Date;

        if (unitItem.endTime || unitItem.startTime) {

            var end: number;
            var start: number;

            if (unitItem.endTime) {
                end = unitItem.endTime;
                //endTime = new Date(end * 1000);
                // (result as any).endTime = endTime;
            } else {
                end = now;
            }

            if (unitItem.startTime) {
                start = unitItem.startTime;
                // (result as any).startTime = unitItem.startTime;
                //startTime = new Date(start * 1000);
            } else {
                start = now;
            }


            if (now < start) {
                result.success = false;
                result.message = "有效时间未到";
            } else if (now > end) {
                result.success = false;
                result.message = "有效时间已过";
                return result;
            }

        }

        if (unitItem.limitTimes && unitItem.limitTimes.length > 0) {

            if (result.success) {
                //在时间范围内


                const dayOfWeek = context.checkTime.getDay();
                const nowTime = (context.checkTime.getHours() * 10000) + (context.checkTime.getMinutes() * 100) + context.checkTime.getSeconds();


                var matchItem = unitItem.limitTimes.find(item => {
                    return (item.begin <= nowTime && item.end >= nowTime && (item.dayOfWeek === dayOfWeek));
                });

                if (!matchItem) {
                    // if (endTime) {
                    //    var lastest =  this.getPrevStart(endTime, unitItem.limitTimes);
                    // }
                    result.success = false;
                    result.message = "不在有效时间内";
                    return result;
                    // } else {
                    //     var next = this.getNextStart(context.checkTime, unitItem.limitTimes);
                    //     if (endTime && next.getTime() >= endTime.getTime()) {
                    //         result.success = false;
                    //         result.message = "有效时间已过";
                    //         (result as any).endTime = endTime;
                    //         return result;
                    //     } else {
                    //         result.success = false;
                    //         result.message = "尚未开始";
                    //         (result as any).startTime = next;
                    //         return result;
                    //     }
                    // }

                } else {
                    //不在有效时间内


                }


            }

        }
        return result;
    }
}

export class ModuleMatchChecker implements AvailabilityChecker {
    name: string = "MODULE_MATCH_CHECKER";


    isMatchChecker(unitItem: MarketingItem): boolean {
        if (!unitItem.moduleId || unitItem.moduleId < 1) {
            return false;
        }
        return true;
    }
    checkAvailability(unitItem: MarketingItem, context: CheckAvailabilityContext): CheckAvailabilityResult {

        var mod = Modules.find(p => p.id > 0 && p.id + '' === unitItem.moduleId + '');
        if (mod) {
            return mod.checkAvailability(unitItem, context);
        } else {
            return new CheckAvailabilityResult(this.name, false, "找不到处理模块");
        }

    }
}

export const Checkers: AvailabilityChecker[] = [
    new ShopIdChecker(),
    new TimeChecker(),
    new ModuleMatchChecker()
];


