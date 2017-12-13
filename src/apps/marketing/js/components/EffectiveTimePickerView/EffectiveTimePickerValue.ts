

export default interface EffectiveTimePickerValue {
    day1: boolean;
    day2: boolean;
    day3: boolean;
    day4: boolean;
    day5: boolean;
    day6: boolean;
    day7: boolean;
    is24th: boolean;
    time?: {
        beginHours: number;
        beginMinutes: number;
        endHours: number;
        endMinutes: number;
    }

}
