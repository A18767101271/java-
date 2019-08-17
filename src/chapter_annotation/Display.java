package chapter_annotation;

import java.lang.annotation.*;

/**
 * Created by wislie on 2019/6/30.
 */
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Display {
    String value();
}
