package chapter_pattern.builder.sample_1;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/10 9:42 上午
 * desc   : 老板构建器
 * version: 1.0
 */
public class BossEventBuilder extends Builder<BossEventBuilder> {

    /**
     * 收入
     */
    private double revenue;

    /**
     * 员工数
     */
    private int employeeNum;

    /**
     * 还有几天恢复上班
     */
    private int reDays;

    public double getRevenue() {
        return revenue;
    }

    public BossEventBuilder revenue(double revenue) {
        this.revenue = revenue;
        return this;
    }

    public int getEmployeeNum() {
        return employeeNum;
    }

    public BossEventBuilder employeeNum(int employeeNum) {
        this.employeeNum = employeeNum;
        return this;
    }

    public int getReDays() {
        return reDays;
    }

    public BossEventBuilder reDays(int reDays) {
        this.reDays = reDays;
        return this;
    }

    @Override
    public Event build() {
        return new BossEvent(this);
    }
}
