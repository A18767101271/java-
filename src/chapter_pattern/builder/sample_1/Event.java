package chapter_pattern.builder.sample_1;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/10 9:38 上午
 * desc   :
 * version: 1.0
 */
public abstract class Event<T extends Builder> {
    protected T builder;

    public Event(T builder) {
        this.builder = builder;
    }

    abstract void dispatchEvent(String msg);
}
