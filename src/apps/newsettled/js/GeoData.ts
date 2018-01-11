import GeoData from '../../../assets/libs/geo-data/data-areas';

let citysData = GeoData.map(p => {
    return {
        value: p.adcode,
        label: p.fullname || p.name,
        children: (p.districts || []).map(n => {
            return {
                value: n.adcode,
                label: n.fullname || n.name,
                children: (n.districts || []).map(m => {
                    return {
                        value: m.adcode,
                        label: m.fullname || m.name,
                        ...m
                    }
                }),
                ...n
            }
        }),
        ...p
    }
});
 
export default citysData;