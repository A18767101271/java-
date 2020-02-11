package chapter_pattern.builder.sample_1;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/10 9:42 上午
 * desc   :
 * version: 1.0
 */
public class WorkerEventBuilder extends Builder<WorkerEventBuilder> {

    private double salary;

    public double getSalary() {
        return salary;
    }


    public WorkerEventBuilder salary(double salary) {
        this.salary = salary;
        return this;
    }

    @Override
    public Event build() {
        return new WorkerEvent(this);
    }
}
