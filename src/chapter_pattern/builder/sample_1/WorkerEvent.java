package chapter_pattern.builder.sample_1;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/10 9:39 上午
 * desc   : 员工事件
 * version: 1.0
 */
public class WorkerEvent extends Event<WorkerEventBuilder> {

    public WorkerEvent(WorkerEventBuilder builder) {
        super(builder);

        if (builder.getSalary() <= 0) {
            throw new IllegalArgumentException("salary 不能为小于 0");
        }
        if (builder.getStartDay() != null) {
            throw new IllegalArgumentException("开工日期 不能为空");
        }
    }

    @Override
    public void dispatchEvent(String msg) {
        System.out.println("员工说: 我的工资才" + builder.getSalary() + "元 "
                + builder.getStartDay() + "开工有点晚 "
                + msg);
    }
}
