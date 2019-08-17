package chapter_io.practise_5.sample_1;

import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Result;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.sax.SAXTransformerFactory;
import javax.xml.transform.sax.TransformerHandler;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by wislie on 2018/12/20.
 */
public class SaxXml {

    public static void main(String[] args) {
        //创建一个 SAXTransformerFactory 类对象
        SAXTransformerFactory tff = (SAXTransformerFactory) SAXTransformerFactory.newInstance();

        try {
            //通过 SAXTransformerFactory 对象创建一个 TransformerHandler 对象
            TransformerHandler handler = tff.newTransformerHandler();
            //通过 TransformerHandler 对象创建一个 Transformer 对象
            Transformer tr = handler.getTransformer();
            //设置生成的 XML 文件编码格式
            tr.setOutputProperty(OutputKeys.ENCODING, "utf-8");
            //设置生成的 XML 文件自动换行
            tr.setOutputProperty(OutputKeys.INDENT, "yes");
            //如果不存在，就创建一个新的 XML 文件
            File file = new File("sax.xml");
            if (!file.exists()) {
                file.createNewFile();
            }
            //创建一个Result 对象,并且使其与 TransformerHandler 对象关联
            Result result = new StreamResult(new FileOutputStream(file));
            handler.setResult(result);

            //利用 handler 对象进行 XML 文件内容的编写
            //打开 document
            handler.startDocument();
            //为了创建节点属性和属性值
            AttributesImpl atts = new AttributesImpl();
            //根节点开始标签
            handler.startElement("", "", "School", atts);
            //atts.clear();  //清空 atts 的值
            //设置属性和属性值
            atts.addAttribute("", "", "id", "", "1");
            //子节点开始标签
            handler.startElement("", "", "student", atts);

            atts.clear();  //清空子节点设的值
            //字节点下name节点开始标签
            handler.startElement("", "", "name", atts);
            String name = "小王";
            handler.characters(name.toCharArray(), 0, name.length());
            //字节点下name节点结束标签
            handler.endElement("", "", "name");
            //子节点结束标签
            handler.endElement("", "", "student");

            //根节点结束标签
            handler.endElement("", "", "School");

            //关闭 document
            handler.endDocument();

        } catch (TransformerConfigurationException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }

    }

}
