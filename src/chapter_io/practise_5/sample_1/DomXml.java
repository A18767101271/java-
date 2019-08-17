package chapter_io.practise_5.sample_1;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;

/**
 * dom方式创建和解析xml
 * Created by wislie on 2018/12/20.
 */
public class DomXml {

    public static void main(String[] args){
         /*获得（文件创建工厂）实例*/
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try {
            /*获取DocumentBuilder对象，单例模式*/
            DocumentBuilder db = factory.newDocumentBuilder();
            /*The Document interface represents the entire HTML or XML document*/
            Document document = db.newDocument();
            document.setXmlStandalone(true);
            Element bookstore = document.createElement("bookstore");
            Element book = document.createElement("book");
            Element name = document.createElement("name");
            name.setTextContent("华");
            book.setAttribute("id", "1");
            book.appendChild(name);
            document.appendChild(bookstore);
            bookstore.appendChild(book);

            /*输出文件到XML中*/
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            try {
                /*转换器*/
                Transformer tf = transformerFactory.newTransformer();

                /**设置输出性质  Provides string constants that can be used to set
                 * output properties for a Transformer, or to retrieve output
                 *  properties from a Transformer or Templates object.
                 *  提供字符串常数被用去设置输出属性从转换器中，或者去恢复输出属性从转换器或模版对象中。
                 *
                 *  */
                tf.setOutputProperty(OutputKeys.INDENT, "yes");
                /*输出文件到XML中*/
                tf.transform(new DOMSource(document),
                        new StreamResult(new File("dom.xml")));


            } catch (TransformerConfigurationException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }


        } catch (Exception e) {

            e.printStackTrace();
        }

    }

}
