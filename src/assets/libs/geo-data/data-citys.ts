import GeoNode from './GeoNode';

const DATA_CITYS: Array<GeoNode> = [{
    "adcode": 110000,
    "level": "province",
    "name": "北京",
    "districts": [{
        "citycode": "010",
        "adcode": 110100,
        "level": "city",
        "name": "北京",
        "fullname": "北京市",
        "pinyin": "beijing",
        "jianpin": "BJ"
    }],
    "pinyin": "beijing",
    "jianpin": "BJ"
},
{
    "adcode": 120000,
    "level": "province",
    "name": "天津",
    "districts": [{
        "citycode": "022",
        "adcode": 120100,
        "level": "city",
        "name": "天津",
        "fullname": "天津市",
        "pinyin": "tianjin",
        "jianpin": "TJ"
    }],
    "pinyin": "tianjin",
    "jianpin": "TJ"
},
{
    "adcode": 130000,
    "level": "province",
    "name": "河北",
    "fullname": "河北省",
    "districts": [{
        "citycode": "0311",
        "adcode": 130100,
        "level": "city",
        "name": "石家庄",
        "fullname": "石家庄市",
        "pinyin": "shijiazhuang",
        "jianpin": "SJZ"
    },
    {
        "citycode": "0315",
        "adcode": 130200,
        "level": "city",
        "name": "唐山",
        "fullname": "唐山市",
        "pinyin": "tangshan",
        "jianpin": "TS"
    },
    {
        "citycode": "0335",
        "adcode": 130300,
        "level": "city",
        "name": "秦皇岛",
        "fullname": "秦皇岛市",
        "pinyin": "qinhuangdao",
        "jianpin": "QHD"
    },
    {
        "citycode": "0310",
        "adcode": 130400,
        "level": "city",
        "name": "邯郸",
        "fullname": "邯郸市",
        "pinyin": "handan",
        "jianpin": "HD"
    },
    {
        "citycode": "0319",
        "adcode": 130500,
        "level": "city",
        "name": "邢台",
        "fullname": "邢台市",
        "pinyin": "xingtai",
        "jianpin": "XT"
    },
    {
        "citycode": "0312",
        "adcode": 130600,
        "level": "city",
        "name": "保定",
        "fullname": "保定市",
        "pinyin": "baoding",
        "jianpin": "BD"
    },
    {
        "citycode": "0313",
        "adcode": 130700,
        "level": "city",
        "name": "张家口",
        "fullname": "张家口市",
        "pinyin": "zhangjiakou",
        "jianpin": "ZJK"
    },
    {
        "citycode": "0314",
        "adcode": 130800,
        "level": "city",
        "name": "承德",
        "fullname": "承德市",
        "pinyin": "chengde",
        "jianpin": "CD"
    },
    {
        "citycode": "0317",
        "adcode": 130900,
        "level": "city",
        "name": "沧州",
        "fullname": "沧州市",
        "pinyin": "cangzhou",
        "jianpin": "CZ"
    },
    {
        "citycode": "0316",
        "adcode": 131000,
        "level": "city",
        "name": "廊坊",
        "fullname": "廊坊市",
        "pinyin": "langfang",
        "jianpin": "LF"
    },
    {
        "citycode": "0318",
        "adcode": 131100,
        "level": "city",
        "name": "衡水",
        "fullname": "衡水市",
        "pinyin": "hengshui",
        "jianpin": "HS"
    }],
    "pinyin": "hebei",
    "jianpin": "HB"
},
{
    "adcode": 140000,
    "level": "province",
    "name": "山西",
    "fullname": "山西省",
    "districts": [{
        "citycode": "0351",
        "adcode": 140100,
        "level": "city",
        "name": "太原",
        "fullname": "太原市",
        "pinyin": "taiyuan",
        "jianpin": "TY"
    },
    {
        "citycode": "0352",
        "adcode": 140200,
        "level": "city",
        "name": "大同",
        "fullname": "大同市",
        "pinyin": "datong",
        "jianpin": "DT"
    },
    {
        "citycode": "0353",
        "adcode": 140300,
        "level": "city",
        "name": "阳泉",
        "fullname": "阳泉市",
        "pinyin": "yangquan",
        "jianpin": "YQ"
    },
    {
        "citycode": "0355",
        "adcode": 140400,
        "level": "city",
        "name": "长治",
        "fullname": "长治市",
        "pinyin": "changzhi",
        "jianpin": "CZ"
    },
    {
        "citycode": "0356",
        "adcode": 140500,
        "level": "city",
        "name": "晋城",
        "fullname": "晋城市",
        "pinyin": "jincheng",
        "jianpin": "JC"
    },
    {
        "citycode": "0349",
        "adcode": 140600,
        "level": "city",
        "name": "朔州",
        "fullname": "朔州市",
        "pinyin": "shuozhou",
        "jianpin": "SZ"
    },
    {
        "citycode": "0354",
        "adcode": 140700,
        "level": "city",
        "name": "晋中",
        "fullname": "晋中市",
        "pinyin": "jinzhong",
        "jianpin": "JZ"
    },
    {
        "citycode": "0359",
        "adcode": 140800,
        "level": "city",
        "name": "运城",
        "fullname": "运城市",
        "pinyin": "yuncheng",
        "jianpin": "YC"
    },
    {
        "citycode": "0350",
        "adcode": 140900,
        "level": "city",
        "name": "忻州",
        "fullname": "忻州市",
        "pinyin": "xinzhou",
        "jianpin": "XZ"
    },
    {
        "citycode": "0357",
        "adcode": 141000,
        "level": "city",
        "name": "临汾",
        "fullname": "临汾市",
        "pinyin": "linfen",
        "jianpin": "LF"
    },
    {
        "citycode": "0358",
        "adcode": 141100,
        "level": "city",
        "name": "吕梁",
        "fullname": "吕梁市",
        "pinyin": "lvliang",
        "jianpin": "LL"
    }],
    "pinyin": "shanxi",
    "jianpin": "SX"
},
{
    "adcode": 150000,
    "level": "province",
    "name": "内蒙古",
    "fullname": "内蒙古自治区",
    "districts": [{
        "citycode": "0471",
        "adcode": 150100,
        "level": "city",
        "name": "呼和浩特",
        "fullname": "呼和浩特市",
        "pinyin": "huhehaote",
        "jianpin": "HHHT"
    },
    {
        "citycode": "0472",
        "adcode": 150200,
        "level": "city",
        "name": "包头",
        "fullname": "包头市",
        "pinyin": "baotou",
        "jianpin": "BT"
    },
    {
        "citycode": "0473",
        "adcode": 150300,
        "level": "city",
        "name": "乌海",
        "fullname": "乌海市",
        "pinyin": "wuhai",
        "jianpin": "WH"
    },
    {
        "citycode": "0476",
        "adcode": 150400,
        "level": "city",
        "name": "赤峰",
        "fullname": "赤峰市",
        "pinyin": "chifeng",
        "jianpin": "CF"
    },
    {
        "citycode": "0475",
        "adcode": 150500,
        "level": "city",
        "name": "通辽",
        "fullname": "通辽市",
        "pinyin": "tongliao",
        "jianpin": "TL"
    },
    {
        "citycode": "0477",
        "adcode": 150600,
        "level": "city",
        "name": "鄂尔多斯",
        "fullname": "鄂尔多斯市",
        "pinyin": "eerduosi",
        "jianpin": "EEDS"
    },
    {
        "citycode": "0470",
        "adcode": 150700,
        "level": "city",
        "name": "呼伦贝尔",
        "fullname": "呼伦贝尔市",
        "pinyin": "hulunbeier",
        "jianpin": "HLBE"
    },
    {
        "citycode": "0478",
        "adcode": 150800,
        "level": "city",
        "name": "巴彦淖尔",
        "fullname": "巴彦淖尔市",
        "pinyin": "bayanneer",
        "jianpin": "BYNE"
    },
    {
        "citycode": "0474",
        "adcode": 150900,
        "level": "city",
        "name": "乌兰察布",
        "fullname": "乌兰察布市",
        "pinyin": "wulanchabu",
        "jianpin": "WLCB"
    },
    {
        "citycode": "0482",
        "adcode": 152200,
        "level": "city",
        "name": "兴安盟",
        "pinyin": "xinganmeng",
        "jianpin": "XAM"
    },
    {
        "citycode": "0479",
        "adcode": 152500,
        "level": "city",
        "name": "锡林郭勒",
        "fullname": "锡林郭勒盟",
        "pinyin": "xilinguole",
        "jianpin": "XLGL"
    },
    {
        "citycode": "0483",
        "adcode": 152900,
        "level": "city",
        "name": "阿拉善盟",
        "pinyin": "alashanmeng",
        "jianpin": "ALSM"
    }],
    "pinyin": "namenggu",
    "jianpin": "NMG"
},
{
    "adcode": 210000,
    "level": "province",
    "name": "辽宁",
    "fullname": "辽宁省",
    "districts": [{
        "citycode": "024",
        "adcode": 210100,
        "level": "city",
        "name": "沈阳",
        "fullname": "沈阳市",
        "pinyin": "shenyang",
        "jianpin": "SY"
    },
    {
        "citycode": "0411",
        "adcode": 210200,
        "level": "city",
        "name": "大连",
        "fullname": "大连市",
        "pinyin": "dalian",
        "jianpin": "DL"
    },
    {
        "citycode": "0412",
        "adcode": 210300,
        "level": "city",
        "name": "鞍山",
        "fullname": "鞍山市",
        "pinyin": "anshan",
        "jianpin": "AS"
    },
    {
        "citycode": "0413",
        "adcode": 210400,
        "level": "city",
        "name": "抚顺",
        "fullname": "抚顺市",
        "pinyin": "fushun",
        "jianpin": "FS"
    },
    {
        "citycode": "0414",
        "adcode": 210500,
        "level": "city",
        "name": "本溪",
        "fullname": "本溪市",
        "pinyin": "benxi",
        "jianpin": "BX"
    },
    {
        "citycode": "0415",
        "adcode": 210600,
        "level": "city",
        "name": "丹东",
        "fullname": "丹东市",
        "pinyin": "dandong",
        "jianpin": "DD"
    },
    {
        "citycode": "0416",
        "adcode": 210700,
        "level": "city",
        "name": "锦州",
        "fullname": "锦州市",
        "pinyin": "jinzhou",
        "jianpin": "JZ"
    },
    {
        "citycode": "0417",
        "adcode": 210800,
        "level": "city",
        "name": "营口",
        "fullname": "营口市",
        "pinyin": "yingkou",
        "jianpin": "YK"
    },
    {
        "citycode": "0418",
        "adcode": 210900,
        "level": "city",
        "name": "阜新",
        "fullname": "阜新市",
        "pinyin": "fuxin",
        "jianpin": "FX"
    },
    {
        "citycode": "0419",
        "adcode": 211000,
        "level": "city",
        "name": "辽阳",
        "fullname": "辽阳市",
        "pinyin": "liaoyang",
        "jianpin": "LY"
    },
    {
        "citycode": "0427",
        "adcode": 211100,
        "level": "city",
        "name": "盘锦",
        "fullname": "盘锦市",
        "pinyin": "panjin",
        "jianpin": "PJ"
    },
    {
        "citycode": "0410",
        "adcode": 211200,
        "level": "city",
        "name": "铁岭",
        "fullname": "铁岭市",
        "pinyin": "tieling",
        "jianpin": "TL"
    },
    {
        "citycode": "0421",
        "adcode": 211300,
        "level": "city",
        "name": "朝阳",
        "fullname": "朝阳市",
        "pinyin": "chaoyang",
        "jianpin": "CY"
    },
    {
        "citycode": "0429",
        "adcode": 211400,
        "level": "city",
        "name": "葫芦岛",
        "fullname": "葫芦岛市",
        "pinyin": "huludao",
        "jianpin": "HLD"
    }],
    "pinyin": "liaoning",
    "jianpin": "LN"
},
{
    "adcode": 220000,
    "level": "province",
    "name": "吉林",
    "fullname": "吉林省",
    "districts": [{
        "citycode": "0431",
        "adcode": 220100,
        "level": "city",
        "name": "长春",
        "fullname": "长春市",
        "pinyin": "changchun",
        "jianpin": "CC"
    },
    {
        "citycode": "0432",
        "adcode": 220200,
        "level": "city",
        "name": "吉林",
        "fullname": "吉林市",
        "pinyin": "jilin",
        "jianpin": "JL"
    },
    {
        "citycode": "0434",
        "adcode": 220300,
        "level": "city",
        "name": "四平",
        "fullname": "四平市",
        "pinyin": "siping",
        "jianpin": "SP"
    },
    {
        "citycode": "0437",
        "adcode": 220400,
        "level": "city",
        "name": "辽源",
        "fullname": "辽源市",
        "pinyin": "liaoyuan",
        "jianpin": "LY"
    },
    {
        "citycode": "0435",
        "adcode": 220500,
        "level": "city",
        "name": "通化",
        "fullname": "通化市",
        "pinyin": "tonghua",
        "jianpin": "TH"
    },
    {
        "citycode": "0439",
        "adcode": 220600,
        "level": "city",
        "name": "白山",
        "fullname": "白山市",
        "pinyin": "baishan",
        "jianpin": "BS"
    },
    {
        "citycode": "0438",
        "adcode": 220700,
        "level": "city",
        "name": "松原",
        "fullname": "松原市",
        "pinyin": "songyuan",
        "jianpin": "SY"
    },
    {
        "citycode": "0436",
        "adcode": 220800,
        "level": "city",
        "name": "白城",
        "fullname": "白城市",
        "pinyin": "baicheng",
        "jianpin": "BC"
    },
    {
        "citycode": "1433",
        "adcode": 222400,
        "level": "city",
        "name": "延边",
        "fullname": "延边朝鲜族自治州",
        "pinyin": "yanbian",
        "jianpin": "YB"
    }],
    "pinyin": "jilin",
    "jianpin": "JL"
},
{
    "adcode": 230000,
    "level": "province",
    "name": "黑龙江",
    "fullname": "黑龙江省",
    "districts": [{
        "citycode": "0451",
        "adcode": 230100,
        "level": "city",
        "name": "哈尔滨",
        "fullname": "哈尔滨市",
        "pinyin": "haerbin",
        "jianpin": "HEB"
    },
    {
        "citycode": "0452",
        "adcode": 230200,
        "level": "city",
        "name": "齐齐哈尔",
        "fullname": "齐齐哈尔市",
        "pinyin": "qiqihaer",
        "jianpin": "QQHE"
    },
    {
        "citycode": "0467",
        "adcode": 230300,
        "level": "city",
        "name": "鸡西",
        "fullname": "鸡西市",
        "pinyin": "jixi",
        "jianpin": "JX"
    },
    {
        "citycode": "0468",
        "adcode": 230400,
        "level": "city",
        "name": "鹤岗",
        "fullname": "鹤岗市",
        "pinyin": "hegang",
        "jianpin": "HG"
    },
    {
        "citycode": "0469",
        "adcode": 230500,
        "level": "city",
        "name": "双鸭山",
        "fullname": "双鸭山市",
        "pinyin": "shuangyashan",
        "jianpin": "SYS"
    },
    {
        "citycode": "0459",
        "adcode": 230600,
        "level": "city",
        "name": "大庆",
        "fullname": "大庆市",
        "pinyin": "daqing",
        "jianpin": "DQ"
    },
    {
        "citycode": "0458",
        "adcode": 230700,
        "level": "city",
        "name": "伊春",
        "fullname": "伊春市",
        "pinyin": "yichun",
        "jianpin": "YC"
    },
    {
        "citycode": "0454",
        "adcode": 230800,
        "level": "city",
        "name": "佳木斯",
        "fullname": "佳木斯市",
        "pinyin": "jiamusi",
        "jianpin": "JMS"
    },
    {
        "citycode": "0464",
        "adcode": 230900,
        "level": "city",
        "name": "七台河",
        "fullname": "七台河市",
        "pinyin": "qitaihe",
        "jianpin": "QTH"
    },
    {
        "citycode": "0453",
        "adcode": 231000,
        "level": "city",
        "name": "牡丹江",
        "fullname": "牡丹江市",
        "pinyin": "mudanjiang",
        "jianpin": "MDJ"
    },
    {
        "citycode": "0456",
        "adcode": 231100,
        "level": "city",
        "name": "黑河",
        "fullname": "黑河市",
        "pinyin": "heihe",
        "jianpin": "HH"
    },
    {
        "citycode": "0455",
        "adcode": 231200,
        "level": "city",
        "name": "绥化",
        "fullname": "绥化市",
        "pinyin": "suihua",
        "jianpin": "SH"
    },
    {
        "citycode": "0457",
        "adcode": 232700,
        "level": "city",
        "name": "大兴安岭",
        "fullname": "大兴安岭地区",
        "pinyin": "daxinganling",
        "jianpin": "DXAL"
    }],
    "pinyin": "heilongjiang",
    "jianpin": "HLJ"
},
{
    "adcode": 310000,
    "level": "province",
    "name": "上海",
    "districts": [{
        "citycode": "021",
        "adcode": 310100,
        "level": "city",
        "name": "上海",
        "fullname": "上海市",
        "pinyin": "shanghai",
        "jianpin": "SH"
    }],
    "pinyin": "shanghai",
    "jianpin": "SH"
},
{
    "adcode": 320000,
    "level": "province",
    "name": "江苏",
    "fullname": "江苏省",
    "districts": [{
        "citycode": "025",
        "adcode": 320100,
        "level": "city",
        "name": "南京",
        "fullname": "南京市",
        "pinyin": "nanjing",
        "jianpin": "NJ"
    },
    {
        "citycode": "0510",
        "adcode": 320200,
        "level": "city",
        "name": "无锡",
        "fullname": "无锡市",
        "pinyin": "wuxi",
        "jianpin": "WX"
    },
    {
        "citycode": "0516",
        "adcode": 320300,
        "level": "city",
        "name": "徐州",
        "fullname": "徐州市",
        "pinyin": "xuzhou",
        "jianpin": "XZ"
    },
    {
        "citycode": "0519",
        "adcode": 320400,
        "level": "city",
        "name": "常州",
        "fullname": "常州市",
        "pinyin": "changzhou",
        "jianpin": "CZ"
    },
    {
        "citycode": "0512",
        "adcode": 320500,
        "level": "city",
        "name": "苏州",
        "fullname": "苏州市",
        "pinyin": "suzhou",
        "jianpin": "SZ"
    },
    {
        "citycode": "0513",
        "adcode": 320600,
        "level": "city",
        "name": "南通",
        "fullname": "南通市",
        "pinyin": "nantong",
        "jianpin": "NT"
    },
    {
        "citycode": "0518",
        "adcode": 320700,
        "level": "city",
        "name": "连云港",
        "fullname": "连云港市",
        "pinyin": "lianyungang",
        "jianpin": "LYG"
    },
    {
        "citycode": "0517",
        "adcode": 320800,
        "level": "city",
        "name": "淮安",
        "fullname": "淮安市",
        "pinyin": "huaian",
        "jianpin": "HA"
    },
    {
        "citycode": "0515",
        "adcode": 320900,
        "level": "city",
        "name": "盐城",
        "fullname": "盐城市",
        "pinyin": "yancheng",
        "jianpin": "YC"
    },
    {
        "citycode": "0514",
        "adcode": 321000,
        "level": "city",
        "name": "扬州",
        "fullname": "扬州市",
        "pinyin": "yangzhou",
        "jianpin": "YZ"
    },
    {
        "citycode": "0511",
        "adcode": 321100,
        "level": "city",
        "name": "镇江",
        "fullname": "镇江市",
        "pinyin": "zhenjiang",
        "jianpin": "ZJ"
    },
    {
        "citycode": "0523",
        "adcode": 321200,
        "level": "city",
        "name": "泰州",
        "fullname": "泰州市",
        "pinyin": "taizhou",
        "jianpin": "TZ"
    },
    {
        "citycode": "0527",
        "adcode": 321300,
        "level": "city",
        "name": "宿迁",
        "fullname": "宿迁市",
        "pinyin": "suqian",
        "jianpin": "SQ"
    }],
    "pinyin": "jiangsu",
    "jianpin": "JS"
},
{
    "adcode": 330000,
    "level": "province",
    "name": "浙江",
    "fullname": "浙江省",
    "districts": [{
        "citycode": "0571",
        "adcode": 330100,
        "level": "city",
        "name": "杭州",
        "fullname": "杭州市",
        "pinyin": "hangzhou",
        "jianpin": "HZ"
    },
    {
        "citycode": "0574",
        "adcode": 330200,
        "level": "city",
        "name": "宁波",
        "fullname": "宁波市",
        "pinyin": "ningbo",
        "jianpin": "NB"
    },
    {
        "citycode": "0577",
        "adcode": 330300,
        "level": "city",
        "name": "温州",
        "fullname": "温州市",
        "pinyin": "wenzhou",
        "jianpin": "WZ"
    },
    {
        "citycode": "0573",
        "adcode": 330400,
        "level": "city",
        "name": "嘉兴",
        "fullname": "嘉兴市",
        "pinyin": "jiaxing",
        "jianpin": "JX"
    },
    {
        "citycode": "0572",
        "adcode": 330500,
        "level": "city",
        "name": "湖州",
        "fullname": "湖州市",
        "pinyin": "huzhou",
        "jianpin": "HZ"
    },
    {
        "citycode": "0575",
        "adcode": 330600,
        "level": "city",
        "name": "绍兴",
        "fullname": "绍兴市",
        "pinyin": "shaoxing",
        "jianpin": "SX"
    },
    {
        "citycode": "0579",
        "adcode": 330700,
        "level": "city",
        "name": "金华",
        "fullname": "金华市",
        "pinyin": "jinhua",
        "jianpin": "JH"
    },
    {
        "citycode": "0570",
        "adcode": 330800,
        "level": "city",
        "name": "衢州",
        "fullname": "衢州市",
        "pinyin": "quzhou",
        "jianpin": "QZ"
    },
    {
        "citycode": "0580",
        "adcode": 330900,
        "level": "city",
        "name": "舟山",
        "fullname": "舟山市",
        "pinyin": "zhoushan",
        "jianpin": "ZS"
    },
    {
        "citycode": "0576",
        "adcode": 331000,
        "level": "city",
        "name": "台州",
        "fullname": "台州市",
        "pinyin": "taizhou",
        "jianpin": "TZ"
    },
    {
        "citycode": "0578",
        "adcode": 331100,
        "level": "city",
        "name": "丽水",
        "fullname": "丽水市",
        "pinyin": "lishui",
        "jianpin": "LS"
    }],
    "pinyin": "zhejiang",
    "jianpin": "ZJ"
},
{
    "adcode": 340000,
    "level": "province",
    "name": "安徽",
    "fullname": "安徽省",
    "districts": [{
        "citycode": "0551",
        "adcode": 340100,
        "level": "city",
        "name": "合肥",
        "fullname": "合肥市",
        "pinyin": "hefei",
        "jianpin": "HF"
    },
    {
        "citycode": "0553",
        "adcode": 340200,
        "level": "city",
        "name": "芜湖",
        "fullname": "芜湖市",
        "pinyin": "wuhu",
        "jianpin": "WH"
    },
    {
        "citycode": "0552",
        "adcode": 340300,
        "level": "city",
        "name": "蚌埠",
        "fullname": "蚌埠市",
        "pinyin": "bengbu",
        "jianpin": "BB"
    },
    {
        "citycode": "0554",
        "adcode": 340400,
        "level": "city",
        "name": "淮南",
        "fullname": "淮南市",
        "pinyin": "huainan",
        "jianpin": "HN"
    },
    {
        "citycode": "0555",
        "adcode": 340500,
        "level": "city",
        "name": "马鞍山",
        "fullname": "马鞍山市",
        "pinyin": "maanshan",
        "jianpin": "MAS"
    },
    {
        "citycode": "0561",
        "adcode": 340600,
        "level": "city",
        "name": "淮北",
        "fullname": "淮北市",
        "pinyin": "huaibei",
        "jianpin": "HB"
    },
    {
        "citycode": "0562",
        "adcode": 340700,
        "level": "city",
        "name": "铜陵",
        "fullname": "铜陵市",
        "pinyin": "tongling",
        "jianpin": "TL"
    },
    {
        "citycode": "0556",
        "adcode": 340800,
        "level": "city",
        "name": "安庆",
        "fullname": "安庆市",
        "pinyin": "anqing",
        "jianpin": "AQ"
    },
    {
        "citycode": "0559",
        "adcode": 341000,
        "level": "city",
        "name": "黄山",
        "fullname": "黄山市",
        "pinyin": "huangshan",
        "jianpin": "HS"
    },
    {
        "citycode": "0550",
        "adcode": 341100,
        "level": "city",
        "name": "滁州",
        "fullname": "滁州市",
        "pinyin": "chuzhou",
        "jianpin": "CZ"
    },
    {
        "citycode": "1558",
        "adcode": 341200,
        "level": "city",
        "name": "阜阳",
        "fullname": "阜阳市",
        "pinyin": "fuyang",
        "jianpin": "FY"
    },
    {
        "citycode": "0557",
        "adcode": 341300,
        "level": "city",
        "name": "宿州",
        "fullname": "宿州市",
        "pinyin": "suzhou",
        "jianpin": "SZ"
    },
    {
        "citycode": "0564",
        "adcode": 341500,
        "level": "city",
        "name": "六安",
        "fullname": "六安市",
        "pinyin": "liuan",
        "jianpin": "LA"
    },
    {
        "citycode": "0558",
        "adcode": 341600,
        "level": "city",
        "name": "亳州",
        "fullname": "亳州市",
        "pinyin": "bozhou",
        "jianpin": "BZ"
    },
    {
        "citycode": "0566",
        "adcode": 341700,
        "level": "city",
        "name": "池州",
        "fullname": "池州市",
        "pinyin": "chizhou",
        "jianpin": "CZ"
    },
    {
        "citycode": "0563",
        "adcode": 341800,
        "level": "city",
        "name": "宣城",
        "fullname": "宣城市",
        "pinyin": "xuancheng",
        "jianpin": "XC"
    }],
    "pinyin": "anhui",
    "jianpin": "AH"
},
{
    "adcode": 350000,
    "level": "province",
    "name": "福建",
    "fullname": "福建省",
    "districts": [{
        "citycode": "0591",
        "adcode": 350100,
        "level": "city",
        "name": "福州",
        "fullname": "福州市",
        "pinyin": "fuzhou",
        "jianpin": "FZ"
    },
    {
        "citycode": "0592",
        "adcode": 350200,
        "level": "city",
        "name": "厦门",
        "fullname": "厦门市",
        "pinyin": "xiamen",
        "jianpin": "XM"
    },
    {
        "citycode": "0594",
        "adcode": 350300,
        "level": "city",
        "name": "莆田",
        "fullname": "莆田市",
        "pinyin": "putian",
        "jianpin": "PT"
    },
    {
        "citycode": "0598",
        "adcode": 350400,
        "level": "city",
        "name": "三明",
        "fullname": "三明市",
        "pinyin": "sanming",
        "jianpin": "SM"
    },
    {
        "citycode": "0595",
        "adcode": 350500,
        "level": "city",
        "name": "泉州",
        "fullname": "泉州市",
        "pinyin": "quanzhou",
        "jianpin": "QZ"
    },
    {
        "citycode": "0596",
        "adcode": 350600,
        "level": "city",
        "name": "漳州",
        "fullname": "漳州市",
        "pinyin": "zhangzhou",
        "jianpin": "ZZ"
    },
    {
        "citycode": "0599",
        "adcode": 350700,
        "level": "city",
        "name": "南平",
        "fullname": "南平市",
        "pinyin": "nanping",
        "jianpin": "NP"
    },
    {
        "citycode": "0597",
        "adcode": 350800,
        "level": "city",
        "name": "龙岩",
        "fullname": "龙岩市",
        "pinyin": "longyan",
        "jianpin": "LY"
    },
    {
        "citycode": "0593",
        "adcode": 350900,
        "level": "city",
        "name": "宁德",
        "fullname": "宁德市",
        "pinyin": "ningde",
        "jianpin": "ND"
    }],
    "pinyin": "fujian",
    "jianpin": "FJ"
},
{
    "adcode": 360000,
    "level": "province",
    "name": "江西",
    "fullname": "江西省",
    "districts": [{
        "citycode": "0791",
        "adcode": 360100,
        "level": "city",
        "name": "南昌",
        "fullname": "南昌市",
        "pinyin": "nanchang",
        "jianpin": "NC"
    },
    {
        "citycode": "0798",
        "adcode": 360200,
        "level": "city",
        "name": "景德镇",
        "fullname": "景德镇市",
        "pinyin": "jingdezhen",
        "jianpin": "JDZ"
    },
    {
        "citycode": "0799",
        "adcode": 360300,
        "level": "city",
        "name": "萍乡",
        "fullname": "萍乡市",
        "pinyin": "pingxiang",
        "jianpin": "PX"
    },
    {
        "citycode": "0792",
        "adcode": 360400,
        "level": "city",
        "name": "九江",
        "fullname": "九江市",
        "pinyin": "jiujiang",
        "jianpin": "JJ"
    },
    {
        "citycode": "0790",
        "adcode": 360500,
        "level": "city",
        "name": "新余",
        "fullname": "新余市",
        "pinyin": "xinyu",
        "jianpin": "XY"
    },
    {
        "citycode": "0701",
        "adcode": 360600,
        "level": "city",
        "name": "鹰潭",
        "fullname": "鹰潭市",
        "pinyin": "yingtan",
        "jianpin": "YT"
    },
    {
        "citycode": "0797",
        "adcode": 360700,
        "level": "city",
        "name": "赣州",
        "fullname": "赣州市",
        "pinyin": "ganzhou",
        "jianpin": "GZ"
    },
    {
        "citycode": "0796",
        "adcode": 360800,
        "level": "city",
        "name": "吉安",
        "fullname": "吉安市",
        "pinyin": "jian",
        "jianpin": "JA"
    },
    {
        "citycode": "0795",
        "adcode": 360900,
        "level": "city",
        "name": "宜春",
        "fullname": "宜春市",
        "pinyin": "yichun",
        "jianpin": "YC"
    },
    {
        "citycode": "0794",
        "adcode": 361000,
        "level": "city",
        "name": "抚州",
        "fullname": "抚州市",
        "pinyin": "fuzhou",
        "jianpin": "FZ"
    },
    {
        "citycode": "0793",
        "adcode": 361100,
        "level": "city",
        "name": "上饶",
        "fullname": "上饶市",
        "pinyin": "shangrao",
        "jianpin": "SR"
    }],
    "pinyin": "jiangxi",
    "jianpin": "JX"
},
{
    "adcode": 370000,
    "level": "province",
    "name": "山东",
    "fullname": "山东省",
    "districts": [{
        "citycode": "0531",
        "adcode": 370100,
        "level": "city",
        "name": "济南",
        "fullname": "济南市",
        "pinyin": "jinan",
        "jianpin": "JN"
    },
    {
        "citycode": "0532",
        "adcode": 370200,
        "level": "city",
        "name": "青岛",
        "fullname": "青岛市",
        "pinyin": "qingdao",
        "jianpin": "QD"
    },
    {
        "citycode": "0533",
        "adcode": 370300,
        "level": "city",
        "name": "淄博",
        "fullname": "淄博市",
        "pinyin": "zibo",
        "jianpin": "ZB"
    },
    {
        "citycode": "0632",
        "adcode": 370400,
        "level": "city",
        "name": "枣庄",
        "fullname": "枣庄市",
        "pinyin": "zaozhuang",
        "jianpin": "ZZ"
    },
    {
        "citycode": "0546",
        "adcode": 370500,
        "level": "city",
        "name": "东营",
        "fullname": "东营市",
        "pinyin": "dongying",
        "jianpin": "DY"
    },
    {
        "citycode": "0535",
        "adcode": 370600,
        "level": "city",
        "name": "烟台",
        "fullname": "烟台市",
        "pinyin": "yantai",
        "jianpin": "YT"
    },
    {
        "citycode": "0536",
        "adcode": 370700,
        "level": "city",
        "name": "潍坊",
        "fullname": "潍坊市",
        "pinyin": "weifang",
        "jianpin": "WF"
    },
    {
        "citycode": "0537",
        "adcode": 370800,
        "level": "city",
        "name": "济宁",
        "fullname": "济宁市",
        "pinyin": "jining",
        "jianpin": "JN"
    },
    {
        "citycode": "0538",
        "adcode": 370900,
        "level": "city",
        "name": "泰安",
        "fullname": "泰安市",
        "pinyin": "taian",
        "jianpin": "TA"
    },
    {
        "citycode": "0631",
        "adcode": 371000,
        "level": "city",
        "name": "威海",
        "fullname": "威海市",
        "pinyin": "weihai",
        "jianpin": "WH"
    },
    {
        "citycode": "0633",
        "adcode": 371100,
        "level": "city",
        "name": "日照",
        "fullname": "日照市",
        "pinyin": "rizhao",
        "jianpin": "RZ"
    },
    {
        "citycode": "0634",
        "adcode": 371200,
        "level": "city",
        "name": "莱芜",
        "fullname": "莱芜市",
        "pinyin": "laiwu",
        "jianpin": "LW"
    },
    {
        "citycode": "0539",
        "adcode": 371300,
        "level": "city",
        "name": "临沂",
        "fullname": "临沂市",
        "pinyin": "linyi",
        "jianpin": "LY"
    },
    {
        "citycode": "0534",
        "adcode": 371400,
        "level": "city",
        "name": "德州",
        "fullname": "德州市",
        "pinyin": "dezhou",
        "jianpin": "DZ"
    },
    {
        "citycode": "0635",
        "adcode": 371500,
        "level": "city",
        "name": "聊城",
        "fullname": "聊城市",
        "pinyin": "liaocheng",
        "jianpin": "LC"
    },
    {
        "citycode": "0543",
        "adcode": 371600,
        "level": "city",
        "name": "滨州",
        "fullname": "滨州市",
        "pinyin": "binzhou",
        "jianpin": "BZ"
    },
    {
        "citycode": "0530",
        "adcode": 371700,
        "level": "city",
        "name": "菏泽",
        "fullname": "菏泽市",
        "pinyin": "heze",
        "jianpin": "HZ"
    }],
    "pinyin": "shandong",
    "jianpin": "SD"
},
{
    "adcode": 410000,
    "level": "province",
    "name": "河南",
    "fullname": "河南省",
    "districts": [{
        "citycode": "0371",
        "adcode": 410100,
        "level": "city",
        "name": "郑州",
        "fullname": "郑州市",
        "pinyin": "zhengzhou",
        "jianpin": "ZZ"
    },
    {
        "citycode": "0378",
        "adcode": 410200,
        "level": "city",
        "name": "开封",
        "fullname": "开封市",
        "pinyin": "kaifeng",
        "jianpin": "KF"
    },
    {
        "citycode": "0379",
        "adcode": 410300,
        "level": "city",
        "name": "洛阳",
        "fullname": "洛阳市",
        "pinyin": "luoyang",
        "jianpin": "LY"
    },
    {
        "citycode": "0375",
        "adcode": 410400,
        "level": "city",
        "name": "平顶山",
        "fullname": "平顶山市",
        "pinyin": "pingdingshan",
        "jianpin": "PDS"
    },
    {
        "citycode": "0372",
        "adcode": 410500,
        "level": "city",
        "name": "安阳",
        "fullname": "安阳市",
        "pinyin": "anyang",
        "jianpin": "AY"
    },
    {
        "citycode": "0392",
        "adcode": 410600,
        "level": "city",
        "name": "鹤壁",
        "fullname": "鹤壁市",
        "pinyin": "hebi",
        "jianpin": "HB"
    },
    {
        "citycode": "0373",
        "adcode": 410700,
        "level": "city",
        "name": "新乡",
        "fullname": "新乡市",
        "pinyin": "xinxiang",
        "jianpin": "XX"
    },
    {
        "citycode": "0391",
        "adcode": 410800,
        "level": "city",
        "name": "焦作",
        "fullname": "焦作市",
        "pinyin": "jiaozuo",
        "jianpin": "JZ"
    },
    {
        "citycode": "0393",
        "adcode": 410900,
        "level": "city",
        "name": "濮阳",
        "fullname": "濮阳市",
        "pinyin": "puyang",
        "jianpin": "PY"
    },
    {
        "citycode": "0374",
        "adcode": 411000,
        "level": "city",
        "name": "许昌",
        "fullname": "许昌市",
        "pinyin": "xuchang",
        "jianpin": "XC"
    },
    {
        "citycode": "0395",
        "adcode": 411100,
        "level": "city",
        "name": "漯河",
        "fullname": "漯河市",
        "pinyin": "leihe",
        "jianpin": "LH"
    },
    {
        "citycode": "0398",
        "adcode": 411200,
        "level": "city",
        "name": "三门峡",
        "fullname": "三门峡市",
        "pinyin": "sanmenxia",
        "jianpin": "SMX"
    },
    {
        "citycode": "0377",
        "adcode": 411300,
        "level": "city",
        "name": "南阳",
        "fullname": "南阳市",
        "pinyin": "nanyang",
        "jianpin": "NY"
    },
    {
        "citycode": "0370",
        "adcode": 411400,
        "level": "city",
        "name": "商丘",
        "fullname": "商丘市",
        "pinyin": "shangqiu",
        "jianpin": "SQ"
    },
    {
        "citycode": "0376",
        "adcode": 411500,
        "level": "city",
        "name": "信阳",
        "fullname": "信阳市",
        "pinyin": "xinyang",
        "jianpin": "XY"
    },
    {
        "citycode": "0394",
        "adcode": 411600,
        "level": "city",
        "name": "周口",
        "fullname": "周口市",
        "pinyin": "zhoukou",
        "jianpin": "ZK"
    },
    {
        "citycode": "0396",
        "adcode": 411700,
        "level": "city",
        "name": "驻马店",
        "fullname": "驻马店市",
        "pinyin": "zhumadian",
        "jianpin": "ZMD"
    },
    {
        "citycode": "1391",
        "adcode": 419001,
        "level": "city",
        "name": "济源",
        "fullname": "济源市",
        "pinyin": "jiyuan",
        "jianpin": "JY"
    }],
    "pinyin": "henan",
    "jianpin": "HN"
},
{
    "adcode": 420000,
    "level": "province",
    "name": "湖北",
    "fullname": "湖北省",
    "districts": [{
        "citycode": "027",
        "adcode": 420100,
        "level": "city",
        "name": "武汉",
        "fullname": "武汉市",
        "pinyin": "wuhan",
        "jianpin": "WH"
    },
    {
        "citycode": "0714",
        "adcode": 420200,
        "level": "city",
        "name": "黄石",
        "fullname": "黄石市",
        "pinyin": "huangshi",
        "jianpin": "HS"
    },
    {
        "citycode": "0719",
        "adcode": 420300,
        "level": "city",
        "name": "十堰",
        "fullname": "十堰市",
        "pinyin": "shiyan",
        "jianpin": "SY"
    },
    {
        "citycode": "0717",
        "adcode": 420500,
        "level": "city",
        "name": "宜昌",
        "fullname": "宜昌市",
        "pinyin": "yichang",
        "jianpin": "YC"
    },
    {
        "citycode": "0710",
        "adcode": 420600,
        "level": "city",
        "name": "襄阳",
        "fullname": "襄阳市",
        "pinyin": "xiangyang",
        "jianpin": "XY"
    },
    {
        "citycode": "0711",
        "adcode": 420700,
        "level": "city",
        "name": "鄂州",
        "fullname": "鄂州市",
        "pinyin": "ezhou",
        "jianpin": "EZ"
    },
    {
        "citycode": "0724",
        "adcode": 420800,
        "level": "city",
        "name": "荆门",
        "fullname": "荆门市",
        "pinyin": "jingmen",
        "jianpin": "JM"
    },
    {
        "citycode": "0712",
        "adcode": 420900,
        "level": "city",
        "name": "孝感",
        "fullname": "孝感市",
        "pinyin": "xiaogan",
        "jianpin": "XG"
    },
    {
        "citycode": "0716",
        "adcode": 421000,
        "level": "city",
        "name": "荆州",
        "fullname": "荆州市",
        "pinyin": "jingzhou",
        "jianpin": "JZ"
    },
    {
        "citycode": "0713",
        "adcode": 421100,
        "level": "city",
        "name": "黄冈",
        "fullname": "黄冈市",
        "pinyin": "huanggang",
        "jianpin": "HG"
    },
    {
        "citycode": "0715",
        "adcode": 421200,
        "level": "city",
        "name": "咸宁",
        "fullname": "咸宁市",
        "pinyin": "xianning",
        "jianpin": "XN"
    },
    {
        "citycode": "0722",
        "adcode": 421300,
        "level": "city",
        "name": "随州",
        "fullname": "随州市",
        "pinyin": "suizhou",
        "jianpin": "SZ"
    },
    {
        "citycode": "0718",
        "adcode": 422800,
        "level": "city",
        "name": "恩施",
        "fullname": "恩施土家族苗族自治州",
        "pinyin": "enshi",
        "jianpin": "ES"
    },
    {
        "citycode": "0728",
        "adcode": 429004,
        "level": "city",
        "name": "仙桃",
        "fullname": "仙桃市",
        "pinyin": "xiantao",
        "jianpin": "XT"
    },
    {
        "citycode": "2728",
        "adcode": 429005,
        "level": "city",
        "name": "潜江",
        "fullname": "潜江市",
        "pinyin": "qianjiang",
        "jianpin": "QJ"
    },
    {
        "citycode": "1728",
        "adcode": 429006,
        "level": "city",
        "name": "天门",
        "fullname": "天门市",
        "pinyin": "tianmen",
        "jianpin": "TM"
    },
    {
        "citycode": "1719",
        "adcode": 429021,
        "level": "city",
        "name": "神农架",
        "fullname": "神农架林区",
        "pinyin": "shennongjia",
        "jianpin": "SNJ"
    }],
    "pinyin": "hubei",
    "jianpin": "HB"
},
{
    "adcode": 430000,
    "level": "province",
    "name": "湖南",
    "fullname": "湖南省",
    "districts": [{
        "citycode": "0731",
        "adcode": 430100,
        "level": "city",
        "name": "长沙",
        "fullname": "长沙市",
        "pinyin": "changsha",
        "jianpin": "CS"
    },
    {
        "citycode": "0733",
        "adcode": 430200,
        "level": "city",
        "name": "株洲",
        "fullname": "株洲市",
        "pinyin": "zhuzhou",
        "jianpin": "ZZ"
    },
    {
        "citycode": "0732",
        "adcode": 430300,
        "level": "city",
        "name": "湘潭",
        "fullname": "湘潭市",
        "pinyin": "xiangtan",
        "jianpin": "XT"
    },
    {
        "citycode": "0734",
        "adcode": 430400,
        "level": "city",
        "name": "衡阳",
        "fullname": "衡阳市",
        "pinyin": "hengyang",
        "jianpin": "HY"
    },
    {
        "citycode": "0739",
        "adcode": 430500,
        "level": "city",
        "name": "邵阳",
        "fullname": "邵阳市",
        "pinyin": "shaoyang",
        "jianpin": "SY"
    },
    {
        "citycode": "0730",
        "adcode": 430600,
        "level": "city",
        "name": "岳阳",
        "fullname": "岳阳市",
        "pinyin": "yueyang",
        "jianpin": "YY"
    },
    {
        "citycode": "0736",
        "adcode": 430700,
        "level": "city",
        "name": "常德",
        "fullname": "常德市",
        "pinyin": "changde",
        "jianpin": "CD"
    },
    {
        "citycode": "0744",
        "adcode": 430800,
        "level": "city",
        "name": "张家界",
        "fullname": "张家界市",
        "pinyin": "zhangjiajie",
        "jianpin": "ZJJ"
    },
    {
        "citycode": "0737",
        "adcode": 430900,
        "level": "city",
        "name": "益阳",
        "fullname": "益阳市",
        "pinyin": "yiyang",
        "jianpin": "YY"
    },
    {
        "citycode": "0735",
        "adcode": 431000,
        "level": "city",
        "name": "郴州",
        "fullname": "郴州市",
        "pinyin": "chenzhou",
        "jianpin": "CZ"
    },
    {
        "citycode": "0746",
        "adcode": 431100,
        "level": "city",
        "name": "永州",
        "fullname": "永州市",
        "pinyin": "yongzhou",
        "jianpin": "YZ"
    },
    {
        "citycode": "0745",
        "adcode": 431200,
        "level": "city",
        "name": "怀化",
        "fullname": "怀化市",
        "pinyin": "huaihua",
        "jianpin": "HH"
    },
    {
        "citycode": "0738",
        "adcode": 431300,
        "level": "city",
        "name": "娄底",
        "fullname": "娄底市",
        "pinyin": "loudi",
        "jianpin": "LD"
    },
    {
        "citycode": "0743",
        "adcode": 433100,
        "level": "city",
        "name": "湘西",
        "fullname": "湘西土家族苗族自治州",
        "pinyin": "xiangxi",
        "jianpin": "XX"
    }],
    "pinyin": "hunan",
    "jianpin": "HN"
},
{
    "adcode": 440000,
    "level": "province",
    "name": "广东",
    "fullname": "广东省",
    "districts": [{
        "citycode": "020",
        "adcode": 440100,
        "level": "city",
        "name": "广州",
        "fullname": "广州市",
        "pinyin": "guangzhou",
        "jianpin": "GZ"
    },
    {
        "citycode": "0751",
        "adcode": 440200,
        "level": "city",
        "name": "韶关",
        "fullname": "韶关市",
        "pinyin": "shaoguan",
        "jianpin": "SG"
    },
    {
        "citycode": "0755",
        "adcode": 440300,
        "level": "city",
        "name": "深圳",
        "fullname": "深圳市",
        "pinyin": "shenchou",
        "jianpin": "SC"
    },
    {
        "citycode": "0756",
        "adcode": 440400,
        "level": "city",
        "name": "珠海",
        "fullname": "珠海市",
        "pinyin": "zhuhai",
        "jianpin": "ZH"
    },
    {
        "citycode": "0754",
        "adcode": 440500,
        "level": "city",
        "name": "汕头",
        "fullname": "汕头市",
        "pinyin": "shantou",
        "jianpin": "ST"
    },
    {
        "citycode": "0757",
        "adcode": 440600,
        "level": "city",
        "name": "佛山",
        "fullname": "佛山市",
        "pinyin": "fushan",
        "jianpin": "FS"
    },
    {
        "citycode": "0750",
        "adcode": 440700,
        "level": "city",
        "name": "江门",
        "fullname": "江门市",
        "pinyin": "jiangmen",
        "jianpin": "JM"
    },
    {
        "citycode": "0759",
        "adcode": 440800,
        "level": "city",
        "name": "湛江",
        "fullname": "湛江市",
        "pinyin": "zhanjiang",
        "jianpin": "ZJ"
    },
    {
        "citycode": "0668",
        "adcode": 440900,
        "level": "city",
        "name": "茂名",
        "fullname": "茂名市",
        "pinyin": "maoming",
        "jianpin": "MM"
    },
    {
        "citycode": "0758",
        "adcode": 441200,
        "level": "city",
        "name": "肇庆",
        "fullname": "肇庆市",
        "pinyin": "zhaoqing",
        "jianpin": "ZQ"
    },
    {
        "citycode": "0752",
        "adcode": 441300,
        "level": "city",
        "name": "惠州",
        "fullname": "惠州市",
        "pinyin": "huizhou",
        "jianpin": "HZ"
    },
    {
        "citycode": "0753",
        "adcode": 441400,
        "level": "city",
        "name": "梅州",
        "fullname": "梅州市",
        "pinyin": "meizhou",
        "jianpin": "MZ"
    },
    {
        "citycode": "0660",
        "adcode": 441500,
        "level": "city",
        "name": "汕尾",
        "fullname": "汕尾市",
        "pinyin": "shanwei",
        "jianpin": "SW"
    },
    {
        "citycode": "0762",
        "adcode": 441600,
        "level": "city",
        "name": "河源",
        "fullname": "河源市",
        "pinyin": "heyuan",
        "jianpin": "HY"
    },
    {
        "citycode": "0662",
        "adcode": 441700,
        "level": "city",
        "name": "阳江",
        "fullname": "阳江市",
        "pinyin": "yangjiang",
        "jianpin": "YJ"
    },
    {
        "citycode": "0763",
        "adcode": 441800,
        "level": "city",
        "name": "清远",
        "fullname": "清远市",
        "pinyin": "qingyuan",
        "jianpin": "QY"
    },
    {
        "citycode": "0769",
        "adcode": 441900,
        "level": "city",
        "name": "东莞",
        "fullname": "东莞市",
        "pinyin": "dongguan",
        "jianpin": "DG"
    },
    {
        "citycode": "0760",
        "adcode": 442000,
        "level": "city",
        "name": "中山",
        "fullname": "中山市",
        "pinyin": "zhongshan",
        "jianpin": "ZS"
    },
    {
        "citycode": "0768",
        "adcode": 445100,
        "level": "city",
        "name": "潮州",
        "fullname": "潮州市",
        "pinyin": "chaozhou",
        "jianpin": "CZ"
    },
    {
        "citycode": "0663",
        "adcode": 445200,
        "level": "city",
        "name": "揭阳",
        "fullname": "揭阳市",
        "pinyin": "jieyang",
        "jianpin": "JY"
    },
    {
        "citycode": "0766",
        "adcode": 445300,
        "level": "city",
        "name": "云浮",
        "fullname": "云浮市",
        "pinyin": "yunfu",
        "jianpin": "YF"
    }],
    "pinyin": "guangdong",
    "jianpin": "GD"
},
{
    "adcode": 450000,
    "level": "province",
    "name": "广西",
    "fullname": "广西壮族自治区",
    "districts": [{
        "citycode": "0771",
        "adcode": 450100,
        "level": "city",
        "name": "南宁",
        "fullname": "南宁市",
        "pinyin": "nanning",
        "jianpin": "NN"
    },
    {
        "citycode": "0772",
        "adcode": 450200,
        "level": "city",
        "name": "柳州",
        "fullname": "柳州市",
        "pinyin": "liuzhou",
        "jianpin": "LZ"
    },
    {
        "citycode": "0773",
        "adcode": 450300,
        "level": "city",
        "name": "桂林",
        "fullname": "桂林市",
        "pinyin": "guilin",
        "jianpin": "GL"
    },
    {
        "citycode": "0774",
        "adcode": 450400,
        "level": "city",
        "name": "梧州",
        "fullname": "梧州市",
        "pinyin": "wuzhou",
        "jianpin": "WZ"
    },
    {
        "citycode": "0779",
        "adcode": 450500,
        "level": "city",
        "name": "北海",
        "fullname": "北海市",
        "pinyin": "beihai",
        "jianpin": "BH"
    },
    {
        "citycode": "0770",
        "adcode": 450600,
        "level": "city",
        "name": "防城港",
        "fullname": "防城港市",
        "pinyin": "fangchenggang",
        "jianpin": "FCG"
    },
    {
        "citycode": "0777",
        "adcode": 450700,
        "level": "city",
        "name": "钦州",
        "fullname": "钦州市",
        "pinyin": "qinzhou",
        "jianpin": "QZ"
    },
    {
        "citycode": "1755",
        "adcode": 450800,
        "level": "city",
        "name": "贵港",
        "fullname": "贵港市",
        "pinyin": "guigang",
        "jianpin": "GG"
    },
    {
        "citycode": "0775",
        "adcode": 450900,
        "level": "city",
        "name": "玉林",
        "fullname": "玉林市",
        "pinyin": "yulin",
        "jianpin": "YL"
    },
    {
        "citycode": "0776",
        "adcode": 451000,
        "level": "city",
        "name": "百色",
        "fullname": "百色市",
        "pinyin": "baise",
        "jianpin": "BS"
    },
    {
        "citycode": "1774",
        "adcode": 451100,
        "level": "city",
        "name": "贺州",
        "fullname": "贺州市",
        "pinyin": "hezhou",
        "jianpin": "HZ"
    },
    {
        "citycode": "0778",
        "adcode": 451200,
        "level": "city",
        "name": "河池",
        "fullname": "河池市",
        "pinyin": "hechi",
        "jianpin": "HC"
    },
    {
        "citycode": "1772",
        "adcode": 451300,
        "level": "city",
        "name": "来宾",
        "fullname": "来宾市",
        "pinyin": "laibin",
        "jianpin": "LB"
    },
    {
        "citycode": "1771",
        "adcode": 451400,
        "level": "city",
        "name": "崇左",
        "fullname": "崇左市",
        "pinyin": "chongzuo",
        "jianpin": "CZ"
    }],
    "pinyin": "guangxi",
    "jianpin": "GX"
},
{
    "adcode": 460000,
    "level": "province",
    "name": "海南",
    "fullname": "海南省",
    "districts": [{
        "citycode": "0898",
        "adcode": 460100,
        "level": "city",
        "name": "海口",
        "fullname": "海口市",
        "pinyin": "haikou",
        "jianpin": "HK"
    },
    {
        "citycode": "0899",
        "adcode": 460200,
        "level": "city",
        "name": "三亚",
        "fullname": "三亚市",
        "pinyin": "sanya",
        "jianpin": "SY"
    },
    {
        "citycode": "2898",
        "adcode": 460300,
        "level": "city",
        "name": "三沙",
        "fullname": "三沙市",
        "pinyin": "sansha",
        "jianpin": "SS"
    },
    {
        "citycode": "0805",
        "adcode": 460400,
        "level": "city",
        "name": "儋州",
        "fullname": "儋州市",
        "pinyin": "danzhou",
        "jianpin": "DZ"
    },
    {
        "citycode": "1897",
        "adcode": 469001,
        "level": "city",
        "name": "五指山",
        "fullname": "五指山市",
        "pinyin": "wuzhishan",
        "jianpin": "WZS"
    },
    {
        "citycode": "1894",
        "adcode": 469002,
        "level": "city",
        "name": "琼海",
        "fullname": "琼海市",
        "pinyin": "qionghai",
        "jianpin": "QH"
    },
    {
        "citycode": "1893",
        "adcode": 469005,
        "level": "city",
        "name": "文昌",
        "fullname": "文昌市",
        "pinyin": "wenchang",
        "jianpin": "WC"
    },
    {
        "citycode": "1898",
        "adcode": 469006,
        "level": "city",
        "name": "万宁",
        "fullname": "万宁市",
        "pinyin": "wanning",
        "jianpin": "WN"
    },
    {
        "citycode": "0807",
        "adcode": 469007,
        "level": "city",
        "name": "东方",
        "fullname": "东方市",
        "pinyin": "dongfang",
        "jianpin": "DF"
    },
    {
        "citycode": "0806",
        "adcode": 469021,
        "level": "city",
        "name": "定安县",
        "pinyin": "dinganxian",
        "jianpin": "DAX"
    },
    {
        "citycode": "1892",
        "adcode": 469022,
        "level": "city",
        "name": "屯昌县",
        "pinyin": "tunchangxian",
        "jianpin": "TCX"
    },
    {
        "citycode": "0804",
        "adcode": 469023,
        "level": "city",
        "name": "澄迈县",
        "pinyin": "chengmaixian",
        "jianpin": "CMX"
    },
    {
        "citycode": "1896",
        "adcode": 469024,
        "level": "city",
        "name": "临高县",
        "pinyin": "lingaoxian",
        "jianpin": "LGX"
    },
    {
        "citycode": "0802",
        "adcode": 469025,
        "level": "city",
        "name": "白沙",
        "fullname": "白沙黎族自治县",
        "pinyin": "baisha",
        "jianpin": "BS"
    },
    {
        "citycode": "0803",
        "adcode": 469026,
        "level": "city",
        "name": "昌江",
        "fullname": "昌江黎族自治县",
        "pinyin": "changjiang",
        "jianpin": "CJ"
    },
    {
        "citycode": "2802",
        "adcode": 469027,
        "level": "city",
        "name": "乐东",
        "fullname": "乐东黎族自治县",
        "pinyin": "ledong",
        "jianpin": "LD"
    },
    {
        "citycode": "0809",
        "adcode": 469028,
        "level": "city",
        "name": "陵水",
        "fullname": "陵水黎族自治县",
        "pinyin": "lingshui",
        "jianpin": "LS"
    },
    {
        "citycode": "0801",
        "adcode": 469029,
        "level": "city",
        "name": "保亭",
        "fullname": "保亭黎族苗族自治县",
        "pinyin": "baoting",
        "jianpin": "BT"
    },
    {
        "citycode": "1899",
        "adcode": 469030,
        "level": "city",
        "name": "琼中",
        "fullname": "琼中黎族苗族自治县",
        "pinyin": "qiongzhong",
        "jianpin": "QZ"
    }],
    "pinyin": "hainan",
    "jianpin": "HN"
},
{
    "adcode": 500000,
    "level": "province",
    "name": "重庆",
    "districts": [{
        "citycode": "023",
        "adcode": 500100,
        "level": "city",
        "name": "重庆",
        "fullname": "重庆市",
        "pinyin": "zhongqing",
        "jianpin": "ZQ"
    }],
    "pinyin": "zhongqing",
    "jianpin": "ZQ"
},
{
    "adcode": 510000,
    "level": "province",
    "name": "四川",
    "fullname": "四川省",
    "districts": [{
        "citycode": "028",
        "adcode": 510100,
        "level": "city",
        "name": "成都",
        "fullname": "成都市",
        "pinyin": "chengdu",
        "jianpin": "CD"
    },
    {
        "citycode": "0813",
        "adcode": 510300,
        "level": "city",
        "name": "自贡",
        "fullname": "自贡市",
        "pinyin": "zigong",
        "jianpin": "ZG"
    },
    {
        "citycode": "0812",
        "adcode": 510400,
        "level": "city",
        "name": "攀枝花",
        "fullname": "攀枝花市",
        "pinyin": "panzhihua",
        "jianpin": "PZH"
    },
    {
        "citycode": "0830",
        "adcode": 510500,
        "level": "city",
        "name": "泸州",
        "fullname": "泸州市",
        "pinyin": "luzhou",
        "jianpin": "LZ"
    },
    {
        "citycode": "0838",
        "adcode": 510600,
        "level": "city",
        "name": "德阳",
        "fullname": "德阳市",
        "pinyin": "deyang",
        "jianpin": "DY"
    },
    {
        "citycode": "0816",
        "adcode": 510700,
        "level": "city",
        "name": "绵阳",
        "fullname": "绵阳市",
        "pinyin": "mianyang",
        "jianpin": "MY"
    },
    {
        "citycode": "0839",
        "adcode": 510800,
        "level": "city",
        "name": "广元",
        "fullname": "广元市",
        "pinyin": "guangyuan",
        "jianpin": "GY"
    },
    {
        "citycode": "0825",
        "adcode": 510900,
        "level": "city",
        "name": "遂宁",
        "fullname": "遂宁市",
        "pinyin": "suining",
        "jianpin": "SN"
    },
    {
        "citycode": "1832",
        "adcode": 511000,
        "level": "city",
        "name": "内江",
        "fullname": "内江市",
        "pinyin": "najiang",
        "jianpin": "NJ"
    },
    {
        "citycode": "0833",
        "adcode": 511100,
        "level": "city",
        "name": "乐山",
        "fullname": "乐山市",
        "pinyin": "leshan",
        "jianpin": "LS"
    },
    {
        "citycode": "0817",
        "adcode": 511300,
        "level": "city",
        "name": "南充",
        "fullname": "南充市",
        "pinyin": "nanchong",
        "jianpin": "NC"
    },
    {
        "citycode": "1833",
        "adcode": 511400,
        "level": "city",
        "name": "眉山",
        "fullname": "眉山市",
        "pinyin": "meishan",
        "jianpin": "MS"
    },
    {
        "citycode": "0831",
        "adcode": 511500,
        "level": "city",
        "name": "宜宾",
        "fullname": "宜宾市",
        "pinyin": "yibin",
        "jianpin": "YB"
    },
    {
        "citycode": "0826",
        "adcode": 511600,
        "level": "city",
        "name": "广安",
        "fullname": "广安市",
        "pinyin": "guangan",
        "jianpin": "GA"
    },
    {
        "citycode": "0818",
        "adcode": 511700,
        "level": "city",
        "name": "达州",
        "fullname": "达州市",
        "pinyin": "dazhou",
        "jianpin": "DZ"
    },
    {
        "citycode": "0835",
        "adcode": 511800,
        "level": "city",
        "name": "雅安",
        "fullname": "雅安市",
        "pinyin": "yaan",
        "jianpin": "YA"
    },
    {
        "citycode": "0827",
        "adcode": 511900,
        "level": "city",
        "name": "巴中",
        "fullname": "巴中市",
        "pinyin": "bazhong",
        "jianpin": "BZ"
    },
    {
        "citycode": "0832",
        "adcode": 512000,
        "level": "city",
        "name": "资阳",
        "fullname": "资阳市",
        "pinyin": "ziyang",
        "jianpin": "ZY"
    },
    {
        "citycode": "0837",
        "adcode": 513200,
        "level": "city",
        "name": "阿坝",
        "fullname": "阿坝藏族羌族自治州",
        "pinyin": "aba",
        "jianpin": "AB"
    },
    {
        "citycode": "0836",
        "adcode": 513300,
        "level": "city",
        "name": "甘孜",
        "fullname": "甘孜藏族自治州",
        "pinyin": "ganzi",
        "jianpin": "GZ"
    },
    {
        "citycode": "0834",
        "adcode": 513400,
        "level": "city",
        "name": "凉山",
        "fullname": "凉山彝族自治州",
        "pinyin": "liangshan",
        "jianpin": "LS"
    }],
    "pinyin": "sichuan",
    "jianpin": "SC"
},
{
    "adcode": 520000,
    "level": "province",
    "name": "贵州",
    "fullname": "贵州省",
    "districts": [{
        "citycode": "0851",
        "adcode": 520100,
        "level": "city",
        "name": "贵阳",
        "fullname": "贵阳市",
        "pinyin": "guiyang",
        "jianpin": "GY"
    },
    {
        "citycode": "0858",
        "adcode": 520200,
        "level": "city",
        "name": "六盘水",
        "fullname": "六盘水市",
        "pinyin": "liupanshui",
        "jianpin": "LPS"
    },
    {
        "citycode": "0852",
        "adcode": 520300,
        "level": "city",
        "name": "遵义",
        "fullname": "遵义市",
        "pinyin": "zunyi",
        "jianpin": "ZY"
    },
    {
        "citycode": "0853",
        "adcode": 520400,
        "level": "city",
        "name": "安顺",
        "fullname": "安顺市",
        "pinyin": "anshun",
        "jianpin": "AS"
    },
    {
        "citycode": "0857",
        "adcode": 520500,
        "level": "city",
        "name": "毕节",
        "fullname": "毕节市",
        "pinyin": "bijie",
        "jianpin": "BJ"
    },
    {
        "citycode": "0856",
        "adcode": 520600,
        "level": "city",
        "name": "铜仁",
        "fullname": "铜仁市",
        "pinyin": "tongren",
        "jianpin": "TR"
    },
    {
        "citycode": "0859",
        "adcode": 522300,
        "level": "city",
        "name": "黔西南",
        "fullname": "黔西南布依族苗族自治州",
        "pinyin": "qianxinan",
        "jianpin": "QXN"
    },
    {
        "citycode": "0855",
        "adcode": 522600,
        "level": "city",
        "name": "黔东南",
        "fullname": "黔东南苗族侗族自治州",
        "pinyin": "qiandongnan",
        "jianpin": "QDN"
    },
    {
        "citycode": "0854",
        "adcode": 522700,
        "level": "city",
        "name": "黔南",
        "fullname": "黔南布依族苗族自治州",
        "pinyin": "qiannan",
        "jianpin": "QN"
    }],
    "pinyin": "guizhou",
    "jianpin": "GZ"
},
{
    "adcode": 530000,
    "level": "province",
    "name": "云南",
    "fullname": "云南省",
    "districts": [{
        "citycode": "0871",
        "adcode": 530100,
        "level": "city",
        "name": "昆明",
        "fullname": "昆明市",
        "pinyin": "kunming",
        "jianpin": "KM"
    },
    {
        "citycode": "0874",
        "adcode": 530300,
        "level": "city",
        "name": "曲靖",
        "fullname": "曲靖市",
        "pinyin": "qujing",
        "jianpin": "QJ"
    },
    {
        "citycode": "0877",
        "adcode": 530400,
        "level": "city",
        "name": "玉溪",
        "fullname": "玉溪市",
        "pinyin": "yuxi",
        "jianpin": "YX"
    },
    {
        "citycode": "0875",
        "adcode": 530500,
        "level": "city",
        "name": "保山",
        "fullname": "保山市",
        "pinyin": "baoshan",
        "jianpin": "BS"
    },
    {
        "citycode": "0870",
        "adcode": 530600,
        "level": "city",
        "name": "昭通",
        "fullname": "昭通市",
        "pinyin": "zhaotong",
        "jianpin": "ZT"
    },
    {
        "citycode": "0888",
        "adcode": 530700,
        "level": "city",
        "name": "丽江",
        "fullname": "丽江市",
        "pinyin": "lijiang",
        "jianpin": "LJ"
    },
    {
        "citycode": "0879",
        "adcode": 530800,
        "level": "city",
        "name": "普洱",
        "fullname": "普洱市",
        "pinyin": "puer",
        "jianpin": "PE"
    },
    {
        "citycode": "0883",
        "adcode": 530900,
        "level": "city",
        "name": "临沧",
        "fullname": "临沧市",
        "pinyin": "lincang",
        "jianpin": "LC"
    },
    {
        "citycode": "0878",
        "adcode": 532300,
        "level": "city",
        "name": "楚雄",
        "fullname": "楚雄彝族自治州",
        "pinyin": "chuxiong",
        "jianpin": "CX"
    },
    {
        "citycode": "0873",
        "adcode": 532500,
        "level": "city",
        "name": "红河",
        "fullname": "红河哈尼族彝族自治州",
        "pinyin": "honghe",
        "jianpin": "HH"
    },
    {
        "citycode": "0876",
        "adcode": 532600,
        "level": "city",
        "name": "文山",
        "fullname": "文山壮族苗族自治州",
        "pinyin": "wenshan",
        "jianpin": "WS"
    },
    {
        "citycode": "0691",
        "adcode": 532800,
        "level": "city",
        "name": "西双版纳",
        "fullname": "西双版纳傣族自治州",
        "pinyin": "xishuangbanna",
        "jianpin": "XSBN"
    },
    {
        "citycode": "0872",
        "adcode": 532900,
        "level": "city",
        "name": "大理",
        "fullname": "大理白族自治州",
        "pinyin": "dali",
        "jianpin": "DL"
    },
    {
        "citycode": "0692",
        "adcode": 533100,
        "level": "city",
        "name": "德宏",
        "fullname": "德宏傣族景颇族自治州",
        "pinyin": "dehong",
        "jianpin": "DH"
    },
    {
        "citycode": "0886",
        "adcode": 533300,
        "level": "city",
        "name": "怒江",
        "fullname": "怒江傈僳族自治州",
        "pinyin": "nujiang",
        "jianpin": "NJ"
    },
    {
        "citycode": "0887",
        "adcode": 533400,
        "level": "city",
        "name": "迪庆",
        "fullname": "迪庆藏族自治州",
        "pinyin": "diqing",
        "jianpin": "DQ"
    }],
    "pinyin": "yunnan",
    "jianpin": "YN"
},
{
    "adcode": 540000,
    "level": "province",
    "name": "西藏",
    "fullname": "西藏自治区",
    "districts": [{
        "citycode": "0891",
        "adcode": 540100,
        "level": "city",
        "name": "拉萨",
        "fullname": "拉萨市",
        "pinyin": "lasa",
        "jianpin": "LS"
    },
    {
        "citycode": "0892",
        "adcode": 540200,
        "level": "city",
        "name": "日喀则",
        "fullname": "日喀则市",
        "pinyin": "rikaze",
        "jianpin": "RKZ"
    },
    {
        "citycode": "0895",
        "adcode": 540300,
        "level": "city",
        "name": "昌都",
        "fullname": "昌都市",
        "pinyin": "changdu",
        "jianpin": "CD"
    },
    {
        "citycode": "0893",
        "adcode": 540500,
        "level": "city",
        "name": "山南",
        "fullname": "山南市",
        "pinyin": "shannan",
        "jianpin": "SN"
    },
    {
        "citycode": "0896",
        "adcode": 542400,
        "level": "city",
        "name": "那曲",
        "fullname": "那曲地区",
        "pinyin": "naqu",
        "jianpin": "NQ"
    },
    {
        "citycode": "0897",
        "adcode": 542500,
        "level": "city",
        "name": "阿里",
        "fullname": "阿里地区",
        "pinyin": "ali",
        "jianpin": "AL"
    },
    {
        "citycode": "0894",
        "adcode": 540400,
        "level": "city",
        "name": "林芝",
        "fullname": "林芝市",
        "pinyin": "linzhi",
        "jianpin": "LZ"
    }],
    "pinyin": "xizang",
    "jianpin": "XZ"
},
{
    "adcode": 610000,
    "level": "province",
    "name": "陕西",
    "fullname": "陕西省",
    "districts": [{
        "citycode": "029",
        "adcode": 610100,
        "level": "city",
        "name": "西安",
        "fullname": "西安市",
        "pinyin": "xian",
        "jianpin": "XA"
    },
    {
        "citycode": "0919",
        "adcode": 610200,
        "level": "city",
        "name": "铜川",
        "fullname": "铜川市",
        "pinyin": "tongchuan",
        "jianpin": "TC"
    },
    {
        "citycode": "0917",
        "adcode": 610300,
        "level": "city",
        "name": "宝鸡",
        "fullname": "宝鸡市",
        "pinyin": "baoji",
        "jianpin": "BJ"
    },
    {
        "citycode": "0910",
        "adcode": 610400,
        "level": "city",
        "name": "咸阳",
        "fullname": "咸阳市",
        "pinyin": "xianyang",
        "jianpin": "XY"
    },
    {
        "citycode": "0913",
        "adcode": 610500,
        "level": "city",
        "name": "渭南",
        "fullname": "渭南市",
        "pinyin": "weinan",
        "jianpin": "WN"
    },
    {
        "citycode": "0911",
        "adcode": 610600,
        "level": "city",
        "name": "延安",
        "fullname": "延安市",
        "pinyin": "yanan",
        "jianpin": "YA"
    },
    {
        "citycode": "0916",
        "adcode": 610700,
        "level": "city",
        "name": "汉中",
        "fullname": "汉中市",
        "pinyin": "hanzhong",
        "jianpin": "HZ"
    },
    {
        "citycode": "0912",
        "adcode": 610800,
        "level": "city",
        "name": "榆林",
        "fullname": "榆林市",
        "pinyin": "yulin",
        "jianpin": "YL"
    },
    {
        "citycode": "0915",
        "adcode": 610900,
        "level": "city",
        "name": "安康",
        "fullname": "安康市",
        "pinyin": "ankang",
        "jianpin": "AK"
    },
    {
        "citycode": "0914",
        "adcode": 611000,
        "level": "city",
        "name": "商洛",
        "fullname": "商洛市",
        "pinyin": "shangluo",
        "jianpin": "SL"
    }],
    "pinyin": "shanxi",
    "jianpin": "SX"
},
{
    "adcode": 620000,
    "level": "province",
    "name": "甘肃",
    "fullname": "甘肃省",
    "districts": [{
        "citycode": "0931",
        "adcode": 620100,
        "level": "city",
        "name": "兰州",
        "fullname": "兰州市",
        "pinyin": "lanzhou",
        "jianpin": "LZ"
    },
    {
        "citycode": "1937",
        "adcode": 620200,
        "level": "city",
        "name": "嘉峪关",
        "fullname": "嘉峪关市",
        "pinyin": "jiayuguan",
        "jianpin": "JYG"
    },
    {
        "citycode": "0935",
        "adcode": 620300,
        "level": "city",
        "name": "金昌",
        "fullname": "金昌市",
        "pinyin": "jinchang",
        "jianpin": "JC"
    },
    {
        "citycode": "0943",
        "adcode": 620400,
        "level": "city",
        "name": "白银",
        "fullname": "白银市",
        "pinyin": "baiyin",
        "jianpin": "BY"
    },
    {
        "citycode": "0938",
        "adcode": 620500,
        "level": "city",
        "name": "天水",
        "fullname": "天水市",
        "pinyin": "tianshui",
        "jianpin": "TS"
    },
    {
        "citycode": "1935",
        "adcode": 620600,
        "level": "city",
        "name": "武威",
        "fullname": "武威市",
        "pinyin": "wuwei",
        "jianpin": "WW"
    },
    {
        "citycode": "0936",
        "adcode": 620700,
        "level": "city",
        "name": "张掖",
        "fullname": "张掖市",
        "pinyin": "zhangye",
        "jianpin": "ZY"
    },
    {
        "citycode": "0933",
        "adcode": 620800,
        "level": "city",
        "name": "平凉",
        "fullname": "平凉市",
        "pinyin": "pingliang",
        "jianpin": "PL"
    },
    {
        "citycode": "0937",
        "adcode": 620900,
        "level": "city",
        "name": "酒泉",
        "fullname": "酒泉市",
        "pinyin": "jiuquan",
        "jianpin": "JQ"
    },
    {
        "citycode": "0934",
        "adcode": 621000,
        "level": "city",
        "name": "庆阳",
        "fullname": "庆阳市",
        "pinyin": "qingyang",
        "jianpin": "QY"
    },
    {
        "citycode": "0932",
        "adcode": 621100,
        "level": "city",
        "name": "定西",
        "fullname": "定西市",
        "pinyin": "dingxi",
        "jianpin": "DX"
    },
    {
        "citycode": "2935",
        "adcode": 621200,
        "level": "city",
        "name": "陇南",
        "fullname": "陇南市",
        "pinyin": "longnan",
        "jianpin": "LN"
    },
    {
        "citycode": "0930",
        "adcode": 622900,
        "level": "city",
        "name": "临夏",
        "fullname": "临夏回族自治州",
        "pinyin": "linxia",
        "jianpin": "LX"
    },
    {
        "citycode": "0941",
        "adcode": 623000,
        "level": "city",
        "name": "甘南",
        "fullname": "甘南藏族自治州",
        "pinyin": "gannan",
        "jianpin": "GN"
    }],
    "pinyin": "gansu",
    "jianpin": "GS"
},
{
    "adcode": 630000,
    "level": "province",
    "name": "青海",
    "fullname": "青海省",
    "districts": [{
        "citycode": "0971",
        "adcode": 630100,
        "level": "city",
        "name": "西宁",
        "fullname": "西宁市",
        "pinyin": "xining",
        "jianpin": "XN"
    },
    {
        "citycode": "0972",
        "adcode": 630200,
        "level": "city",
        "name": "海东",
        "fullname": "海东市",
        "pinyin": "haidong",
        "jianpin": "HD"
    },
    {
        "citycode": "0970",
        "adcode": 632200,
        "level": "city",
        "name": "海北",
        "fullname": "海北藏族自治州",
        "pinyin": "haibei",
        "jianpin": "HB"
    },
    {
        "citycode": "0973",
        "adcode": 632300,
        "level": "city",
        "name": "黄南",
        "fullname": "黄南藏族自治州",
        "pinyin": "huangnan",
        "jianpin": "HN"
    },
    {
        "citycode": "0974",
        "adcode": 632500,
        "level": "city",
        "name": "海南",
        "fullname": "海南藏族自治州",
        "pinyin": "hainan",
        "jianpin": "HN"
    },
    {
        "citycode": "0975",
        "adcode": 632600,
        "level": "city",
        "name": "果洛",
        "fullname": "果洛藏族自治州",
        "pinyin": "guoluo",
        "jianpin": "GL"
    },
    {
        "citycode": "0976",
        "adcode": 632700,
        "level": "city",
        "name": "玉树",
        "fullname": "玉树藏族自治州",
        "pinyin": "yushu",
        "jianpin": "YS"
    },
    {
        "citycode": "0977",
        "adcode": 632800,
        "level": "city",
        "name": "海西",
        "fullname": "海西蒙古族藏族自治州",
        "pinyin": "haixi",
        "jianpin": "HX"
    }],
    "pinyin": "qinghai",
    "jianpin": "QH"
},
{
    "adcode": 640000,
    "level": "province",
    "name": "宁夏",
    "fullname": "宁夏回族自治区",
    "districts": [{
        "citycode": "0951",
        "adcode": 640100,
        "level": "city",
        "name": "银川",
        "fullname": "银川市",
        "pinyin": "yinchuan",
        "jianpin": "YC"
    },
    {
        "citycode": "0952",
        "adcode": 640200,
        "level": "city",
        "name": "石嘴山",
        "fullname": "石嘴山市",
        "pinyin": "shizuishan",
        "jianpin": "SZS"
    },
    {
        "citycode": "0953",
        "adcode": 640300,
        "level": "city",
        "name": "吴忠",
        "fullname": "吴忠市",
        "pinyin": "wuzhong",
        "jianpin": "WZ"
    },
    {
        "citycode": "0954",
        "adcode": 640400,
        "level": "city",
        "name": "固原",
        "fullname": "固原市",
        "pinyin": "guyuan",
        "jianpin": "GY"
    },
    {
        "citycode": "1953",
        "adcode": 640500,
        "level": "city",
        "name": "中卫",
        "fullname": "中卫市",
        "pinyin": "zhongwei",
        "jianpin": "ZW"
    }],
    "pinyin": "ningxia",
    "jianpin": "NX"
},
{
    "adcode": 650000,
    "level": "province",
    "name": "新疆",
    "fullname": "新疆维吾尔自治区",
    "districts": [{
        "citycode": "0991",
        "adcode": 650100,
        "level": "city",
        "name": "乌鲁木齐",
        "fullname": "乌鲁木齐市",
        "pinyin": "wulumuqi",
        "jianpin": "WLMQ"
    },
    {
        "citycode": "0990",
        "adcode": 650200,
        "level": "city",
        "name": "克拉玛依",
        "fullname": "克拉玛依市",
        "pinyin": "kelamayi",
        "jianpin": "KLMY"
    },
    {
        "citycode": "0995",
        "adcode": 650400,
        "level": "city",
        "name": "吐鲁番",
        "fullname": "吐鲁番市",
        "pinyin": "tulufan",
        "jianpin": "TLF"
    },
    {
        "citycode": "0902",
        "adcode": 650500,
        "level": "city",
        "name": "哈密",
        "fullname": "哈密市",
        "pinyin": "hami",
        "jianpin": "HM"
    },
    {
        "citycode": "0994",
        "adcode": 652300,
        "level": "city",
        "name": "昌吉",
        "fullname": "昌吉回族自治州",
        "pinyin": "changji",
        "jianpin": "CJ"
    },
    {
        "citycode": "0909",
        "adcode": 652700,
        "level": "city",
        "name": "博尔塔拉",
        "fullname": "博尔塔拉蒙古自治州",
        "pinyin": "boertala",
        "jianpin": "BETL"
    },
    {
        "citycode": "0996",
        "adcode": 652800,
        "level": "city",
        "name": "巴州",
        "fullname": "巴音郭楞蒙古自治州",
        "pinyin": "bazhou",
        "jianpin": "BZ"
    },
    {
        "citycode": "0997",
        "adcode": 652900,
        "level": "city",
        "name": "阿克苏",
        "fullname": "阿克苏地区",
        "pinyin": "akesu",
        "jianpin": "AKS"
    },
    {
        "citycode": "0908",
        "adcode": 653000,
        "level": "city",
        "name": "克州",
        "fullname": "克孜勒苏柯尔克孜自治州",
        "pinyin": "kezhou",
        "jianpin": "KZ"
    },
    {
        "citycode": "0998",
        "adcode": 653100,
        "level": "city",
        "name": "喀什",
        "fullname": "喀什地区",
        "pinyin": "kashi",
        "jianpin": "KS"
    },
    {
        "citycode": "0903",
        "adcode": 653200,
        "level": "city",
        "name": "和田",
        "fullname": "和田地区",
        "pinyin": "hetian",
        "jianpin": "HT"
    },
    {
        "citycode": "0999",
        "adcode": 654000,
        "level": "city",
        "name": "伊犁",
        "fullname": "伊犁哈萨克自治州",
        "pinyin": "yili",
        "jianpin": "YL"
    },
    {
        "citycode": "0901",
        "adcode": 654200,
        "level": "city",
        "name": "塔城",
        "fullname": "塔城地区",
        "pinyin": "tacheng",
        "jianpin": "TC"
    },
    {
        "citycode": "0906",
        "adcode": 654300,
        "level": "city",
        "name": "阿勒泰",
        "fullname": "阿勒泰地区",
        "pinyin": "aletai",
        "jianpin": "ALT"
    },
    {
        "citycode": "0993",
        "adcode": 659001,
        "level": "city",
        "name": "石河子",
        "fullname": "石河子市",
        "pinyin": "shihezi",
        "jianpin": "SHZ"
    },
    {
        "citycode": "1997",
        "adcode": 659002,
        "level": "city",
        "name": "阿拉尔",
        "fullname": "阿拉尔市",
        "pinyin": "alaer",
        "jianpin": "ALE"
    },
    {
        "citycode": "1998",
        "adcode": 659003,
        "level": "city",
        "name": "图木舒克",
        "fullname": "图木舒克市",
        "pinyin": "tumushuke",
        "jianpin": "TMSK"
    },
    {
        "citycode": "1994",
        "adcode": 659004,
        "level": "city",
        "name": "五家渠",
        "fullname": "五家渠市",
        "pinyin": "wujiaqu",
        "jianpin": "WJQ"
    },
    {
        "citycode": "1906",
        "adcode": 659005,
        "level": "city",
        "name": "北屯",
        "fullname": "北屯市",
        "pinyin": "beitun",
        "jianpin": "BT"
    },
    {
        "citycode": "1996",
        "adcode": 659006,
        "level": "city",
        "name": "铁门关",
        "fullname": "铁门关市",
        "pinyin": "tiemenguan",
        "jianpin": "TMG"
    },
    {
        "citycode": "1909",
        "adcode": 659007,
        "level": "city",
        "name": "双河",
        "fullname": "双河市",
        "pinyin": "shuanghe",
        "jianpin": "SH"
    },
    {
        "citycode": "1999",
        "adcode": 659008,
        "level": "city",
        "name": "可克达拉",
        "fullname": "可克达拉市",
        "pinyin": "kekedala",
        "jianpin": "KKDL"
    },
    {
        "citycode": "1903",
        "adcode": 659009,
        "level": "city",
        "name": "昆玉",
        "fullname": "昆玉市",
        "pinyin": "kunyu",
        "jianpin": "KY"
    }],
    "pinyin": "xinjiang",
    "jianpin": "XJ"
}]

export default DATA_CITYS;