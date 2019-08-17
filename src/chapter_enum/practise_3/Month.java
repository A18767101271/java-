package chapter_enum.practise_3;

import java.util.EnumMap;

/**
 * EnumMap的使用
 * Created by wislie on 2019/5/9.
 */
public enum Month {

    NON_LEAP(29), SOLAR(31), LUNAR(30);
    private int days;

    Month(int days) {
        this.days = days;
    }

    interface MonthOrdinal {

        int getDays();
    }

    public static void main(String[] args) {

        EnumMap<Month, MonthOrdinal> em = new EnumMap<>(Month.class);
        em.put(NON_LEAP, new MonthOrdinal() {
            @Override
            public int getDays() {
                return NON_LEAP.days;
            }
        });

        em.put(SOLAR, new MonthOrdinal() {
            @Override
            public int getDays() {
                return SOLAR.days;
            }
        });

        MonthOrdinal nonLeap = em.get(NON_LEAP);
        System.out.println(NON_LEAP + "有" + nonLeap.getDays() + "天");

        MonthOrdinal solar = em.get(SOLAR);
        System.out.println(SOLAR + "有" + solar.getDays() + "天");
    }
}
