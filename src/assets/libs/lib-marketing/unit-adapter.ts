
import { MarketingUnit, AvailabilityChecker } from './base';
import { Checkers } from './checkers';
import { Modules } from './modules';

export class MarketingUnitAdapter {

    checkers: AvailabilityChecker[];
    constructor() {

        if (Checkers) {
            this.checkers = Checkers;
        } else {
            this.checkers = [];
        }

    }


    fill(unitItem: MarketingUnit) {

        if (!unitItem)
            return;

        unitItem.checkers = [];

        this.checkers.forEach(item => {
            if (item.isMatchChecker(unitItem.item))
                unitItem.checkers.push(item);
        });

        if (unitItem.item.moduleId) {
            var mod = Modules.find(p => p.id > 0 && p.id + '' === unitItem.item.moduleId + '');
            if (mod) {
                unitItem.module = mod;
            }
        }


    }


}