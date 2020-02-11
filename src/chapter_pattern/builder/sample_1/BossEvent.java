package chapter_pattern.builder.sample_1;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/10 9:39 上午
 * desc   : 老板事件
 * version: 1.0
 */
public class BossEvent extends Event<BossEventBuilder> {

    public BossEvent(BossEventBuilder builder) {
        super(builder);

        if (builder.getRevenue() <= 0) {
            throw new IllegalArgumentException("revenue 不能为小于 0");
        }
        if (builder.getReDays() <= 0) {
            throw new IllegalArgumentException("复工 天数不能小于 0");
        }
        if (builder.getEmployeeNum() <= 0) {
            throw new IllegalArgumentException("employee数量 不能为小于 0");
        }
        if (builder.getStartDay() != null) {
            throw new IllegalArgumentException("开工日期 不能为空");
        }
    }

    @Override
    public void dispatchEvent(String msg) {
        System.out.println("老板说: 企业总收入有" + builder.getRevenue() + "万元"
                + " 员工有:" + builder.getEmployeeNum() + "人 "
                + " 离开工有:" + builder.getReDays() + "天 "
                + builder.getStartDay() + "开工有点晚 "
                + msg);
    }
}
