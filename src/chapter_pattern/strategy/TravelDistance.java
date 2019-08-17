package chapter_pattern.strategy;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by wislie on 2018/8/30.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface TravelDistance {
    //最大值
    long max() default 0;

    //最小值
    long min() default 0;
}
