package chapter_io.practise_5.sample_1;

import org.dom4j.*;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.Iterator;
import java.util.List;

/**
 * Created by wislie on 2018/12/21.
 */
public class Dom4jXml {

    public static void main(String[] args) {
        //创建一个xml文档
        Document doc = DocumentHelper.createDocument();
        //向xml文件中添加注释
        doc.addComment("这里是注释");
        //创建一个名为students的节点，因为是第一个创建，所以是根节点,再通过doc创建一个则会报错。
        Element root = doc.addElement("students");
        //在root节点下创建一个名为student的节点
        Element stuEle = root.addElement("student");
        //给student节点添加属性
        stuEle.addAttribute("id", "101");
        //给student节点添加一个子节点
        Element nameEle = stuEle.addElement("name");
        //设置子节点的文本
        nameEle.setText("张三");

        //用于格式化xml内容和设置头部标签
        OutputFormat format = OutputFormat.createPrettyPrint();
        //设置xml文档的编码为utf-8
        format.setEncoding("utf-8");
        Writer out;
        try {
            //创建一个输出流对象
            out = new FileWriter("dom4j.xml");
            //创建一个dom4j创建xml的对象
            XMLWriter writer = new XMLWriter(out, format);
            //调用write方法将doc文档写到指定路径
            writer.write(doc);
            writer.close();
            System.out.print("生成XML文件成功");
        } catch (IOException e) {
            System.out.print("生成XML文件失败");
            e.printStackTrace();
        }

        String path = "src/xml/permission.xml";
        parseXml(path);

    }


    private static void parseXml(String xmlPath){
        //1.创建Reader对象
        SAXReader reader = new SAXReader();
        //2.加载xml
        Document document = null;
        try {
            document = reader.read(new File(xmlPath));
            //3.获取根节点
            Element rootElement = document.getRootElement();
            Iterator iterator = rootElement.elementIterator();
            while (iterator.hasNext()){
                Element stu = (Element) iterator.next();
                List<Attribute> attributes = stu.attributes();
                System.out.println("======获取属性值======");
                for (Attribute attribute : attributes) {
                    System.out.println(attribute.getValue());
                }
                System.out.println("======遍历子节点======");
                Iterator iterator1 = stu.elementIterator();
                while (iterator1.hasNext()){
                    Element stuChild = (Element) iterator1.next();
                    System.out.println("节点名："+stuChild.getName()+"---节点值："+stuChild.getStringValue());
                }
            }
        } catch (DocumentException e) {
            e.printStackTrace();
        }

    }
}
