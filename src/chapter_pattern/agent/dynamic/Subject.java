package chapter_pattern.agent.dynamic;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/1/29 4:40 下午
 * desc   : 接口
 * version: 1.0
 */
public interface Subject {
    /**
     * 写入字符串
     * @param string
     */
    void writeString(String string);
    /**
     * 读取字符串
     * @return
     */
    String readString();
}
