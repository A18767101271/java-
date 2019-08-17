package chapter_io.practise_5.sample_1;


import org.jdom2.*;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;


import java.io.*;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by wislie on 2019/7/1.
 */
public class JDomTest {

    //xml文件路径
    private static final String XML_PATH = "test.xml";
    //被替换内容的正则表达式 可以自己定义
    private static final String REGEX = "[#]query[(]\"\\S+\"[)]$";

    private static final String NODE_ADDR = "sellerid";

    private static final Map<String, String> mNodeMap = new TreeMap<>();


    public static void main(String[] args) {
        Document document = readJDom(XML_PATH);
        // 4.通过document对象获取xml文件的根节点
        Element rootElement = document.getRootElement();
        //修改Element的值
//        recursiveUpdateElement(rootElement, NODE_ADDR, REGEX, "12345");

        mNodeMap.put("sellerid", "111");
        mNodeMap.put("customerid", "222");
        mNodeMap.put("customername", "333");
        mNodeMap.put("id", "444");
        recursiveUpdateElement(rootElement, mNodeMap, REGEX);
        //读取文档
        String readResult = readDocument(document);
        System.out.println(readResult);
    }

    private static Document readJDom(String xmlPath) {
        // 进行对XML_PATH文件的JDOM解析
        // 准备工作
        // 1.创建一个SAXBuilder的对象
        SAXBuilder saxBuilder = new SAXBuilder();
        InputStream in;
        try {
            // 2.创建一个输入流，将xml文件加载到输入流中
            in = new FileInputStream(xmlPath);
            InputStreamReader isr = new InputStreamReader(in, "UTF-8");
            // 3.通过saxBuilder的build方法，将输入流加载到saxBuilder中
            Document document = saxBuilder.build(isr);
            return document;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (JDOMException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 通过递归修改元素的值
     *
     * @param root        元素节点
     * @param nodeName    元素节点名称
     * @param inputRegex  正则表达式
     * @param replacement 替代的值
     */
    private static void recursiveUpdateElement(Element root, String nodeName, String inputRegex, String replacement) {
        // 5.获取根节点下的子节点的List集合
        List<Element> children = root.getChildren();
        for (Element child : children) {
            Pattern pattern = Pattern.compile(inputRegex);
            Matcher matcher = pattern.matcher(child.getValue());
            boolean matches = matcher.matches();
//            System.out.println("nodeName:" + child.getName() + " matches:" + matches);
            if (matches && nodeName.equals(child.getName())) { //如果匹配
                child.setContent(new Content(Content.CType.Text) {
                    @Override
                    public String getValue() {
                        return replacement;
                    }
                });

                continue;
            }
            //递归
            recursiveUpdateElement(child, nodeName, inputRegex, replacement);
        }
    }


    private static void recursiveUpdateElement(Element root, Map<String, String> nodeMap, String inputRegex) {
        // 5.获取根节点下的子节点的List集合
        List<Element> children = root.getChildren();
        for (Element child : children) {
            Pattern pattern = Pattern.compile(inputRegex);
            Matcher matcher = pattern.matcher(child.getValue());
            boolean matches = matcher.matches();
//            System.out.println("nodeName:" + child.getName() + " matches:" + matches);

            //取出node中的值
            String nodeValue = nodeMap.get(child.getName());

            if (matches && nodeValue != null) { //如果匹配
                child.setContent(new Content(Content.CType.Text) {
                    @Override
                    public String getValue() {
                        return nodeValue;
                    }
                });

                continue;
            }
            //递归
            recursiveUpdateElement(child, nodeMap, inputRegex);
        }
    }


    /**
     * 保存文档
     *
     * @param doc
     */
    private static String readDocument(Document doc) {
        XMLOutputter xmlOutputter = new XMLOutputter();
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            Format fm = Format.getPrettyFormat();
            xmlOutputter.setFormat(fm);
            xmlOutputter.output(doc, byteArrayOutputStream);
            byte[] bytes = byteArrayOutputStream.toByteArray();
            String readResult = new String(bytes, "UTF-8");
            return readResult;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
