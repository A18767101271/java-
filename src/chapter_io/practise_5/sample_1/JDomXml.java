package chapter_io.practise_5.sample_1;

import org.jdom2.DocType;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.output.XMLOutputter;

import java.io.*;


/*

 * Created by wislie on 2018/12/20.
 */
public class JDomXml {

    public static void main(String[] args) {
        //自己封装xml文档对象
        Element rootElement = new Element("Document");
        Element element = new Element("Element");

        Element nameElement = new Element("name");
        nameElement.setText("<名称>");
        Element valueElement = new Element("value");
        valueElement.setText("<值 >\"\\");
        Element descriptionElement = new Element("description");
        descriptionElement.setText("<描述><![CDATA[<查看是否转义保存>]]>");
        //添加子节点
        element.addContent(nameElement);
        element.addContent(valueElement);
        element.addContent(descriptionElement);

        rootElement.addContent(element);

        Document document = new Document(rootElement);
        DocType docType = new DocType("Doctype");
        document.setDocType(docType);

        XMLOutputter xmloutputter = new XMLOutputter();
        OutputStream outputStream;
        try {
            //如果不存在，就创建一个新的 XML 文件
            File file = new File("jdom.xml");
            if (!file.exists()) {
                file.createNewFile();
            }
            outputStream = new FileOutputStream(file);
            xmloutputter.output(document, outputStream);
            System.out.println("xml文档生成成功！");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
