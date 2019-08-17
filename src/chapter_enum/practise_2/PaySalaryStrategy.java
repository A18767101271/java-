package chapter_enum.practise_2;

/**
 * 策略模式 将加班工资计算移到一个私有的嵌套枚举中,将这个策略枚举的实例传到PaySalary枚举的构造器中;
 * 之后PaySalary枚举将加班工资计算委托给策略枚举
 * Created by wislie on 2019/5/7.
 */
public enum PaySalaryStrategy {

    MONDAY(PayType.WEEKDAY), TUESDAY(PayType.WEEKDAY), WEDNESDAY(PayType.WEEKDAY), THURSDAY(PayType.WEEKDAY),
    FRIDAY(PayType.WEEKDAY), SATURDAY(PayType.WEEKEND), SUNDAY(PayType.WEEKEND);
    private final PayType payDay;

    PaySalaryStrategy(PayType payDay) {
        this.payDay = payDay;
    }

    private enum PayType {

        WEEKDAY {
            @Override
            protected double overtimeSalary(double hourSalary, double hour) {
                double overtimeSalary = 0;
                if (hour > 8) {
                    overtimeSalary = hourSalary * (hour - 8) / 2;
                }
                return overtimeSalary;
            }
        },

        WEEKEND {
            @Override
            protected double overtimeSalary(double hourSalary, double hour) {
                double overtimeSalary = hourSalary * hour / 2;
                return overtimeSalary;
            }
        };

        protected abstract double overtimeSalary(double hourSalary, double hour);


        public double calculateSalary(double hourSalary, double hour) {
            double baseSalary = hourSalary * hour;
            return baseSalary + overtimeSalary(hourSalary, hour);
        }
    }

    public double paySalaryByDay(double hourSalary, double hour) {
        return payDay.calculateSalary(hourSalary, hour);
    }

    public static void main(String[] args) {
        double totalSalary = 0;
        for (PaySalaryStrategy salaryStrategy : PaySalaryStrategy.values()) {
            totalSalary += salaryStrategy.paySalaryByDay(100, 9);
        }
        System.out.println("totalSalary:" + totalSalary);

        System.out.println("PaySalaryStrategy.FRIDAY==PaySalaryStrategy.FRIDAY:" + (PaySalaryStrategy.FRIDAY == PaySalaryStrategy.FRIDAY));
        System.out.println("PaySalaryStrategy.FRIDAY==PaySalaryStrategy.SATURDAY:" + (PaySalaryStrategy.FRIDAY == PaySalaryStrategy.SATURDAY));
        System.out.println("PaySalaryStrategy.FRIDAY.equals(PaySalaryStrategy.FRIDAY):" + (PaySalaryStrategy.FRIDAY.equals(PaySalaryStrategy.FRIDAY)));
        System.out.println("PaySalaryStrategy.FRIDAY.equals(PaySalaryStrategy.SATURDAY):" + (PaySalaryStrategy.FRIDAY.equals(PaySalaryStrategy.SATURDAY)));

        PaySalaryStrategy paySalaryStrategy = PaySalaryStrategy.valueOf("MONDAY");
        System.out.println("paySalaryStrategy:"+paySalaryStrategy);
//        double fridaySalary = PaySalaryStrategy.FRIDAY.paySalaryByDay(100,9);
//        double sundaySalary = PaySalaryStrategy.SUNDAY.paySalaryByDay(100,9);
//        System.out.println("friday:"+fridaySalary+" sundaySalary:"+sundaySalary);
    }
}
