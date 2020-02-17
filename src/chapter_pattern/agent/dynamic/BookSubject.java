package chapter_pattern.agent.dynamic;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/1/29 4:41 下午
 * desc   : bookSubject
 * version: 1.0
 */
public class BookSubject implements Subject {
    private String string;

    @Override
    public void writeString(String string) {
        this.string = string;
    }

    @Override
    public String readString() {
        return string;
    }
}
