package chapter_pattern.builder.sample_1;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/10 9:40 上午
 * desc   :
 * version: 1.0
 */
public abstract class Builder<T extends Builder> {
    /**
     * 延迟时间
     */
    private String startDay;

    public String getStartDay() {
        return startDay;
    }

    public T startDay(String startDay) {
        this.startDay = startDay;
        return (T) this;
    }

    public abstract Event build();
}
