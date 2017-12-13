

export default interface EffectiveTimePickerValue {
    days: number[];
    is24th: boolean;
    time?: {
        beginHours: number;
        beginMinutes: number;
        endHours: number;
        endMinutes: number;
    }

}
