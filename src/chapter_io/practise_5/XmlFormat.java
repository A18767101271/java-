package chapter_io.practise_5;

import org.dom4j.Document;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import java.io.StringReader;
import java.io.StringWriter;

/**
 * Created by wislie on 2018/10/15.
 */
public class XmlFormat {

    public static String format(String str) throws Exception {
        SAXReader reader = new SAXReader();
        // System.out.println(reader);
        // 注释：创建一个串的字符输入流
        StringReader in = new StringReader(str);
        Document doc = reader.read(in);
        // System.out.println(doc.getRootElement());
        // 注释：创建输出格式
        OutputFormat formater = OutputFormat.createPrettyPrint();
        //formater=OutputFormat.createCompactFormat();
        // 注释：设置xml的输出编码
        formater.setEncoding("utf-8");
        // 注释：创建输出(目标)
        StringWriter out = new StringWriter();
        // 注释：创建输出流
        XMLWriter writer = new XMLWriter(out, formater);
        // 注释：输出格式化的串到目标中，执行后。格式化后的串保存在out中。
        writer.write(doc);

        writer.close();
        System.out.println(out.toString());
        // 注释：返回我们格式化后的结果
        return out.toString();
    }

    public static void main(String[] args) throws Exception {
        String head="<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>";
        String str  = "<country_code><item name=\"阿鲁巴\" code=\"533\" /><item name=\"阿富汗\" code=\"004\" /><item name=\"安哥拉共和国\" code=\"024\" /><item name=\"安圭拉\" code=\"660\" /><item name=\"阿尔巴尼亚共和国\" code=\"008\" /><item name=\"安道尔公国\" code=\"014\" /><item name=\"荷属安的列斯\" code=\"530\" /><item name=\"阿拉伯联合酋长国\" code=\"784\" /><item name=\"阿根廷共和国\" code=\"032\" /><item name=\"亚美尼亚共和国\" code=\"051\" /><item name=\"美属萨摩亚\" code=\"016\" /><item name=\"南极洲\" code=\"010\" /><item name=\"法属南部领土\" code=\"260\" /><item name=\"安提瓜和巴布达\" code=\"028\" /><item name=\"澳大利亚联邦\" code=\"036\" /><item name=\"奥地利共和国\" code=\"040\" /><item name=\"阿塞拜疆共和国\" code=\"031\" /><item name=\"布隆迪共和国\" code=\"108\" /><item name=\"比利时王国\" code=\"056\" /><item name=\"贝宁共和国\" code=\"204\" /><item name=\"布基纳法索\" code=\"854\" /><item name=\"孟加拉人民共和国\" code=\"050\" /><item name=\"保加利亚共和国\" code=\"100\" /><item name=\"巴林国\" code=\"048\" /><item name=\"巴哈马联邦\" code=\"044\" /><item name=\"波斯尼亚和黑塞哥维那\" code=\"070\" /><item name=\"白俄罗斯共和国\" code=\"112\" /><item name=\"伯利兹\" code=\"084\" /><item name=\"百慕大\" code=\"060\" /><item name=\"玻利维亚共和国\" code=\"068\" /><item name=\"巴西联邦共和国\" code=\"076\" /><item name=\"巴巴多斯\" code=\"052\" /><item name=\"文莱达鲁萨兰国\" code=\"096\" /><item name=\"不丹王国\" code=\"064\" /><item name=\"布维岛\" code=\"074\" /><item name=\"博茨瓦纳共和国\" code=\"072\" /><item name=\"中非共和国\" code=\"140\" /><item name=\"加拿大\" code=\"124\" /><item name=\"科科斯(基林)群岛\" code=\"166\" /><item name=\"瑞士联邦\" code=\"756\" /><item name=\"智利共和国\" code=\"152\" /><item name=\"中华人民共和国\" code=\"156\" /><item name=\"科特迪瓦共和国\" code=\"384\" /><item name=\"喀麦隆共和国\" code=\"120\" /><item name=\"刚果民主共和国\" code=\"180\" /><item name=\"刚果共和国\" code=\"178\" /><item name=\"库克群岛\" code=\"184\" /><item name=\"哥伦比亚共和国\" code=\"170\" /><item name=\"科摩罗伊斯兰联邦共和国\" code=\"174\" /><item name=\"佛得角共和国\" code=\"132\" /><item name=\"哥斯达黎加共和国\" code=\"188\" /><item name=\"古巴共和国\" code=\"192\" /><item name=\"圣诞岛\" code=\"162\" /><item name=\"开曼群岛\" code=\"136\" /><item name=\"塞浦路斯共和国\" code=\"196\" /><item name=\"捷克共和国\" code=\"203\" /><item name=\"德意志联邦共和国\" code=\"276\" /><item name=\"吉布提共和国\" code=\"262\" /><item name=\"多米尼克国\" code=\"212\" /><item name=\"丹麦王国\" code=\"208\" /><item name=\"多米尼加共和国\" code=\"214\" /><item name=\"阿尔及利亚民主人民共和国\" code=\"012\" /><item name=\"厄瓜多尔共和国\" code=\"218\" /><item name=\"阿拉伯埃及共和国\" code=\"818\" /><item name=\"厄立特里亚国\" code=\"232\" /><item name=\"西撒哈拉\" code=\"732\" /><item name=\"西班牙王国\" code=\"724\" /><item name=\"爱沙尼亚共和国\" code=\"233\" /><item name=\"埃塞俄比亚联邦民主共和国\" code=\"231\" /><item name=\"芬兰共和国\" code=\"246\" /><item name=\"斐济群岛共和国\" code=\"242\" /><item name=\"福克兰群岛（马尔维纳斯）\" code=\"238\" /><item name=\"法兰西共和国\" code=\"250\" /><item name=\"法罗群岛\" code=\"234\" /><item name=\"密克罗尼西亚联邦\" code=\"583\" /><item name=\"加蓬共和国\" code=\"266\" /><item name=\"大不列颠及北爱尔兰联合王国\" code=\"826\" /><item name=\"格鲁吉亚\" code=\"268\" /><item name=\"加纳共和国\" code=\"288\" /><item name=\"直布罗陀\" code=\"292\" /><item name=\"几内亚共和国\" code=\"324\" /><item name=\"瓜德罗普\" code=\"312\" /><item name=\"冈比亚共和国\" code=\"270\" /><item name=\"几内亚比绍共和国\" code=\"624\" /><item name=\"赤道几内亚共和国\" code=\"226\" /><item name=\"希腊共和国\" code=\"300\" /><item name=\"格林纳达\" code=\"308\" /><item name=\"格陵兰\" code=\"304\" /><item name=\"危地马拉共和国\" code=\"320\" /><item name=\"法属圭亚那\" code=\"254\" /><item name=\"关岛\" code=\"316\" /><item name=\"圭亚那合作共和国\" code=\"328\" /><item name=\"中国香港特别行政区\" code=\"344\" /><item name=\"赫德岛和麦克唐纳岛\" code=\"334\" /><item name=\"洪都拉斯共和国\" code=\"340\" /><item name=\"克罗地亚共和国\" code=\"191\" /><item name=\"海地共和国\" code=\"332\" /><item name=\"匈牙利共和国\" code=\"348\" /><item name=\"印度尼西亚共和国\" code=\"360\" /><item name=\"印度共和国\" code=\"356\" /><item name=\"英属印度洋领地\" code=\"086\" /><item name=\"爱尔兰\" code=\"372\" /><item name=\"伊朗伊斯兰共和国\" code=\"364\" /><item name=\"伊拉克共和国\" code=\"368\" /><item name=\"冰岛共和国\" code=\"352\" /><item name=\"以色列国\" code=\"376\" /><item name=\"意大利共和国\" code=\"380\" /><item name=\"牙买加\" code=\"388\" /><item name=\"约旦哈希姆王国\" code=\"400\" /><item name=\"日本国\" code=\"392\" /><item name=\"哈萨克斯坦共和国\" code=\"398\" /><item name=\"肯尼亚共和国\" code=\"404\" /><item name=\"吉尔吉斯共和国\" code=\"417\" /><item name=\"柬埔寨王国\" code=\"116\" /><item name=\"基里巴斯共和国\" code=\"296\" /><item name=\"圣基茨和尼维斯联邦\" code=\"659\" /><item name=\"大韩民国\" code=\"410\" /><item name=\"科威特国\" code=\"414\" /><item name=\"老挝人民民主共和国\" code=\"418\" /><item name=\"黎巴嫩共和国\" code=\"422\" /><item name=\"利比里亚共和国\" code=\"430\" /><item name=\"大阿拉伯利比亚人民社会主义民众国\" code=\"434\" /><item name=\"圣卢西亚\" code=\"662\" /><item name=\"列支敦士登公国\" code=\"438\" /><item name=\"斯里兰卡民主社会主义共和国\" code=\"144\" /><item name=\"莱索托王国\" code=\"426\" /><item name=\"立陶宛共和国\" code=\"440\" /><item name=\"卢森堡大公国\" code=\"442\" /><item name=\"拉脱维亚共和国\" code=\"428\" /><item name=\"中国澳门特别行政区\" code=\"446\" /><item name=\"摩洛哥王国\" code=\"504\" /><item name=\"摩纳哥公国\" code=\"492\" /><item name=\"摩尔多瓦共和国\" code=\"498\" /><item name=\"马达加斯加共和国\" code=\"450\" /><item name=\"马尔代夫共和国\" code=\"462\" /><item name=\"墨西哥合众国\" code=\"484\" /><item name=\"马绍尔群岛共和国\" code=\"584\" /><item name=\"前南斯拉夫马其顿共和国\" code=\"807\" /><item name=\"马里共和国\" code=\"466\" /><item name=\"马耳他共和国\" code=\"470\" /><item name=\"缅甸联邦\" code=\"104\" /><item name=\"蒙古国\" code=\"496\" /><item name=\"北马里亚纳自由联邦\" code=\"580\" /><item name=\"莫桑比克共和国\" code=\"508\" /><item name=\"毛里塔尼亚伊斯兰共和国\" code=\"478\" /><item name=\"蒙特赛拉特\" code=\"500\" /><item name=\"马提尼克\" code=\"474\" /><item name=\"毛里求斯共和国\" code=\"480\" /><item name=\"马拉维共和国\" code=\"454\" /><item name=\"马来西亚\" code=\"458\" /><item name=\"马约特\" code=\"175\" /><item name=\"纳米比亚共和国\" code=\"516\" /><item name=\"新喀里多尼亚\" code=\"540\" /><item name=\"尼日尔共和国\" code=\"562\" /><item name=\"诺福克岛\" code=\"574\" /><item name=\"尼日利亚联邦共和国\" code=\"566\" /><item name=\"尼加拉瓜共和国\" code=\"558\" /><item name=\"纽埃\" code=\"570\" /><item name=\"荷兰王国\" code=\"528\" /><item name=\"挪威王国\" code=\"578\" /><item name=\"尼泊尔王国\" code=\"524\" /><item name=\"瑙鲁共和国\" code=\"520\" /><item name=\"新西兰\" code=\"554\" /><item name=\"阿曼苏丹国\" code=\"512\" /><item name=\"巴基斯坦伊斯兰共和国\" code=\"586\" /><item name=\"巴拿马共和国\" code=\"591\" /><item name=\"皮特凯恩\" code=\"612\" /><item name=\"秘鲁共和国\" code=\"604\" /><item name=\"菲律宾共和国\" code=\"608\" /><item name=\"帕劳共和国\" code=\"585\" /><item name=\"巴布亚新几内亚独立国\" code=\"598\" /><item name=\"波兰共和国\" code=\"616\" /><item name=\"波多黎各\" code=\"630\" /><item name=\"朝鲜民主主义人民共和国\" code=\"408\" /><item name=\"葡萄牙共和国\" code=\"620\" /><item name=\"巴拉圭共和国\" code=\"600\" /><item name=\"巴勒斯坦国\" code=\"275\" /><item name=\"法属波利尼西亚\" code=\"258\" /><item name=\"卡塔尔国\" code=\"634\" /><item name=\"留尼汪\" code=\"638\" /><item name=\"罗马尼亚\" code=\"642\" /><item name=\"俄罗斯联邦\" code=\"643\" /><item name=\"卢旺达共和国\" code=\"646\" /><item name=\"沙特阿拉伯王国\" code=\"682\" /><item name=\"苏丹共和国\" code=\"736\" /><item name=\"塞内加尔共和国\" code=\"686\" /><item name=\"新加坡共和国\" code=\"702\" /><item name=\"南乔治亚岛和南桑德韦奇岛\" code=\"239\" /><item name=\"圣赫勒拿\" code=\"654\" /><item name=\"斯瓦尔巴岛和扬马延岛\" code=\"744\" /><item name=\"所罗门群岛\" code=\"090\" /><item name=\"塞拉里昂共和国\" code=\"694\" /><item name=\"萨尔瓦多共和国\" code=\"222\" /><item name=\"圣马力诺共和国\" code=\"674\" /><item name=\"索马里共和国\" code=\"706\" /><item name=\"圣皮埃尔和密克隆\" code=\"666\" /><item name=\"圣多美和普林西比民主共和国\" code=\"678\" /><item name=\"苏里南共和国\" code=\"740\" /><item name=\"斯洛伐克共和国\" code=\"703\" /><item name=\"斯洛文尼亚共和国\" code=\"705\" /><item name=\"瑞典王国\" code=\"752\" /><item name=\"斯威士兰王国\" code=\"748\" /><item name=\"塞舌尔共和国\" code=\"690\" /><item name=\"阿拉伯叙利亚共和国\" code=\"760\" /><item name=\"特克斯和凯科斯群岛\" code=\"796\" /><item name=\"乍得共和国\" code=\"148\" /><item name=\"多哥共和国\" code=\"768\" /><item name=\"泰王国\" code=\"764\" /><item name=\"塔吉克斯坦共和国\" code=\"762\" /><item name=\"托克劳\" code=\"772\" /><item name=\"土库曼斯坦\" code=\"795\" /><item name=\"东帝汶\" code=\"626\" /><item name=\"汤加王国\" code=\"776\" /><item name=\"特立尼达和多巴哥共和国\" code=\"780\" /><item name=\"突尼斯共和国\" code=\"788\" /><item name=\"土耳其共和国\" code=\"792\" /><item name=\"图瓦卢\" code=\"798\" /><item name=\"中国台湾\" code=\"158\" /><item name=\"坦桑尼亚联合共和国\" code=\"834\" /><item name=\"乌干达共和国\" code=\"800\" /><item name=\"乌克兰\" code=\"804\" /><item name=\"美国本土外小岛屿\" code=\"581\" /><item name=\"乌拉圭东岸共和国\" code=\"858\" /><item name=\"美利坚合众国\" code=\"840\" /><item name=\"乌兹别克斯坦共和国\" code=\"860\" /><item name=\"梵蒂冈城国\" code=\"336\" /><item name=\"圣文森特和格林纳丁斯\" code=\"670\" /><item name=\"委内瑞拉共和国\" code=\"862\" /><item name=\"英属维尔京群岛\" code=\"092\" /><item name=\"美属维尔京群岛\" code=\"850\" /><item name=\"越南社会主义共和国\" code=\"704\" /><item name=\"瓦努阿图共和国\" code=\"548\" /><item name=\"瓦利斯和富图纳\" code=\"876\" /><item name=\"萨摩亚独立国\" code=\"882\" /><item name=\"也门共和国\" code=\"887\" /><item name=\"南斯拉夫联盟共和国\" code=\"891\" /><item name=\"南非共和国\" code=\"710\" /><item name=\"赞比亚共和国\" code=\"894\" /><item name=\"津巴布韦共和国\" code=\"716\" /></country_code>";// System.out.println(str);
        format(str);
    }





}