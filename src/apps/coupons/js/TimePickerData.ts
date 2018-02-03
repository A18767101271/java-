interface PickerDateItem {
    label: string;
    value: number;
    text: string;
    children?: PickerDateItem[];
}

let pickerData: PickerDateItem[] = [];

for (let i1 = 0; i1 < 24; i1++) {
    pickerData.push({ label: i1.toString() + '时', text: i1.toString() + '时', value: i1 });
}

pickerData.forEach(p1 => {
    p1.children = [];
    for (let i2 = 0; i2 < 60; i2++) {
        let t: PickerDateItem = { label: '至', text: '至', value: 0, children: [] };
        let p2: PickerDateItem = { label: i2.toString() + '分', text: i2.toString() + '分', value: i2, children: [t] };
        p1.children.push(p2);
        let l3 = t.children as PickerDateItem[];
        for (let i3 = p1.value; i3 < 24; i3++) {
            let p3: PickerDateItem = { label: i3.toString() + '时', text: (i3 >= 24 ? '次日' + (i3 - 24) : i3.toString()) + '时', value: i3, children: [] };
            let l4 = p3.children as PickerDateItem[];
            for (let i4 = 0; i4 < 60; i4++) {
                if (i3 > p1.value || i4 > i2) {
                    l4.push({ label: i4.toString() + '分', text: i4.toString() + '分', value: i4 });
                }
            }
            if (l4.length > 0) {
                l3.push(p3);
            }
        }
    }
});

export default pickerData;