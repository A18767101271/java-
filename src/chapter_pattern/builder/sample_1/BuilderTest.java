package chapter_pattern.builder.sample_1;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/10 9:45 上午
 * desc   : builder demo1
 * version: 1.0
 */
public class BuilderTest {

    public static void main(String[] args) {

        Event workerEvent = new WorkerEventBuilder()
                .startDay("2020-02-16")
                .salary(18000)
                .build();
        workerEvent.dispatchEvent("为什么要延期复工");

        Event bossEvent = new BossEventBuilder()
                .startDay("2020-02-16")
                .reDays(3)
                .employeeNum(50)
                .revenue(300)
                .build();
        bossEvent.dispatchEvent("亏的有点多");
    }
}
