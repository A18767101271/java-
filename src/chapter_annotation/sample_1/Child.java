package chapter_annotation.sample_1;

/**
 * Created by wislie on 2019/6/23.
 */
@Description(name = "wislie", age = 20)
public class Child {

    @Description(name = "wislie", age = 20)
    private String item;

    @Display(value = "bad")
    private String content;



    @Description(name = "wislie", age = 20)
    public void setItem(String item) {
        this.item = item;
        System.out.println("setItem:" + item);
    }

    @Display(value = "setBadContent")
    public void setContent(String content) {
        System.out.println("setContent:" + content);
        this.content = content;
    }

    @Description(name = "wislie", age = 20)
    public String getItem() {
        System.out.println("getItem:" + item);
        return "red";
    }

    @Display(value = "getBadContent")
    public String getContent() {
        System.out.println("getContent:" + content);
        return content;
    }
}
