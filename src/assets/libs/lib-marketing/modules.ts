import {
    MarketingModule,
    MarketingItem,
    CheckAvailabilityContext,
    CheckAvailabilityResult,
    CalculateMarketingResult
} from './base';

export class ManjianModule implements MarketingModule {
    id: number = 1;
    name: string = "MANJIAN_MODULE";
    checkAvailability(unitItem: MarketingItem, context: CheckAvailabilityContext): CheckAvailabilityResult {
        var meta = JSON.parse(unitItem.moduleMeta || '{}');

        if (!(meta instanceof Array)) {
            meta = [meta];
        }

        if (!meta || meta.lenght < 1) {
            return new CheckAvailabilityResult(this.name, false, "META无效");
        }

        if ((!context.currentAmount && context.currentAmount !== 0) || context.currentAmount < 0) {
            return new CheckAvailabilityResult(this.name, false, "当前价格无效");
        }
        var minValue = 0;
        (meta as Array<any>).forEach(item => {
            //console.log(item);
            if (minValue < 1 || item.fullAmount < minValue)
                minValue = item.fullAmount;
        });

        if (context.currentAmount < minValue) {
            //console.log(this.name);
            return new CheckAvailabilityResult(this.name, false, "尚未达到满减价格");
        }
        else {
            return new CheckAvailabilityResult(this.name, true);
        }

    }

    calculateMarketing(unitItem: MarketingItem, context: CheckAvailabilityContext): CalculateMarketingResult {
        var meta = JSON.parse(unitItem.moduleMeta || '{}');
        if (!(meta instanceof Array)) {
            meta = [meta];
        }

        if (!meta || meta.lenght < 1) {
            throw Error("META无效");
        }

        let options = (meta as Array<any>).sort((a, b) => { return a.fullAmount > b.fullAmount ? a : b; });

        for (let idx in options) {
            let item = options[idx];

            if (context.currentAmount >= item.fullAmount) {
                let ret = new CalculateMarketingResult();
                ret.discountAmount = item.discountAmount;
                return ret;
            }
        }

        return new CalculateMarketingResult();
    }
}

export const Modules: MarketingModule[] = [
    new ManjianModule()
];