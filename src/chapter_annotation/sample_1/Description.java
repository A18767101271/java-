package chapter_annotation.sample_1;

import java.lang.annotation.*;

/**
 * Created by wislie on 2019/6/23.
 */
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Description {

    String name();

    int age() default 18;
}
