export default interface GeoNode {
    adcode: number;
    level: "province" | "city" | "district";
    name: string;
    pinyin?: string;
    jianpin?: string;
    fullname?: string;
    citycode?: string;
    districts?: Array<GeoNode>;
}